const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  var keysA = Object.keys(objA)
  var keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!objB.hasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }

  return true
}

const shallowEqualList = (listA, listB) => {
  if (!Array.isArray(listA) || !Array.isArray(listB)) {
    return false
  }

  if (listA.length !== listB.length) {
    return false
  }

  for (let i = 0; i < listA.length; i++) {
    if (!shallowEqual(listA[i], listB[i])) {
      return false
    }
  }

  return true
}

const isThenble = obj => !!(obj && typeof obj.then === 'function')

// args -> sink -> (start, next, complete)

const pipe = (...args) => args.reduce((a, f) => f(a))

let env = null
let getEnv = () => env

const EMPTY = Symbol('empty')
const STOP = Symbol('stop')

const referencable = producer => {
  let refList = []
  let index = 0
  let getRef = () => refList[index]
  let setRef = value => (refList[index] = value)
  let consumeRefIndex = () => index++
  let getRefList = () => refList
  let withRef = arg => {
    env = { ...env, getRef, setRef, consumeRefIndex, getRefList }
    try {
      index = 0
      return producer(arg)
    } finally {
      index = 0
    }
  }

  return withRef
}

const stoppable = producer => {
  let stop = () => {
    throw STOP
  }

  let withStop = arg => {
    env = { ...env, stop }
    try {
      return producer(arg)
    } catch (error) {
      if (error === STOP) return EMPTY
      throw error
    }
  }

  return withStop
}

const resumable = producer => {
  let runing = false
  let rerun = false
  let currentArg
  let resume = () => withResume(currentArg)
  let withResume = (arg = currentArg) => {
    currentArg = arg
    if (runing) {
      rerun = true
      return
    }

    env = { ...env, resume }
    runing = true

    let result
    try {
      result = producer(arg)
    } finally {
      runing = false
    }

    if (rerun) {
      rerun = false
      return resume()
    }
    return result
  }
  return withResume
}

const cleanupEffect = effect => {
  if (typeof effect.cleanup === 'function') {
    let { cleanup } = effect
    effect.cleanup = null
    cleanup()
  }
}

const performEffect = effect => {
  let shouldPerform = !shallowEqualList(effect.currDeps, effect.prevDeps)
  if (!shouldPerform) return

  cleanupEffect(effect)

  if (typeof effect.current === 'function') {
    effect.cleanup = effect.current()
  }
}

const performEffectList = env => {
  if (!env) throw new Error('can not perform effect')

  let refList = env.getRefList()

  for (let i = 0; i < refList.length; i++) {
    let ref = refList[i]
    if (!ref.isEffect) continue
    performEffect(ref)
  }
}

const cleanupEffectList = env => {
  if (!env) throw new Error('can not cleanup effect')

  let refList = env.getRefList()

  for (let i = 0; i < refList.length; i++) {
    let ref = refList[i]
    if (!ref.isEffect) continue
    cleanupEffect(ref)
  }
}

const create = producer => {
  let f = pipe(
    producer,
    referencable,
    stoppable,
    resumable
  )

  let currentEnv

  return sink => {
    let isCompleted = false
    let next = arg => {
      if (isCompleted) {
        throw new Error('producer is completed')
      }

      let value = f(arg)
      currentEnv = env

      env = null

      if (value === EMPTY) return

      sink.next(value)
      performEffectList(currentEnv)
    }

    let complete = () => {
      if (isCompleted) return
      isCompleted = true

      if (currentEnv) {
        cleanupEffectList(currentEnv)
      }
    }

    return { next, complete }
  }
}

let useRef = value => {
  let env = getEnv()

  if (!env) {
    throw new Error('useRef can not use out of usable function')
  }

  let { getRef, setRef, consumeRefIndex } = env
  let ref = getRef()

  if (!ref) {
    ref = { current: value }
    setRef(ref)
  }

  consumeRefIndex()

  return ref
}

let useState = value => {
  let env = getEnv()

  if (!env) {
    throw new Error('useState can not use out of usable function')
  }

  let { getRef, setRef, consumeRefIndex, resume } = env
  let ref = getRef()

  if (!ref) {
    let setValue = value => {
      ref.current = value
      resume()
    }
    ref = { current: value, setValue }
    setRef(ref)
  }

  consumeRefIndex()

  return [ref.current, ref.setValue]
}

let useMemo = (f, deps) => {
  let env = getEnv()

  if (!env) {
    throw new Error('useMemo can not use out of usable function')
  }

  let { getRef, setRef, consumeRefIndex } = env
  let ref = getRef()

  if (!ref) {
    let value = f()
    ref = { current: value, deps }
    setRef(ref)
  } else {
    let shouldRecompute = !shallowEqualList(deps, ref.deps)
    if (shouldRecompute) {
      ref.current = f()
    }
  }

  consumeRefIndex()

  return ref.current
}

let useEffect = (f, deps) => {
  let env = getEnv()

  if (!env) {
    throw new Error('useEffect can not use out of usable function')
  }

  let { getRef, setRef, consumeRefIndex } = env
  let ref = getRef()

  if (!ref) {
    ref = {
      isEffect: true,
      current: f,
      currDeps: deps,
      prevDeps: null,
      cleanup: null
    }
    setRef(ref)
  } else {
    ref.current = f
    ref.prevDeps = ref.currDeps
    ref.currDeps = deps
  }

  consumeRefIndex()
}

const useSuspense = (f, deps) => {
  let env = getEnv()

  if (!env) {
    throw new Error('useSuspense can not use out of usable function')
  }

  let { getRef, setRef, consumeRefIndex, stop, resume } = env
  let ref = getRef()

  if (ref) {
    let shouldRecompute = !shallowEqualList(ref.deps, deps)
    if (shouldRecompute) ref = null
  }

  if (!ref) {
    let value = f()

    ref = { current: value, deps }
    setRef(ref)

    if (isThenble(value)) {
      value.then(result => {
        ref.current = result
        resume()
      })
    }
  }

  if (ref.current === EMPTY) stop()

  consumeRefIndex()

  return ref.current
}

const useCallback = (f, deps) => {
  return useMemo(() => f, deps)
}

const useStaticFunction = f => {
  let ref = useRef(f)
  let callback = useCallback((...args) => ref.current(...args), [])

  useEffect(() => {
    ref.current = f
  }, [f])

  return callback
}

const interval = create(period => {
  let [count, setCount] = useState(0)
  let callback = useStaticFunction(() => {
    setCount(count + 1)
  })

  useEffect(() => {
    let timer = setInterval(callback, period)
    return () => {
      clearInterval(timer)
    }
  }, [period])

  return count
})

const map = f => source => sink =>
  source({
    ...sink,
    next: value => sink.next(f(value))
  })

const filter = predicate => source => sink =>
  source({
    ...sink,
    next: value => predicate(value) && sink.next(value)
  })

const take = max => source => sink => {
  let count = 0
  let handler = source({
    ...sink,
    next: value => {
      sink.next(value)
      count += 1
      if (count === max) {
        handler.complete()
      }
    }
  })
  return handler
}

const foreach = (next, complete) => source => source({ next, complete })

let handler = pipe(
  interval,
  map(n => n + 1),
  filter(n => n % 2),
  take(10),
  foreach(n => console.log('next', n), () => console.log('complete'))
)

handler.next(100)
