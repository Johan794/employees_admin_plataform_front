import React from "react";
import { getEmployees } from "../services/EmployeeService";
import { useEffect, useState } from "react";
import  EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { deleteEmployee } from "../services/EmployeeService";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Home() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const MySwal = withReactContent(swal);

    const handleDetete = (id) => {
        MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteEmployee(id).then((response) => {
              if (response.status === 200) {
                MySwal.fire({
                  title: "Deleted!",
                  text: "Your employee has been deleted.",
                  icon: "success",
                });
                setEmployees(employees.filter((employee) => employee.id !== id));
              }
            });
          }
        });
      };


    

    useEffect(() => {
        getEmployees().then((response) => {
            if(response.status === 200){
                setEmployees(response.data)
            }
        });
    }, []);

    if (!employees) {
      MySwal.fire("There are no employees, try to register one!");
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Employees</h2>
            <Button variant="contained" onClick={() => navigate("/create")}>Create Employee</Button>
            <EmployeeTable employees={employees} handleDetete={handleDetete}/>
        </div>
    );
}   