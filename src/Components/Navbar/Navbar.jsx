import { Typography } from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <React.Fragment>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 1fr",
          width: "95%",
          borderBottom: "1px solid lightgray",
          margin: "auto",
          height: "100%",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 6fr" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="h4" style={{ fontSize: 40 }} align="center">
              Arnav
            </Typography>
          </div>
          <div
            style={{ display: "flex", columnGap: "4rem", alignItems: "center" }}
          >
            <Typography variant="h6">Home</Typography>
            <Typography variant="h6">Services</Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
