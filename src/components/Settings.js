import { resetUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../store/userSlice";

const Settings = () => {

    const settings = useSelector((state)=>state.user.userData.settings);
    const dispatch = useDispatch();

    const resetStore = () =>{
        dispatch(resetUser());
        window.location.reload();
    }
    const updateTheme = (value) =>{
        dispatch(changeTheme(value))
    }

    return ( 
        <div className={`settings ${settings.theme}`}>
            <h1>Settings</h1>
            <div className="setting-set">
                <p>Theme</p>
                <select onChange={(e)=>updateTheme(e.target.value)} value={settings?.theme}>
                    <option value={'dark'}>Dark</option>
                    <option value={'light'}>Light</option>
                </select>
            </div>
            <button className="reset-data" onClick={resetStore}>Reset</button>
        </div>
     );
}
 
export default Settings;