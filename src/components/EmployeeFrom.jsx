import React from "react";
import { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { uploadFile } from "../config/firebase/Config";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

export default function EmployeeForm() {
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [photo, setPhoto] = useState("");

  const jobTitles = ["SCRUM_MASTER", "DESARROLLADOR", "PO", "QA"];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("MAIN DATA: ",cedula, name, jobTitle, photo);
    createEmployee({ cedula, name, photo, jobTitle }).then((response) => {
      if(response.status === 200){
        navigate("/");
      }
      
    });
  };

  const handleUpload =  async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const fileRef = await uploadFile(file)
      console.log("FILE REF: ", fileRef);
      setPhoto(fileRef);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "25ch",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
          },
        }}
        autoComplete="off"
      >
        <div>
          <TextField
            id="standard-basic"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Cedula"
            variant="outlined"
            fullWidth
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </div>

        <div>
          <TextField
            id="standard-basic"
            label="Job Title"
            variant="outlined"
            select
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            helperText="Please select a job title"
          >
            {jobTitles.map((jobTitle) => (
              <MenuItem key={jobTitle} value={jobTitle}>
                {jobTitle}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload photo
            <VisuallyHiddenInput type="file" onChange={handleUpload} />
          </Button>
        </div>
      </Box>
    </>
  );
}
