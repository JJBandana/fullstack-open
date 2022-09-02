import Person from "./Person"
const Persons = ({persons, searchTerm}) => 

{
    return(
    <div>
        <ul>
            {persons.filter(contact => {
            if(contact == ''){
                return contact
            }else if(contact.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return contact
            }
            }).map(contact => <Person key={contact.name} person={contact} />)}
        </ul>
    </div>
    )
}

export default Persons