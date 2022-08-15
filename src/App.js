import NewVehicleLog from "./Components/NewVehicleLog";
import classes from "./App.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import CustomerDetails from "./Components/CustomerDetails";
import Container from "@mui/material/Container";

function App() {
  const [newUserEntry, setNewUserEntry] = useState(12);
  const [vehicleHistoryArray, setVehicleHistoryArray] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const searchRef = useRef(null);
  const userSearchArray = [];
  const searchArray = [];
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(
        "https://vehicledetails-5ba2b-default-rtdb.firebaseio.com/vehicleHistory.json"
      );
      console.log(response.status);
      if (response.status === 404) {
        console.log("error ");
        return;
      }
      if (!response.ok) {
        throw new Error(
          "Something went wrong. Please check your network connection and try again"
        );
      }
      const responseData = await response.json();
      for (const key in responseData) {
        searchArray.push({
          id: key,
          rego: responseData[key].rego,
          driver: responseData[key].driverId,
          purpose: responseData[key].purpose,
          date: responseData[key].date,
        });
      }
      setVehicleHistoryArray(searchArray);
    };
    fetchUserDetails();
  }, [newUserEntry]);

  const userSearchHandler = async () => {
    setSearch((ser) => {
      return searchRef.current.value;
    });
    if (search) {
      console.log("inside if");
      setSearchPerformed((se) => !se);
    }
    searchRef.current.value = "";
    console.log(searchPerformed);
    for (const key in vehicleHistoryArray) {
      if (
        vehicleHistoryArray[key].rego.toLowerCase() ===
          searchRef.current.value.toLowerCase() ||
        vehicleHistoryArray[key].driver.toLowerCase() ===
          searchRef.current.value.toLowerCase()
      ) {
        userSearchArray.push({
          id: key,
          rego: vehicleHistoryArray[key].rego,
          driver: vehicleHistoryArray[key].driver,
          purpose: vehicleHistoryArray[key].purpose,
          date: vehicleHistoryArray[key].date,
        });
      }
    }
  };
  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = (props) => {
    setNewUserEntry((user) => user + 3);
    setIsModalOpen(false);
  };
  if (searchPerformed) {
    // setVehicleHistoryArray(userSearchArray);
    console.log(vehicleHistoryArray);
  }
  const customerDetailsList = vehicleHistoryArray.map((user) => (
    <CustomerDetails
      rego={user.rego}
      driver={user.driver}
      purpose={user.purpose}
      date={user.date}
    />
  ));
  return (
    <div className={classes.app}>
      <div className={classes.nav}>
        <div className={classes.navBar}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label=""
            size="small"
            variant="outlined"
            inputRef={searchRef}
          />
          <Button
            variant="contained"
            onClick={userSearchHandler}
            style={{
              backgroundColor: "#828382",
              marginLeft: "0.75rem",
            }}
            className={classes.searchButton}
          >
            search
          </Button>
        </div>
        {isModalOpen && <NewVehicleLog onClose={closeModalHandler} />}
      </div>
      <div className={classes.containerDiv}>
        <Container maxWidth="40rem" className={classes.container}>
          <section className={classes.section}>{customerDetailsList}</section>
        </Container>
        <Button
          variant="contained"
          onClick={openModalHandler}
          className={classes.insertButton}
          style={{
            backgroundColor: "#828382",
            marginTop: "1.5rem",
          }}
        >
          Insert
        </Button>
      </div>
    </div>
  );
}

export default App;
