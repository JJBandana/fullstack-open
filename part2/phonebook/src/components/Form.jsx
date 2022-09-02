const Form = ({onSubmit, newName, handleNameChange, newNum, handleNumChange}) =>

<div>
<h3>Add a new</h3>
    <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNum} onChange={handleNumChange}/></div>
        <div><button type="submit">add</button></div>
    </form>
</div>

export default Form;