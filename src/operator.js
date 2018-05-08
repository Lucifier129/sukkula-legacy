import {
  log,
  logValue,
  logAll,
  noop,
  identity,
  makeSink,
  isObject,
  isSource
} from './utility'
import { run, fork, toAction, onStart, onNext, onFinish, onError } from './sink'
import { fromEvent, fromArray, fromRange, interval, of, create } from './source'

const EMPTY = {}

const consume = make =>
  create(callback => {
    let count = 0
    let innerAction = null
    let innerSink = {
      next: callback.next,
      error: callback.error,
      finish: () => {
        innerAction = null
        doMake()
      }
    }
    let doMake = () => {
      if (finished) return
      let makedSource
      try {
        makedSource = make(count++)
      } catch (error) {
        return callback.error(error)
      }
      if (!makedSource) return callback.finish()
      innerAction = makedSource(innerSink)
      innerAction.start()
    }
    let start = doMake
    let finished = false
    let finish = () => {
      finished = true
      innerAction && innerAction.finish()
    }
    return { start, finish }
  })

export const concat = (...sourceList) => consume(count => sourceList[count])
export const concatSource = source2 => source1 => concat(source1, source2)
export const concatBy = (...makeList) =>
  consume(count => {
    let make = makeList[count]
    return make ? make(count) : null
  })
export const concatSourceBy = make => source => concatBy(() => source, make)

export const merge = (...sourceList) =>
  create(callback => {
    let finishCount = 0
    let innerSink = {
      next: callback.next,
      error: callback.error,
      finish: () => ++finishCount === sourceList.length && callback.finish()
    }
    let actionList = sourceList.map(source => source(innerSink))
    let start = () => actionList.forEach(innerAction => innerAction.start())
    let finish = () => actionList.forEach(innerAction => innerAction.finish())
    return { start, finish }
  })

export const mergeWith = source2 => source1 => merge(source1, source2)

export const combine = (...sourceList) =>
  create(callback => {
    let finishCount = 0
    let innerFinish = () =>
      ++finishCount === sourceList.length && callback.finish()
    let valueList = new Array(sourceList.length)
    let actionList = sourceList.map((source, index) => {
      valueList[index] = EMPTY
      return source({
        next: value => {
          valueList[index] = value
          if (valueList.indexOf(EMPTY) === -1) {
            callback.next(valueList.concat())
          }
        },
        finish: innerFinish,
        error: callback.error
      })
    })
    let start = () => actionList.forEach(innerAction => innerAction.start())
    let finish = () => actionList.forEach(innerAction => innerAction.finish())
    return { start, finish }
  })

export const combineWith = source2 => source1 => combine(source1, source2)

export const fromArrayShape = array => combine(...array.map(fromShape))
export const fromObjectShape = obj => {
  let keys = Object.keys(obj)
  let sourceList = keys.map(key => fromShape(obj[key]))
  let construct = (result, value, index) => {
    result[keys[index]] = value
    return result
  }
  let toShape = valueList => valueList.reduce(construct, {})
  return combine(...sourceList) |> map(toShape)
}

export const fromShape = shape => {
  if (isSource(shape)) {
    return shape
  } else if (Array.isArray(shape)) {
    return fromArrayShape(shape)
  } else if (isObject(shape)) {
    return fromObjectShape(shape)
  }
  return of(shape)
}

export const map = f => source =>
  source.make(sink =>
    source({
      ...sink,
      next: value => sink.next(f(value))
    })
  )

export const mapTo = value => map(() => value)

export const filter = f => source =>
  source.make(sink =>
    source({
      ...sink,
      next: value => f(value) && sink.next(value)
    })
  )

export const take = (max = 0) => source =>
  source.make(sink => {
    let count = 0
    let action = source({
      ...sink,
      next: value => {
        if (count === max) return action.finish()
        count += 1
        sink.next(value)
        if (count === max) return action.finish()
      }
    })
    return action
  })

export const scan = (f, seed) => source => {
  let acc = seed
  return source |> map(value => (acc = f(acc, value)))
}

export const keep = (size = 2) => source => {
  let accumulate = (list, value) => {
    list.push(value)
    if (list.length > size) list.shift()
    return list
  }
  return source |> scan(accumulate, [])
}

export const buffer = (size = 2, start = size - 1) => source => {
  let accumulate = (list, value) => {
    let newList = list.slice(list.length === size ? start : 0)
    newList.push(value)
    return newList
  }
  return source |> scan(accumulate, []) |> filter(list => list.length === size)
}

export const skip = (count = 0) => {
  return filter(() => {
    if (count === 0) return true
    count -= 1
    return false
  })
}

export const takeUntil = until$ => source =>
  source.make(sink => {
    let start = () => {
      sink.start()
      untilAction.start()
    }
    let finish = () => {
      untilAction.finish()
      sink.finish()
    }
    let innerAction = source({ ...sink, start, finish })
    let untilAction = until$({ next: innerAction.finish })
    return innerAction
  })

export const takeLast = (count = 1) => source =>
  source.make(sink => {
    let list = []
    return (
      source
      |> onNext(value => {
        list.push(value)
        if (list.length > count) list.shift()
      })
      |> concatSourceBy(() => fromArray(list) |> onNext(sink.next))
      |> toAction({
        start: sink.start,
        finish: sink.finish,
        error: sink.error
      })
    )
  })

export const then = make => source =>
  source.make(sink => {
    let lastValue = EMPTY
    return (
      source
      |> onNext(value => sink.next((lastValue = value)))
      |> concatSourceBy(
        () => lastValue !== EMPTY && (make(lastValue) |> onNext(sink.next))
      )
      |> toAction({
        start: sink.start,
        finish: sink.finish,
        error: sink.error
      })
    )
  })

export const switchMap = makeSource => source =>
  source.make(sink => {
    let innerAction = null
    let innerSink = { next: sink.next, error: sink.error }
    return source({
      ...sink,
      next: value => {
        innerAction && innerAction.finish()
        try {
          innerAction = makeSource(value)(innerSink)
          innerAction.start()
        } catch (error) {
          sink.error(error)
        }
      },
      finish: () => {
        innerAction && innerAction.finish()
        sink.finish()
      }
    })
  })

export const reduce = (f, seed) => source =>
  source |> scan(f, seed) |> takeLast()

export const startWith = value => source => concat(of(value), source)

export const share = (feedLastValue = false) => source => {
  let lastValue = EMPTY
  let action = null
  let list = []
  let next = value => {
    lastValue = value
    list.concat().forEach(sink => sink.next(value))
  }
  let finish = () => {
    action = null
    list.concat().forEach(sink => sink.finish())
  }
  let shareSink = { next, finish }
  return create(sink => {
    list.push(sink)
    let start = () => {
      if (action) {
        if (feedLastValue && lastValue !== EMPTY) sink.next(lastValue)
        return
      }
      action = source(shareSink)
      action.start()
    }
    let finish = () => {
      let index = list.findIndex(item => item === sink)
      if (index !== -1) list.splice(index, 1)
      if (list.length === 0) {
        action && action.finish()
        action = null
      }
    }
    return { start, finish }
  })
}
