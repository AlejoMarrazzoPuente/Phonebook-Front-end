import React from "react";

const PersonForm = ({handleSubmit, handleInputChange, handleNumberChange, addPerson}) => {
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label> Name: </label>
                        <input type="text" onChange={handleInputChange} value={addPerson.name} required/>
                    </div>
                <div>
                    <label> Number: </label>
                    <input type="tel" onChange={handleNumberChange} value={addPerson.number} minLength="10" maxLength="13" required/>
                </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
        </>
    )
}


export default PersonForm;