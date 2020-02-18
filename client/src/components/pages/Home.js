import React,{useContext} from 'react';
import AuthContext from '../../contexts/authContext/AuthContext';
import ToDoList from '../todos/ToDoList';
import ToDoContext from '../../contexts/todoContext/TodoContext';
import FormToDo from '../todos/FormToDo';

const Home = (props) => {

    const {logout,user} = useContext(AuthContext);
    const {clearToDo} = useContext(ToDoContext);

    const handleClick = () => {
        logout();
        clearToDo();
    }

    return ( 
        <div className="text-center">
            <h1>Welcome {user.name}</h1>
            <br />
            <FormToDo />
            <br />
            <ToDoList />
            <br />
            <button onClick={handleClick} className="btn btn-danger">Logout</button>
        </div>
     );
}
 
export default Home;