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
  const [inputHelper, setInputHelper] = useState({
    rego: true,
    driver: true,
    purpose: true,
    date: true,
  });
  const userDetailsHandler = (event) => {
    event.preventDefault();
    const rego = regoRef.current.value;
    const driverId = driverNameRef.current.value;
    const purpose = purposeRef.current.value;
    const date = dateRef.current.value;
    const regoIsValid = !isEmpty(rego);
    setInputHelper({
      rego: rego,
      driver: driverId,
      purpose: purpose,
      date: date,
    });
    const driverIdIsValid = !isEmpty(driverId);
    const purposeIsValid = !isEmpty(purpose);
    const dateIsValid = !isEmpty(date);
    const formIsvalid =
      regoIsValid && driverIdIsValid && purposeIsValid && dateIsValid;
    if (!formIsvalid) {
      return;
    }
    props.onClose();
    const vId = Math.round(Math.random() * 33);
    const db = getDatabase();

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
            helperText={inputHelper.rego ? " " : "incorrect entry"}
            inputRef={regoRef}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            label="driver"
            helperText={inputHelper.driver ? " " : "incorrect entry"}
            inputRef={driverNameRef}
          />

          <Select
            style={{ marginBottom: "1rem" }}
            inputRef={purposeRef}
            label="purpose"
            helperText={inputHelper.purpose ? " " : "please select one"}
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
              helperText={inputHelper.date ? " " : "please enter in dd/mm/yyyy"}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Card>
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
