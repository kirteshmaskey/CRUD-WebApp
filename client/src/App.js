import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DataContainer from './components/DataContainer';
import AddData from './components/AddData';
import EditData from './components/EditData';
import ViewDetails from './components/ViewDetails';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
    <div className="">
      <h1 className="App-header">CRUD WebApp</h1>
      
      <Routes>
        <Route exact path="/" element={<DataContainer />} />
        <Route path="/add-data" element={<AddData />} />
        <Route path="/edit-data/:id" element={<EditData />} />
        <Route path="/view-data/:id" element={<ViewDetails />} />
      </Routes>

    </div>
  </>
  );
}

export default App;
