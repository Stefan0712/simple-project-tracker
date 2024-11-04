import { getCurrentDay, convertToSlug } from "../helpers";
import { useSelector } from "react-redux";
import '../stylings/project.css';
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";

const CreateProject = () => {

    const theme = useSelector((state)=>state.user.userData.settings.theme);

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);

    //status values
    const [statusName, setStatusName] = useState('');
    const [statusColor, setStatusColor] = useState('#33FF57');


    //list values
    const [listName, setListName] = useState('')
    const [listDescription, setListDescription] = useState('');
    const [listDueDate, setListDueDate] = useState('');
    const [listPriority, setListPriority] = useState('normal');


    //task values
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('normal');
   



    const getColor = (color) =>{
        setStatusColor(color);
    }



    const removeStatus = (e, statusValue) =>{
        e.preventDefault();
        setStatuses((statuses)=>[...statuses.filter((item)=>item.value !== statusValue)]);
        
    }
    const addStatus = (e) =>{
        e.preventDefault();
        const item = {name: statusName, color: statusColor, value: convertToSlug(statusName)};
        setStatuses((statuses)=>[...statuses, item]);
        console.log(item);
        setStatusName('');
        setStatusColor('#33FF57');
    }

    //lists handlers

    const addList = () =>{

    }

    return ( 
        <div className={`create-project page ${theme}`}>
            <div className="header">
                <div className="header-date">{getCurrentDay()}</div>
                <h1>Create Project</h1>
            </div>
            <form className="create-list-form">
                <div className="first-half">
                    <fieldset>
                        <label>Project name</label>
                        <input type="text" name="name" id="name" onChange={(e)=>setProjectName(e.target.value)} value={projectName} />
                    </fieldset>
                    <fieldset>
                        <label>Description</label>
                        <input type="text" name="description" id="description" onChange={(e)=>setProjectDescription(e.target.value)} value={projectDescription} />
                    </fieldset>
                    <fieldset>
                        <label>Due Date</label>
                        <input type="date" name="dueDate" id="dueDate" onChange={(e)=>setDueDate(e.target.value)} value={dueDate} />
                    </fieldset>
                    <fieldset>
                        <label>Task Statuses</label>
                        <div className="new-status">
                            <ColorPicker getColor={getColor} />
                            <input type="text" name="statusName" id="statusName" onChange={(e)=>setStatusName(e.target.value)} value={statusName} placeholder="Status Name"></input>
                            <img src="/icons/plus.svg" onClick={addStatus} className="icon add-status-button" alt="add status"></img>
                        </div>
                        <div className="statuses-container">
                            {statuses.map((status)=>(
                                <div className="status-body">
                                    <div className="status-color" style={{backgroundColor: status.color}}></div>
                                    <div className="status-name">{status.name}</div>
                                    <img onClick={(e)=>removeStatus(e, status.value)} src="/icons/delete.svg" className="icon delete-status-button" alt="delete status"/>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div className="second-half">
                    <h3>Add Lists</h3>
                    <h3>Add Tasks</h3>
                    
                </div>
            </form>
        </div>
     );
}
 
export default CreateProject;