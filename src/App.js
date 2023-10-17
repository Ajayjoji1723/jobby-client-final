import {Routes, Route} from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home';
import Jobs from './components/Jobs';
import NotFound from './components/NotFound';
import JobItemDetails from './components/JobItemDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/auth" element={<Auth />}   />
        <Route exact path = "/" element={<Home/> }/>
        <Route exact path = "/jobs" element={<Jobs />}/>
        <Route exact path ="/jobs/:id" element={<JobItemDetails />}/>
        <Route path ="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
