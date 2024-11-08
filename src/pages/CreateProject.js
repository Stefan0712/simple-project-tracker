import { getCurrentDay, convertToSlug, getCurrentDate } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import '../stylings/project.css';
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import { v4 as uuidv4 } from 'uuid';
import { addProject } from "../store/userSlice";
import { useNavigate } from "react-router-dom";


const CreateProject = () => {

    const theme = useSelector((state)=>state.user.userData.settings.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [statuses, setStatuses] = useState([]);
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);

    //status values
    const [statusName, setStatusName] = useState('');
    const [statusColor, setStatusColor] = useState('#FFFFFF');


    //list values
    const [listName, setListName] = useState('')
    const [listDescription, setListDescription] = useState('');
    const [listDueDate, setListDueDate] = useState('');
    const [listPriority, setListPriority] = useState('normal');


    //task values
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('normal');
    const [taskStatus, setTaskStatus] = useState('')
   
    //error validations
    const [projectNameError, setProjectNameError] = useState('');
    const [listNameError, setListNameError] = useState('');
    const [taskNameError, setTaskNameError] = useState('');
    const [statusNameError, setStatusNameError] = useState('');

    const getColor = (color) =>{
        setStatusColor(color);
    }



    const removeStatus = (e, statusValue) =>{
        e.preventDefault();
        setStatuses((statuses)=>[...statuses.filter((item)=>item.value !== statusValue)]);
        
    }
    const addStatus = (e) =>{
        e.preventDefault();
        if(statusName){
            const item = {id: uuidv4(), name: statusName, color: statusColor, value: convertToSlug(statusName)};
            setStatuses((statuses)=>[...statuses, item]);
            setStatusName('');
            setStatusColor('#FFFFFF');
            
        }else{
            setStatusNameError('Please enter a status name');
            setTimeout(()=>{setStatusNameError('')},1000)
        }
    }

    //lists handlers

    const handleAddList = (e) =>{
        e.preventDefault();
        if(listName){
            setLists((lists)=>[...lists, 
                {   id: uuidv4(), 
                    name: listName,
                    description: listDescription,
                    dueDate: listDueDate,
                    priority: listPriority,
                    createdAt: getCurrentDay(),
                    author: '',
                    notes: [],

                }
            ]);
            setListName('');
            setListDescription('');
            setListDueDate('');
            setListPriority('normal');
        }else{
            setListNameError('Please enter a list name');
            setTimeout(()=>{setListNameError('')},1000)
        }
    }
    const handleAddTask = (e) =>{
        e.preventDefault();
        if(taskName){
            const task = {   
                id: uuidv4(), 
                name: taskName,
                description: taskDescription,
                dueDate: taskDueDate,
                priority: taskPriority,
                subtasks: [],
                statuses,
                status: taskStatus,
                isCompleted: false,
                createdAt: getCurrentDay(),
                author: ''
            }
            setTasks((tasks)=>[...tasks, task]);
        
            setTaskName('');
            setTaskDescription('');
            setTaskDueDate('');
            setTaskPriority('normal');
            setTaskStatus('');
        }else{
            setTaskNameError('Please enter a task name');
            setTimeout(()=>{setTaskNameError('')},1000)
        }
    }
    const removeList = (e, id)=> {
        e.preventDefault();
        setLists((lists)=>[...lists.filter((item)=>item.id !== id)])
    }
    const removeTask = (e, id)=> {
        e.preventDefault();
        setTasks((tasks)=>[...tasks.filter((item)=>item.id !== id)])
    }
    const handleCreateProject = (e) =>{
        e.preventDefault();
        if(projectName){
            const projectData = {
                id: uuidv4(),
                name: projectName,
                description: projectDescription,
                dueDate,
                statuses,
                lists,
                tasks,
                notes: [],
                author: '',
                createdAt: getCurrentDay(),
            };
            dispatch(addProject(projectData));
            navigate('/dashboard');
        }else{
            setProjectNameError('Project Name cannot be empty!');
            setTimeout(()=>{setProjectNameError('')},1000);
        }
    }
    return ( 
        <div className={`create-project page ${theme}`}>
            <div className="header">
                <div className="header-date">{getCurrentDay()}</div>
                <h1>Create Project</h1>
            </div>
            <form className="create-project-form">
                <div className="first-half">
                    <fieldset>
                        <label>Project name</label>
                        <input className={projectNameError ? 'input-error' : ''} type="text" name="name" id="name" onChange={(e)=>setProjectName(e.target.value)} value={projectName} />
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
                            <input type="text" className={statusNameError ? 'input-error' : ''} name="statusName" id="statusName" onChange={(e)=>setStatusName(e.target.value)} value={statusName} placeholder="Status Name"></input>
                            <img src="/icons/plus.svg" onClick={addStatus} className="icon add-status-button" alt="add status"></img>
                        </div>
                        <div className="statuses-container">
                            {statuses.map((status, index)=>(
                                <div className="status-body" key={index}>
                                    <div className="status-color" style={{backgroundColor: status.color}}></div>
                                    <div className="status-name">{status.name}</div>
                                    <img onClick={(e)=>removeStatus(e, status.value)} src="/icons/delete.svg" className="icon delete-status-button icon-30" alt="delete status"/>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    <button className="create-project-button" onClick={handleCreateProject}>Create Project</button>
                </div>
                <div className="second-half">
                    <div className="new-list">
                        <h3>Add Lists</h3>
                        <div className="new-list-form">
                            <div className="inputs">
                                <fieldset>
                                    <label>List Name</label>
                                    <input className={listNameError ? 'input-error' : ''} type="text" name="listName" id="listName" onChange={(e)=>setListName(e.target.value)} value={listName} />
                                </fieldset>
                                <fieldset>
                                    <label>List Due Date</label>
                                    <input type="date" name="listDueDate" id="listDueDate" onChange={(e)=>setListDueDate(e.target.value)} value={listDueDate} />
                                </fieldset>
                                <fieldset>
                                    <label>List Description</label>
                                    <input type="text" name="listDescription" id="listDescription" onChange={(e)=>setListDescription(e.target.value)} value={listDescription} />
                                </fieldset>
                                <fieldset>
                                    <label>List Priority</label>
                                    <select name="listPriority" id="listPriority" onChange={(e)=>setListPriority(e.target.value)} value={listPriority}>
                                        <option value={'low'}>Low</option>
                                        <option value={'normal'}>Normal</option>
                                        <option value={'high'}>High</option>
                                    </select>
                                </fieldset>
                            </div>
                            <fieldset>
                                <p className="opacity-0">.</p>
                                <button className="add-list-button" onClick={handleAddList}><img src="/icons/plus.svg" className="icon" alt="add list button"></img></button>
                            </fieldset>
                        </div>
                        <div className="created-lists-container">
                            {lists.length > 0 ? lists.map((list)=>(
                                <div className="list-body">
                                    <h3>{list.name}</h3>
                                    <p>{list.dueDate}</p>
                                    <p>{list.priority}</p>
                                    <img onClick={(e)=>removeList(e, list.id)} src="/icons/delete.svg" className="icon icon-30 delete-list-button" alt="delete list"/>
                                </div>)) : (<p>Lists will appear here</p>)}
                        </div>
                    </div>
                    <div className="new-task">
                        <h3>Add Tasks</h3>
                        <div className="new-task-form">
                            <div className="inputs">
                                <fieldset>
                                    <label>Name</label>
                                    <input className={taskNameError ? 'input-error' : ''} type="text" name="taskName" id="taskName" onChange={(e)=>setTaskName(e.target.value)} value={taskName} />
                                </fieldset>
                                <fieldset>
                                    <label>Status</label>
                                    <select name="taskStatus" id="taskStatus" onChange={(e)=>setTaskStatus(statuses.find((item)=>item.id===e.target.value))} value={""}>
                                        <option key={'no-selection-option'} value={''}>Not Set</option>
                                        {statuses.map((status)=>(<option key={status.id} value={status.id}>{status.name}</option>))}
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label>Due Date</label>
                                    <input type="date" name="taskDueDate" id="taskDueDate" onChange={(e)=>setTaskDueDate(e.target.value)} value={taskDueDate} />
                                </fieldset>
                                <fieldset>
                                    <label>Description</label>
                                    <input type="text" name="taskDescription" id="taskDescription" onChange={(e)=>setTaskDescription(e.target.value)} value={taskDescription} />
                                </fieldset>
                                <fieldset>
                                    <label>Priority</label>
                                    <select name="taskPriority" id="taskPriority" onChange={(e)=>setTaskPriority(e.target.value)} value={taskPriority}>
                                        <option value={'low'}>Low</option>
                                        <option value={'normal'}>Normal</option>
                                        <option value={'high'}>High</option>
                                    </select>
                                </fieldset>
                            </div>
                            <fieldset>
                                <p className="opacity-0">.</p>
                                <button className="add-task-button" onClick={handleAddTask}><img src="/icons/plus.svg" className="icon" alt="add task button"></img></button>
                            </fieldset>
                        </div>
                        <div className="created-tasks-container">
                            
                            {tasks.length > 0 ? tasks.map((task)=>(
                                
                                <div className="task-body" key={task.id}>
                                    <div className="task-color" style={{backgroundColor: task.status?.color}}></div>
                                    <h3>{task.name}</h3>
                                    <p>{task.status ? task.status.name : 'Not Set'}</p>
                                    <p>{task.dueDate}</p>
                                    <p>{task.priority}</p>
                                    <img onClick={(e)=>removeTask(e, task.id)} src="/icons/delete.svg" className="icon delete-task-button icon-30" alt="delete task"/>
                                </div>
                            )) : (<p>Tasks will appear here</p>)}
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
     );
}
 
export default CreateProject;