import React, { Fragment, useState, useContext } from 'react'
import ToDoContext from '../../contexts/todoContext/TodoContext';

export const FormToDo = () => {

    const [name,setName] = useState('');

    const {createToDo} = useContext(ToDoContext);

    const handleChange = e => {
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        createToDo(name);
        setName('');
    }

    return (
        <div className="mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input onChange={handleChange} value={name} type="text" className="form-control" placeholder="Add todo" />
                    <div className="input-group-append">
                        <button onClick={handleSubmit} className="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormToDo;
