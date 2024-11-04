import { getCurrentDay } from "../helpers";
import { useSelector } from "react-redux";
import '../stylings/dashboard.css';

const Dashboard = () => {

    const theme = useSelector((state)=>state.user.userData.settings.theme);

    return ( 
        <div className={`dashboard page ${theme}`}>
            <div className="header">
                <div className="header-date">{getCurrentDay()}</div>
                <h1>Dashboard</h1>
            </div>
        </div>
     );
}
 
export default Dashboard;