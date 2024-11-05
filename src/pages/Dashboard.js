import { getCurrentDay } from "../helpers";
import { useSelector } from "react-redux";
import '../stylings/dashboard.css';

const Dashboard = () => {

    const theme = useSelector((state)=>state.user.userData.settings.theme);
    const projects = useSelector((state)=>state.user.userData.projects);

    return ( 
        <div className={`dashboard page ${theme}`}>
            <div className="header">
                <div className="header-date">{getCurrentDay()}</div>
                <h1>Dashboard</h1>
            </div>
            <div className="projects">
                <h2>Projects</h2>
                <div className="projects-container">
                    {projects.length>0 ? projects.map((project)=>(
                        <div className="project-body">
                            <h4>{project.name}</h4>
                            <p>Lists: {project.lists.length}</p>
                            <p>Tasks: {project.tasks.length}</p>
                        </div>
                    )) : 'No projects found'}
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;