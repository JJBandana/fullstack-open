import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  console.log(points)

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  }


  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button handleClick={vote} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random()*6))} text="next" />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[points.indexOf(Math.max(...points))]}
      <p>has {Math.max(...points)}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)