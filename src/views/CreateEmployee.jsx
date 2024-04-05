import React from "react";
import EmployeeForm from "../components/EmployeeFrom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function CreateEmployee() {
    const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Create Employee</h2>
      <EmployeeForm />
        <Button variant="contained" color = "error" onClick={() => navigate("/")}>
            Cancel
        </Button>
    </div>
  );
}
