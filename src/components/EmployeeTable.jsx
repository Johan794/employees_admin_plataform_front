import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";





export default function EmployeeTable({ employees , handleDetete}) {
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cedula</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Entry Date</TableCell>
              <TableCell align="right">Job Title</TableCell>
              <TableCell align="right">See employee details</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees ? (
              employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.cedula}
                  </TableCell>
                  <TableCell align="right">{employee.name}</TableCell>
                  <TableCell align="right">{employee.dateOfEntry}</TableCell>
                  <TableCell align="right">{employee.jobTitle.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate("/employee/" + employee.id)}
                    >
                      See Details
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDetete(employee.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
