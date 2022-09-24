const Form = ({onSubmit, newName, handleNameChange, newNum, handleNumChange}) =>

<div>
<h2>Add a new contact</h2>
    <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNum} onChange={handleNumChange}/></div>
        <div><button type="submit">add</button></div>
    </form>
</div>

export default Form;