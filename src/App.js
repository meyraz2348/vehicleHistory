import NewVehicleLog from "./Components/NewVehicleLog";
import classes from "./App.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import CustomerDetails from "./Components/CustomerDetails";
import Container from "@mui/material/Container";
import ErrorModal from "./UI/ErrorModal.js";
import { set } from "date-fns";

function App() {
  const [newUserEntry, setNewUserEntry] = useState(12);
  const [vehicleHistoryArray, setVehicleHistoryArray] = useState([]);
  const [vehicleLog, setVehicleLog] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [noMatchFoundClass, setNoMatchFoundClass] = useState(true);

  const searchRef = useRef(null);
  const userSearchArray = [];
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(
        "https://vehicledetails-5ba2b-default-rtdb.firebaseio.com/vehicleHistory.json"
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong. Please check your network connection and try again"
        );
      }
      const responseData = await response.json();

      const searchArray = [];
      for (const key in responseData) {
        searchArray.push({
          id: key,
          rego: responseData[key].rego,
          driver: responseData[key].driverId,
          purpose: responseData[key].purpose,
          date: responseData[key].date,
        });
      }
      if (!searchPerformed) {
        setNoMatchFoundClass(true);
        setVehicleLog(searchArray);
        setVehicleHistoryArray(searchArray);
        return;
      }
    };
    if (search) {
      searchRef.current.value = "";
    } else {
      fetchUserDetails();
      return;
    }

    console.log(search);
  }, [newUserEntry, search]);

  const userSearchHandler = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      setSearch(searchRef.current.value);
    }, 4000);
    setSearchPerformed((prev) => true);
    for (const key in vehicleLog) {
      if (
        vehicleLog[key].rego.toLowerCase() ===
          searchRef.current.value.toLowerCase() ||
        vehicleLog[key].driver.toLowerCase() ===
          searchRef.current.value.toLowerCase()
      ) {
        userSearchArray.push({
          id: key,
          rego: vehicleLog[key].rego,
          driver: vehicleLog[key].driver,
          purpose: vehicleLog[key].purpose,
          date: vehicleLog[key].date,
        });
      }
    }
    setSearch(true);
    console.log(search);
    if (userSearchArray.length === 0) {
      console.log("no matches found");
      setNoMatchFoundClass((match) => {
        return false;
      });
      // setIsModalOpen(true);
      console.log(noMatchFoundClass, "from no martch");
      setVehicleHistoryArray(vehicleLog);
      return;
    } else {
      console.log("inside if else array block");
      setVehicleHistoryArray(userSearchArray);
    }
  };
  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setNewUserEntry((user) => user + 3);
    console.log(isModalOpen);
    setNoMatchFoundClass(true);
    setIsModalOpen((open) => {
      return false;
    });
  };

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
        {!noMatchFoundClass && <ErrorModal onClose={closeModalHandler} />}
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
