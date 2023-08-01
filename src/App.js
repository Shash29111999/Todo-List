import React ,{useState} from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);





function App(props) {

  const [filter, setFilter] = useState('All');


  const [tasks, setTasks] = useState(props.tasks);

 function addtask(name) {

  const newTask = { id: `todo-${nanoid()}`, name, completed: false };
  setTasks([...tasks, newTask]);

 }

 function toggleTaskCompleted(id){
  

  const newTasks = tasks.map( (task) => {
    if(id === task.id){
      return{...task , completed : !task.completed}
    }
    return task;
  })

  setTasks(newTasks);
  setTimeout(() => console.log(tasks,3000))
 }

 function deleteTask(id) {
  
  
  const remainingTasks = tasks.filter( (task) => id !== task.id)

  setTasks(remainingTasks)
  } 


  function editTask(id,namee){
    const edited = tasks.map((task) => {
      if(id === task.id){
        return {...task ,name : namee }
      }
      return task
    })
    setTasks(edited)
  }

 

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id}
    toggle={toggleTaskCompleted}
    delete = {deleteTask}
    edit = {editTask} />
  ));

  var temp = taskList.length == 1 ? "task" : "tasks";
  const heading = `${taskList.length} ${temp} is remaining`
  

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));
  
  


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form add={addtask} />
      <div className="filters btn-group stack-exception">
       {filterList}
      </div>
      <h2 id="list-heading">
        {heading}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        
      </ul>
    </div>
  );
}


export default App;
