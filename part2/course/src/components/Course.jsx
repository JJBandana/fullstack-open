const Header = ({text}) => <h2>{text}</h2>

const Content = ({parts}) => (
    <div>
        {parts.map((part) => (<Part key={part.id} name={part.name} exercises={part.exercises} />))}
    </div>
    )


const Part = (props) => (
    <div>
        <p>{props.name} {props.exercises}</p>
    </div>
)

const Course = ({course}) => (
    <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

const Total = ({parts}) => {
    const res = parts.reduce((acc, part) => {return acc += part.exercises}, 0);
    console.log(res)
    return(
    <div>
        <b>total of {res} exercises</b>
    </div>
)}

export default Course