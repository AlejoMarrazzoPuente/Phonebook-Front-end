import React from "react";

const Filter = ({handleSearchChange, searchPerson}) => {
    return(
        <>
            <label>Filter shown with </label>
            <input type="text" onChange={handleSearchChange} value={searchPerson.name}/>
        </>
    )
}

export default Filter;