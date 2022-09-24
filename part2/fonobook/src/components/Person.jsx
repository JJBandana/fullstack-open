const Person = ({person, deletePerson}) => <li>{person.name} {person.number}<input id={person.id} name={person.name} onClick={deletePerson} type='button' value='delete'/></li>

export default Person