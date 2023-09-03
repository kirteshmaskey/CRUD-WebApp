import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DataContainer = () => {

  //to fetch details of all the students present in database
  const [getUserDetails, setUserDetails] = useState([]);
  const [isData, setIsData] = useState(false);
  // console.log(getUserDetails);

  const getData = async(e)=> {
    const res = await fetch(`${BASE_URL}/getData`,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json"
      }
    });

    const data = await res.json();
    // console.log(data);

    if(res.status === 422 || !data) {
      alert("Something went wrong while fetching data");
      // console.log("Something went wrong while fetching data");
    }else {
      setUserDetails(data);
      setIsData(true);
      // console.log("Get Details");
    }
  }

  useEffect(()=>{
    getData();
  },[])



  //To delete existing students details
  const deleteUser = async(id)=> {
    const data = await fetch(`${BASE_URL}/deleteData/${id}`,{
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      }
    });

    const deleteData = await data.json();
    console.log(deleteData);

    if(data.status === 422 || !deleteData) {
      alert("Something went wrong");
      // console.log("Cannot delete student details");
    }else{
      // console.log("User details deleted");
      alert("Student details deleted")
      getData();
    }
  }

  return (
    <>
    <div className="d-grid">
        <NavLink varient="primary" to="/add-data" className="text-decoration-none text-white btn btn-primary m-4" style={{ color: "#ff7722" }}>Add Data</NavLink>
    </div>
    <div className="mt-5 container">
      <Table striped className=''>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>College Id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            isData ?
              getUserDetails.map((user, id) => {
                return (
                  <>
                    <tr>
                      <td>{id+1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.collegeId}</td>
                      <td className="action-btn">
                        <NavLink to={`view-data/${user._id}`} className='text-decoration-none btn btn-primary'>View</NavLink>
                        <NavLink to={`edit-data/${user._id}`} className='btn btn-success'>Edit</NavLink>
                        <Button className='btn btn-danger' onClick={()=> deleteUser(user._id)}>Delete</Button>
                      </td>
                    </tr>
                  </>
                )
              })
            :
            <div className="loader-container">
              <Box sx={{ display: 'flex', justifyContent: "center", height: "100vh" }}>
                Loading... &nbsp;
                <CircularProgress />
              </Box>
            </div>
          }
        </tbody>
      </Table>
    </div>
    </>
  );
}

export default DataContainer;