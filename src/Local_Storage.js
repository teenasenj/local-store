import React, {useEffect, useState} from "react";
import {IoIosCheckmarkCircleOutline} from 'react-icons/io';
import {MdDeleteForever} from 'react-icons/md';
import {FiCircle} from 'react-icons/fi';

const Local_Storage = () =>{

const [todos, setTodos] = useState([]);
const [todoItem, setTodoItem] = useState('');
const [error, setError] = useState (false);
const [completedTasks, setCompletedTasks] = useState('');

let weekday= new Date().toLocaleDateString('en-us', {weekday: 'long'});
let day = new Date().toLocaleDateString('en-us',{day:'numeric'});
let month = new Date().toLocaleDateString('en-us',{month:'short'});



const handleSubmit =(event) =>{
    event.preventDefault();
    if(todoItem){
        setError(false);
        let uniqueId = new Date().getTime().toString(36) +
        new Date().getUTCMilliseconds();

        let newTodoItems ={
            id: uniqueId,
            todo: todoItem,
            completed: false
        };
        setTodos([newTodoItems, ...todos]);
        setTodoItem('');
    }
    else{
        setError(true);
        setTodoItem('');
    }
}

const deletedTodo = (id) =>{
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos])
}

const toggleCompleted = (id) =>{
    todos.find((todo) =>{
        if(todo.id === id){
             todo.completed = !todo.completed;
        }
        return setTodos([...todos])
    })
}


useEffect(() => {
    let completeArray=[];
    todos.filter((todo)=> todo.completed === true && completeArray.push(todo))
    setCompletedTasks(completeArray.length);
    }, [todos])

    useEffect(() =>{
        const todos = JSON.parse(localStorage.getItem('todos'));
        if(todos){
            setTodos(todos)
        }
    },[])


    useEffect( () =>{
        let addError = setTimeout(() =>{
            setError(false);

        },2000)
        return() =>{
            clearTimeout(addError)
        }
    },[error]);

    useEffect(() =>{
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

return(
    <div className="app-container container mt-5 ms-5">
          
          <h1 style={{marginLeft:"320px",width:"600px"}} className="text-center text-warning bg-secondary p-4">
            Local Storage
          </h1>
        <div className="header-section mt-5">
            <h2 className="date text-primary fw-bold ms-5">
                {`${weekday}, ${day} ${month}`}
            </h2>
        </div>
            
            <div className="app-form-container">
                <form
                onSubmit={handleSubmit}>

                    <input
                    type="text"
                    value={todoItem}
                    className={error? 'error' : ''}
                    onChange={(event) => setTodoItem
                    (event.target.value)}
                    placeholder="add Item.."
                    />
                        
                        <button
                        type="submit"
                        className="btn">
                           <h1> Add ToDo</h1>
                        </button>
                </form>
            </div>
            <div className="data-card-container">
                <div className="data-card">
                    <h5>
                        {todos.length < 10 ? `0${todos.length}` : todos.length}
                    </h5>
                    <h2>created todos</h2>
                </div>

                <div className="data-card">
                  <h5>
                    {completedTasks < 10 ? `0${completedTasks}` : completedTasks}
                  </h5>
                  <h2>completed tasks</h2>
                 </div>
            </div>

            <div className="todo-container">
                {
                   todos.map((todoItem) =>{
                    const{id, todo, completed} = todoItem;
                    return(
                        <div 
                        key={id}
                        className="todo-card">
                            <div className="icon" onClick={() => toggleCompleted(id)}>
                                {!completed ? (<FiCircle/>): (
                                <IoIosCheckmarkCircleOutline className={completed ? 'icon-done' : ''} />)}
                            </div>

                            <h2
                            className={completed ? 'text-done' :''}>
                                {todo}
                            </h2> 

                            <MdDeleteForever onClick={() => deletedTodo(id)}
                            className='icon delete-icon'/>


                        </div>
                    )
                   })
                }
            </div>

            


    </div>
)

}

export default Local_Storage;