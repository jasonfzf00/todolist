import React from "react";

export const Form = ({userInput, onFormChange, onFormSubmit}) => {

    const handleChange = (event) =>{
        onFormChange(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        onFormSubmit();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        Plan your workload right!
                    </label>
                </h2>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Add
                </button>
            </form>
        </>
    )
}