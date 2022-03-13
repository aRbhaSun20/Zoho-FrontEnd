import React from "react";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function NavbarAfter() {
  const user = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <div
        style={{
          display: "grid",
          backgroundColor: "#F4F4FC",
          width: "96%",
          borderBottom: "1px solid lightgray",
          margin: "auto",
          height: "10vh",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h4"
              style={{ fontSize: 40, color: "black" }}
              align="center"
            >
              Arnav
            </Typography>
          </div>
          <Avatar style={{ textTransform: "uppercase" }}>
            {user.email.slice(0, 1)}
          </Avatar>
        </div>
      </div>
    </React.Fragment>
  );
}
