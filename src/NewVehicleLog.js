import { TextField, Card, Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { useState, useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";
import firebase from "./firebase";
import Modal from "./Modal";
export default function NewVehicleLog(props) {
  const [value, setValue] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [formInputIsValid, setformInputIsValid] = useState(true);
  const isEmpty = (value) => value.trim() === "";
  const dateRef = useRef();
  const driverNameRef = useRef();
  const purposeRef = useRef();
  const regoRef = useRef();
  const [regoHelper, setRegoHelper] = useState(true);
  let regoError;
  const userDetailsHandler = (event) => {
    event.preventDefault();
    const rego = regoRef.current.value;
    const driverId = driverNameRef.current.value;
    const purpose = purposeRef.current.value;
    const date = dateRef.current.value;
    const regoIsValid = !isEmpty(rego);
    setRegoHelper(regoIsValid);
    const driverIdIsValid = !isEmpty(driverId);
    const purposeIsValid = !isEmpty(purpose);
    const dateIsValid = !isEmpty(date);
    regoError = `${regoHelper ? " " : "incorrect entry"}`;
    const formIsvalid =
      regoIsValid && driverIdIsValid && purposeIsValid && dateIsValid;
    if (!formIsvalid) {
      return;
    }
    props.onClose();
    const vId = Math.round(Math.random() * 33);
    const db = getDatabase();
    console.log("after db");
    set(ref(db, "vehicleHistory/" + vId), {
      rego: rego,
      driverId: driverId,
      purpose: purpose,
      date: date,
    });
  };
  return (
    <Modal onClose={props.onClose}>
      <div
        style={{
          margin: "translate(50%,50%) auto",
          padding: "2rem",
        }}
      >
        <Card
          style={{
            maxWidth: "20rem",
            maxHeight: "20rem",
            display: "inline-grid",
            padding: "1rem",
          }}
        >
          <TextField
            style={{ marginBottom: "1rem" }}
            id="outlined-error-helper-text"
            label="rego"
            helperText={regoHelper ? " " : "incorrect entry"}
            inputRef={regoRef}
          />
          {/* <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
          /> */}
          <TextField
            style={{ marginBottom: "1rem" }}
            label="driver"
            inputRef={driverNameRef}
          />

          <Select
            style={{ marginBottom: "1rem" }}
            inputRef={purposeRef}
            value={value}
            label="purpose"
          >
            <MenuItem value={"rent"}>Rent</MenuItem>
            <MenuItem value={"return"}>Return</MenuItem>
          </Select>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            style={{ marginBottom: "1rem" }}
          >
            <DatePicker
              label="date"
              value={value}
              inputRef={dateRef}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Card>
        {/* <p>please check the details entered</p> */}
        <Button
          variant="contained"
          onClick={userDetailsHandler}
          style={{
            marginTop: "0.75rem",
            marginLeft: "27%",
          }}
        >
          insert
        </Button>
      </div>
    </Modal>
  );
}
