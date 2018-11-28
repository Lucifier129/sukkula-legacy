const {
	run,
	subscribe,
	unsubscribe,
	usable,
	useState,
	useGetSet,
	useEffect,
	usePostEffect,
	useDispatch
} = require('./index')

const count$ = usable(props => {
	let [count, setCount] = useState(props.count)
	let dispatch = useDispatch()

	useEffect('incre', () => setCount(count + 1))

	useEffect('decre', () => setCount(count - 1))

	usePostEffect(() => {
		let timer = setInterval(() => dispatch('incre'), 1000)
		return () => clearInterval(timer)
	}, [])

	return count
})

subscribe({
	source: count$,
	next: count => {
		console.log('count', count)
		if (count === 20) unsubscribe()
	},
	finish: count => {
		console.log('last-count', count)
	}
})

run(count$, { count: 10 })
