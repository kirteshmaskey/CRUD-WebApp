import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddData = () => {

  const navigate = useNavigate();
  const [inputValue, setValue] = useState({
    firstName:"",
    middleName:"",
    lastName:"",
    college:"",
    collegeId:"",
    phone:"",
    email:""
  });

  const setData = (e) => {
    // console.log(e.target.value);
    const {name, value} = e.target;

    setValue((val) => {
      return {
        ...val,
        [name]: value
      }
    })
  }

  const saveData = async(e)=> {
    e.preventDefault();
    const {firstName, middleName, lastName, college, collegeId, phone, email} = inputValue;

    const res = await fetch(`${BASE_URL}/addData`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        firstName, middleName, lastName, college, collegeId, phone, email
      })
    });

    const data = await res.json();
    // console.log(data);

    if(res.status === 422 || !data) {
      alert("Cannot add details");
      // console.log("Cannot add details");
    }else {
      alert("Details added");
      // console.log("Details added");
      navigate("/");
    }
  }

  return (
    <>
      <div className="d-grid">
          <NavLink to="/" className="text-decoration-none text-white btn btn-primary m-4" style={{ color: "#ff7722" }}>Home</NavLink>
      </div>
      <div className='m-5'>
        <Form>
          <div className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={inputValue.firstName} onChange={setData} placeholder="First Name" />
          </div>
          <div className="mb-3">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control type="text" name="middleName" value={inputValue.middleName} onChange={setData} placeholder="Middle Name" />
          </div>
          <div className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={inputValue.lastName} onChange={setData} placeholder="Last Name" />
          </div>
          <div className="mb-3">
            <Form.Label>College</Form.Label>
            <Form.Control type="text" name="college" value={inputValue.college} onChange={setData} placeholder="College" />
          </div>
          <div className="mb-3">
            <Form.Label>College Id</Form.Label>
            <Form.Control type="text" name="collegeId" value={inputValue.collegeId} onChange={setData} placeholder="College Id" />
          </div>
          <div className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="phone" name="phone" value={inputValue.phone} onChange={setData} placeholder="Mobile Number" />
          </div>
          <div className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={inputValue.email} onChange={setData} placeholder="Email" />
          </div>

          
          <div className="btn-container">
            <Button type="submit" className="btn btn-success submit-btn" style={{}} onClick={saveData}>Submit</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddData;