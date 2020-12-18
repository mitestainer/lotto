import { useEffect, useState } from 'react';
import { GiClover } from 'react-icons/gi'
import { FiX } from 'react-icons/fi'
import './App.css';


function App() {
	// let nums = []
	const [nums, setNums] = useState([])
	const [guess, setGuess] = useState([])
	const [mode, setMode] = useState('')
	const [result, setResult] = useState([])
	const [matches, setMatches] = useState([])

	useEffect(() => {
		setNums([])
		setGuess([])
		setResult([])
		setMatches([])
		createCard()
	}, [mode])

	const createCard = () => {
		let arr = []
		let index = 0

		switch (mode) {
			case 'mega':
				index = 60
				break
			case 'corner':
				index = 80
				break
			case 'ez':
				index = 25
				break
			case 'frenzy':
				index = 100
				break
			default:
				return
		}

		for (let x = 1; x <= index; x++) {
			arr.push(x)
		}
		setNums(arr)
	}

	const orderAndSet = num => {
		if (guess.includes(num)) return
		let length = 0
		switch (mode) {
			case 'mega':
				length = 6
				break
			case 'corner':
				length = 5
				break
			case 'ez':
				length = 15
				break
			case 'frenzy':
				length = 20
				break
			default:
				return
		}
		return guess.length < length && setGuess([...guess, num].sort((a, b) => a - b))
	}

	const removeFromGuess = index => {
		let arr = [...guess]
		arr.splice(index, 1)
		setGuess(arr)
	}

	const playGame = mode => {
		let length = 0
		let index = 0
		let arr = []

		switch (mode) {
			case 'mega':
				length = 6
				index = 60
				break
			case 'corner':
				length = 5
				index = 80
				break
			case 'ez':
				length = 15
				index = 25
				break
			case 'frenzy':
				length = 20
				index = 100
				break
			default:
				return
		}

		if (guess.length < length) return

		debugger
		const shuffle = () => {
			let num = Math.ceil(Math.random() * index)
			return arr.includes(num) ? shuffle() : num
		}
		while (arr.length < length) {
			let num = shuffle()
			arr.push(num)
		}


		setResult(arr.sort((a, b) => a - b))

	}

	useEffect(() => {
		setMatches(guess.filter(num => result.includes(num)))
	}, [result])

	return (
		<div className="App">
			<main>
				<h1><GiClover /> {mode && `${mode} Lotto`}</h1>
				<section className="mode">
					<button className="mode-button" onClick={() => setMode('mega')}><GiClover />Mega Lotto</button>
					<button className="mode-button" onClick={() => setMode('corner')}> <GiClover />Corner Lotto</button>
					<button className="mode-button" onClick={() => setMode('ez')}> <GiClover />E-Z Lotto</button>
					<button className="mode-button" onClick={() => setMode('frenzy')}> <GiClover />Frenzy Lotto</button>
				</section>
				<section className="card">
					{nums.map(num => <div key={num} className={`card-number${guess.includes(num) ? ' number-selected' : ''}`} onClick={() => orderAndSet(num)}><span>{num}</span></div>)}
				</section>
				<section className="results">
					<div>
						<p>Your guess</p>
						<div id="guesses">
							{guess.map((g, i) => {
								return (
									<div>
										<span>{g}</span>
										{!result.length && <div onClick={() => removeFromGuess(i)}>
											<FiX size={12} color="tomato" />
										</div>}
									</div>
								)
							})}
						</div>
					</div>
					<div>
						<button onClick={() => playGame(mode)}>Draw!</button>
					</div>
					<div>
						<p>Results</p>
						<div id="results">
							{result.map(num => {
								return (
									<div>
										<span>{num}</span>
									</div>
								)
							})}
						</div>
					</div>
					<div>
						<p>Matches</p>
						<div id="matches">
							{matches.length === 0 && result.length > 0 ? <p>You didn't match any number</p> : <p>You matched the following numbers:</p>}
							{matches.map(num => {
								return (
									<div>
										<span>{num}</span>
									</div>
								)
							})}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
