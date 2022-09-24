import Person from "./Person"
const Persons = ({persons, searchTerm, deletePerson}) => 

{
    return(
    <div>
        <h2>Numbers</h2>
        <ul>
            {persons.filter(contact => {
            if(contact == ''){
                return contact
            }else if(contact.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return contact
            }
            }).map(contact => <Person key={contact.name} person={contact} deletePerson={deletePerson} />)}
        </ul>
    </div>
    )
}

export default Persons