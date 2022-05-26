import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "../App.css";

// This component contains everything relevant for the meetings
// Each meeting has a title, time, text description
// These 3 things will be the state of the component
function Meetings() {
  // title is a text field with a default value of ""
  const [title, setTitle] = useState("");

  // create a new date object
  let today = new Date();
  const [date, setDate] = useState(
    // ensuring that the date format matches the one specified by Django
    today.toISOString().split("T")[0]
  );
  const [description, setDescription] = useState("");

  // estimated time
  const [timeEst, setTimeEst] = useState(0);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDate = (newDate) => {
    setDate(newDate.toISOString().split("T")[0]);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeTime = (event) => {
    if (event.target.value < 0) {
      // set it to 0
      setTimeEst(0);
    } else {
      setTimeEst(event.target.value);
    }
  };
  const Submit = (e) => {
    e.preventDefault();
    console.log([title, date, timeEst, description]);
    fetch("http://localhost:8000/meetings/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([title, date, timeEst, description]),
    })
      // convert data to json
      .then((data) => data.json())
      // check the data
      .then((data) => {
        if (data.code === 200) {
          // data is ok do nothing
        } else {
          // send an alert with the incorrect data
          alert(data.code);
        }
      })
      .then(alert("Success"))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h1>Investor Meetings</h1>
      <div className="container">
        <div className="displayMeetings">
          <h3>Upcoming meetings</h3>
          <Button onClick={Submit}>Submit</Button>
        </div>
        <h3>Add meetings</h3>
        <div className="createMeetings">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleChangeTitle}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  required
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                  label="Time estimate"
                  type={"number"}
                  value={timeEst}
                  onChange={handleChangeTime}
                />
              </Stack>
            </LocalizationProvider>

            <TextField
              required
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              value={description}
              onChange={handleChangeDescription}
            />
          </Box>
          <Button onClick={Submit}>Submit</Button>
        </div>
      </div>
    </>
  );
}

export default Meetings;
