import { Link } from "react-router-dom";
import Settings from "./Settings";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";


const Navigation = () => {

    const [showSettings, setShowSettings] = useState(false)

    const theme = useSelector((state)=>state.user.userData.settings.theme);
    return ( 
        <nav className={theme}>
            {showSettings ? <Settings closeSettings={()=>setShowSettings(false)}   /> : ''}
            <Link to={'/dashboard'}>
                <img className="nav-icon" src='/icons/dashboard.svg' alt="dashboard"></img>
                <p>Dashboard</p>
            </Link>
            <Link to={'/browse'}>
                <img className="nav-icon" src='/icons/list.svg' alt="browse lists"></img>
                <p>Browse</p>
            </Link>
            <Link to={'/project/create'}>
                <img className="nav-icon" src='/icons/add.svg' alt="new list"></img>
                <p>New Project</p>
            </Link>
            <Link to={'/activity'}>
                <img className="nav-icon" src='/icons/activity.svg' alt="activity"></img>
                <p>Activity</p>
            </Link>
            <button className="settings-button" onClick={()=>setShowSettings(true)}>
                <img className="nav-icon" src='/icons/settings.svg' alt="settings"></img>
                <p>Settings</p>
            </button>
        </nav>
     );
}
 
export default Navigation;