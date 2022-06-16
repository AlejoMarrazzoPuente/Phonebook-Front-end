import React from "react";

const Persons = ({filterPersons}) => {
    return(
        <>
            <ul>
                {filterPersons}
            </ul>
        </>
    )
}

export default Persons;