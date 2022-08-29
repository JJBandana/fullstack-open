import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>
const Stats = props => <p>{props.text}:  {props.value}</p>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>setGood(good + 1)} text='good' />
      <Button handleClick={()=>setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={()=>setBad(bad + 1)} text='bad' />
      <h1>Statistics</h1>
      
      <Stats text='Good' value={good} />
      <Stats text='Neutral' value={neutral} />
      <Stats text='Bad' value={bad} />

      <Stats text='All' value={good + bad + neutral} />
      <Stats text='Average' value={neutral} />
      <Stats text='Positive' value={bad} />

    </div>
  )
}

export default App
