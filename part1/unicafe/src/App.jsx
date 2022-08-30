import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Stat = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>
const Stats = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good-bad)/all : 0;
  const positive = all > 0 ? (good/all)*100 : 0;

  if (all === 0){
    return <div>No feedback given</div>
  }

return(
  <table>
    <tbody>
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="bad" value={bad} />

      <Stat text="all" value={all} />
      <Stat text="average" value={average} />
      <Stat text="positive" value={positive + " %"} />
    </tbody>
  </table>
)
}


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
      
      <Stats good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
