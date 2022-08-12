import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CustomerDetails(props) {
  const rego = props.rego;
  const driver = props.driver;
  const purpose = props.purpose;
  const date = props.date;
  const iconDirection = purpose.toLowerCase() === "rent" ? true : false;
  const backGroundCol = iconDirection ? "green" : "red";
  return (
    <>
      <div
        style={{
          display: "flex",
          borderRadius: "25px",
          placeContent: "center",
          margin: "10px 5px",
          maxHeight: "7rem",
          backgroundColor: `${backGroundCol}`,
        }}
      >
        <div
          style={{
            width: "18rem",
            marginTop: "auto",
            marginBottom: "auto",
            margin: "auto",
          }}
        >
          <p
            style={{
              fontSize: "1.75rem",
            }}
          >
            {rego}
          </p>
        </div>
        <div
          style={{
            display: "block",
            placeItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
            }}
          >
            {purpose}
          </p>
          {iconDirection ? (
            <ArrowForwardIcon
              style={{
                margin: "auto",
                fontSize: "3rem",
                marginTop: "auto",
              }}
            />
          ) : (
            <ArrowBackIcon
              style={{
                margin: "auto",
                fontSize: "3rem",
                marginTop: "auto",
              }}
            />
          )}
          <p
            style={{
              fontSize: "0.75rem",
              marginTop: "auto",
            }}
          >
            {date}
          </p>
        </div>
        <div
          style={{
            width: "18rem",
            margin: "auto",
          }}
        >
          <p
            style={{
              fontSize: "1.75rem",
            }}
          >
            {driver}
          </p>
        </div>
      </div>
    </>
  );
}
