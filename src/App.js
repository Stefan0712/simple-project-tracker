import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // 
import store from './store/store.js';
import Dashboard from './pages/Dashboard.js';
import Activity from './pages/Activity.js';
import CreateProject from './pages/CreateProject.js';
import EditProject from './pages/EditProject.js';
import ViewProject from './pages/ViewProject.js';
import Browse from './pages/Browse.js';
import Navigation from './components/Navigation.js';

function App() {
  return (
    
      <div className='App'>
        <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/browse' element={<Browse />} />
              <Route path='/activity' element={<Activity />} />
              <Route path='/project/create' element={<CreateProject />} />
              <Route path='/project/:id' element={<ViewProject />} />
              <Route path='/project/:id/edit' element={<EditProject />} />
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
