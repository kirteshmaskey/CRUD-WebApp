import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ViewDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams("");
  // console.log(id);

  const [user, setUserDetails] = useState([]);
  // console.log(user);

  const getData = async (e) => {
    const res = await fetch(`${BASE_URL}/viewData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      alert("Something went wrong");
      // console.log("Error fetching data");
    } else {
      setUserDetails(data);
      // console.log("Student details fetched");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //To delete existing students details
  const deleteUser = async (id) => {
    const data = await fetch(`${BASE_URL}/deleteData/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteData = await data.json();
    // console.log(deleteData);

    if (data.status === 422 || !deleteData) {
      console.log("Cannot delete student details");
    } else {
      alert("Student details deleted");
      // console.log("User details deleted");
      navigate("/");
    }
  };

  return (
    <>
      <div className="d-grid">
        <NavLink
          to="/"
          className="text-decoration-none text-white btn btn-primary m-4"
          style={{ color: "#ff7722" }}
        >
          Home
        </NavLink>
      </div>
      <div className="view-container">
        {user ? (
          <>
            <div className="card card-view">
              <div className="">
                <NavLink
                  to={`/edit-data/${user._id}`}
                  className="text-decoration-none text-white btn btn-primary"
                  style={{ color: "#ff7722" }}
                >
                  Edit
                </NavLink>{" "}
                <Button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Button>
              </div>

              <div>
                <h3>
                  Name:{" "}
                  <span>
                    {user.firstName +
                      " " +
                      user.middleName +
                      " " +
                      user.lastName}
                  </span>
                </h3>
                <h4>
                  College: <span>{user.college}</span>
                </h4>
                <h4>
                  College Id: <span>{user.collegeId}</span>
                </h4>
                <h4>
                  Phone Number: <span>{user.phone}</span>
                </h4>
                <h4>
                  Email: <span>{user.email}</span>
                </h4>
              </div>
            </div>
          </>
        ) : (
          <div className="loader-container">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              Loading... &nbsp;
              <CircularProgress />
            </Box>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewDetails;
