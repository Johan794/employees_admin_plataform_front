import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateEmployee } from "../services/EmployeeService";
import { useState, useEffect } from "react";

export default function EmployeeCard({ employee }) {
  const navigate = useNavigate();
  const MySwal = withReactContent(swal);
  const [employeeData, setEmployeeData] = useState(null);
  
  useEffect(() => {
    console.log(employeeData)
    if(employeeData){
        updateEmployee(employeeData).then((response) => {
            if (response.status === 200) {
              MySwal.fire({
                title: "Updated!",
                text: "Your employee has been updated.",
                icon: "success",
              });
            }
          });
    }       
  }, [employeeData]);

  const handleUpdate = async () => {
    const { value: field } = await MySwal.fire({
      title: "Select a field to update",
      input: "select",
      inputOptions: {
        name: "Name",
        JobTitle: "Job Title",
      },
      inputPlaceholder: "Select a filed",
      showCancelButton: true,
    });

    if (field) {
      if (field === "name") {
        const { value: name } = await MySwal.fire({
          title: "Enter the new value for el name",
          input: "text",
          inputLabel: "Your name",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            }
          },
        });

        if (name) {
          let newData = { ...employee, name }
          delete newData.dateOfEntry
          newData.jobTitle = employee.jobTitle.name
          console.log(newData)
          setEmployeeData(newData);
        }
      } else {
        const { value: jobTitle } = await MySwal.fire({
          title: "Select a job title",
          input: "select",
          inputOptions: {
            JobTile: {
              Scrum: "SCRUM_MASTER",
              Developer: "DESARROLLADOR",
              QA: "QA",
              PO: "PO",
            },
          },
          inputPlaceholder: "Select a job title",
          showCancelButton: true,
        });

        if (jobTitle) {
          let newData = employee
          newData.jobTitle = jobTitle
          delete newData.dateOfEntry
          setEmployeeData(newData);
        }
      }
    }
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={employee.photo} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {employee.cedula}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.jobTitle.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/")}>
          Back to home
        </Button>
        <Button size="small" onClick={handleUpdate}>
          Update info
        </Button>
      </CardActions>
    </Card>
  );
}
