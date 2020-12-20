import { useEffect, useState } from 'react';
import { GiClover } from 'react-icons/gi'
import { FiX, FiRefreshCw, FiPlayCircle } from 'react-icons/fi'

import Button from './components/Button'
import NumbersArea from './components/NumbersArea'

import './App.css';

function App() {
	const [nums, setNums] = useState([])
	const [guess, setGuess] = useState([])
	const [mode, setMode] = useState('')
	const [result, setResult] = useState([])
	const [matches, setMatches] = useState([])
	const [maxNum, setMaxNum] = useState(0)

	useEffect(() => {
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
				case 'e-z':
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

		setGuess([])
		setResult([])
		setMatches([])
		setNums([])

		switch (mode) {
			case 'mega':
				setMaxNum(6)
				break
			case 'corner':
				setMaxNum(5)
				break
			case 'e-z':
				setMaxNum(15)
				break
			case 'frenzy':
				setMaxNum(20)
				break
			default:
				break
		}

		createCard()
	}, [mode])

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
			case 'e-z':
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
			case 'e-z':
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
	}, [guess, result])

	const reset = () => {
		setGuess([])
		setResult([])
		setMatches([])
	}

	return (
		<div className="App">
			<main>
				<section className="mode">
					<Button className="mode-button mega-lotto" onClick={() => setMode('mega')}>
						<GiClover />Mega Lotto
					</Button>
					<Button className="mode-button corner-lotto" onClick={() => setMode('corner')}>
						<GiClover />Corner Lotto
					</Button>
					<Button className="mode-button e-z-lotto" onClick={() => setMode('e-z')}>
						<GiClover />E-Z Lotto
					</Button>
					<Button className="mode-button frenzy-lotto" onClick={() => setMode('frenzy')}>
						<GiClover />Frenzy Lotto
					</Button>
				</section>
				<h1 className={mode ? `${mode}-lotto` : ''}><GiClover /> {mode && `${mode} Lotto`}</h1>
				<section className="card">
					{!mode ? <p>Select a game to play</p> : [<p>Select <strong>{maxNum}</strong> numbers from the following card:</p>,
					<div className={`game-card ${mode}-card`}>
						{nums.map(num => <div key={num} className={`card-number${guess.includes(num) ? ` number-selected ${mode}-lotto` : ''}`} onClick={() => orderAndSet(num)}><span>{num}</span></div>)}
					</div>]}
				</section>
				<section className="results">
					<div>
						<h2>Your guess</h2>
						<NumbersArea id="guesses">
							{guess.map((g, i) => {
								return (
									<div key={`guesses_${i}`}>
										<span>{g}</span>
										{!result.length && <div onClick={() => removeFromGuess(i)}>
											<FiX size={12} color="tomato" />
										</div>}
									</div>
								)
							})}
						</NumbersArea>
					</div>
					<div id="buttons-wrapper">
						<Button className={`action-button ${mode}-lotto`} onClick={() => playGame(mode)} disabled={(guess.length !== maxNum || result.length) || (!guess.length && !result.length)}><FiPlayCircle /> Draw!</Button>
						<Button className={`action-button ${mode}-lotto`} onClick={reset} disabled={!result.length}><FiRefreshCw /> Reset</Button>
					</div>
					{!result.length ? null : <div>
						<h2>Results</h2>
						<NumbersArea id="results" array={result} />
					</div>}
					{!result.length ? null : <div>
						<h2>Matches</h2>
						{!result.length ? null : (matches.length === 0 && result.length > 0 ? <p>You didn't match any number</p> : <p>You matched the following numbers:</p>)}
						<NumbersArea id="matches" array={matches} />
					</div>}
				</section>
			</main>
		</div>
	);
}

export default App;
