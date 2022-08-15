import { TextField, Card, Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { useState, useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";
import firebase from "../../src/firebase";
import Modal from "./Modal";
import classes from "./NewVehicleLog.module.css";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
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
  const backdropHandler = () => {
    console.log("inside back");
    props.onClose();
  };
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
      // props.onClose()
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
  // const useStyles = makeStyles({
  //   input: {
  //     color: "blue",
  //   },
  // });
  return (
    <Modal onClick={backdropHandler}>
      <div className={classes.newVehicleLog}>
        <Card className={classes.vehicleLogCard}>
          <TextField
            className={classes.rego}
            id="outlined-error-helper-text"
            label="rego"
            // inputProps={{ className: classes.input }}
            helperText={inputHelper.rego ? " " : "incorrect entry"}
            inputRef={regoRef}
          />
          <TextField
            className={classes.driver}
            label="driver"
            helperText={inputHelper.driver ? " " : "incorrect entry"}
            inputRef={driverNameRef}
          />

          <Select
            className={classes.purpose}
            inputRef={purposeRef}
            label="purpose"
            helperText={inputHelper.purpose ? " " : "please select one"}
          >
            <MenuItem value={"rent"}>Rent</MenuItem>
            <MenuItem value={"return"}>Return</MenuItem>
          </Select>
          <LocalizationProvider
            style={{
              border: "1px solid red",
            }}
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              label="date"
              value={value}
              inputRef={dateRef}
              helperText={inputHelper.date ? " " : "please enter in dd/mm/yyyy"}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} className={classes.date} />
              )}
            />
          </LocalizationProvider>
        </Card>
        <Button
          variant="contained"
          onClick={userDetailsHandler}
          className={classes.createEntryButton}
        >
          add vehicle log
        </Button>
      </div>
    </Modal>
  );
}
