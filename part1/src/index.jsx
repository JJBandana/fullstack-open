import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => (
  <>
  <h1>{course}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
)

const Content = (props) => (
  <>
    <Part part={props.p1} exercises={props.e1} />
    <Part part={props.p2} exercises={props.e2} />
    <Part part={props.p3} exercises={props.e3} />
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} e1={exercises1} e2={exercises2} e3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))