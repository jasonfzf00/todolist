import React from "react";

export const Todo = ({ listOfTodos, onDelete, onCheck }) => {
    return (
        <>
            {listOfTodos.map(todo => {
                return (
                    <li className="todo stack-small" key={todo.id}>
                        <div className="c-cb">
                            <input id={todo.id} type="checkbox" onClick={() => onCheck(todo.id)}/>
                            <label className="todo-label" htmlFor={todo.id}>
                                {todo.name}
                            </label>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn__danger"
                                onClick={() => onDelete(todo.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                )
            })}
        </>
    )
} 