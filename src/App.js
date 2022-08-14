import NewVehicleLog from "./NewVehicleLog";
import "./App.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import CustomerDetails from "./CustomerDetails";
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
      console.log(response);
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
    <div className="App">
      <div
        style={{
          minWidth: "15rem",
          borderRadius: "10px",
          maxWidth: "60rem",
          margin: "0 auto",
          marginBottom: "1rem",
          transform: "translateY(19%)",
        }}
      >
        <TextField
          id="outlined-basic"
          label=""
          size="small"
          variant="outlined"
          inputRef={searchRef}
          style={{
            minWidth: "5rem",
            width: "90%",
            transform: "translateY(5%)",
          }}
        />
        <Button
          variant="contained"
          onClick={userSearchHandler}
          style={{
            transform: "translateY(5%)",
            backgroundColor: "#828382",
          }}
        >
          search
        </Button>

        {isModalOpen && <NewVehicleLog onClose={closeModalHandler} />}
      </div>
      <Container
        maxWidth="40rem"
        style={{
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <section
          style={{
            maxWidth: "60rem",
            maxHeight: "47.5rem",
            width: "100%",
            padding: "2px",
            borderRadius: "25px",
            backgroundColor: "#c1bfc057",
            textAlign: "center",
            margin: "0 auto",
            overflow: "scroll",
            transform: "translateY(4%)",
            placeContent: "center",
          }}
        >
          {customerDetailsList}
        </section>
      </Container>
      <Button
        variant="contained"
        onClick={openModalHandler}
        style={{
          left: "45% ",
          transform: "translateY(15%)",
          backgroundColor: "#828382",
        }}
      >
        Insert
      </Button>
    </div>
  );
}

export default App;
