import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classes from "./CustomerDetails.module.css";
export default function CustomerDetails(props) {
  const rego = props.rego.toUpperCase();
  const driver = props.driver.toUpperCase();
  const purpose = props.purpose.toUpperCase();
  const date = props.date;
  const iconDirection = purpose.toLowerCase() === "rent" ? true : false;
  const backGroundCol = iconDirection ? "#83f28f" : "#FFCCCB";
  return (
    <>
      <div
        className={classes.customerDetailsSection}
        style={{
          backgroundColor: `${backGroundCol}`,
        }}
      >
        <div className={classes.regoCard}>
          <p className={classes.regoPara}>{rego}</p>
        </div>
        <div className={classes.purposeCard}>
          <p className={classes.purposePara}>{purpose}</p>
          {iconDirection ? (
            <ArrowForwardIcon className={classes.purposeIcon} />
          ) : (
            <ArrowBackIcon className={classes.purposeIcon} />
          )}
          <p className={classes.datePara}>{date}</p>
        </div>
        <div className={classes.driverCard}>
          <p className={classes.driverPara}>{driver}</p>
        </div>
      </div>
    </>
  );
}
