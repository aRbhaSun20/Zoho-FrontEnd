import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { AddBox, Delete, Edit, Info } from "@mui/icons-material";
import {
  AppBar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddContact from "./AddContact";
import { useContacts } from "../../Context/ServerState";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  paper: {
    display: "flex",
  },
  table: {
    borderBottom: "none",
    // marginLeft: '1rem'
  },
  icons: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem",
  },
  iconBtnStyles: {
    background: "blue",
    margin: "0.2rem",
  },
  modalButtons: {
    fontFamily: "Titillium Web",
    textTransform: "none",
    borderRadius: "3rem",
    marginLeft: "1rem",
    color: "black",
    backgroundImage: "linear-gradient(to right,#F98A5C,#FEAA7B)",
  },
}));

export default function ContactDetails() {
  const classes = useStyles();
  const [addContact, setAddContact] = useState(false);
  const user = useSelector((state) => state.user);
  const { data } = useContacts(user._id);
  return (
    <React.Fragment>
      <Paper
        elevation={8}
        style={{
          width: "98%",
          margin: "0 auto",
          borderRadius: "1rem",
          height: "66vh",
        }}
      >
        <AppBar
          style={{ zIndex: "1", borderRadius: "1rem" }}
          position="relative"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <div className={classes.title}>
              <Typography variant="h6">Contact Details</Typography>
              <IconButton>
                <Info />
              </IconButton>
            </div>
            <IconButton
              className={classes.iconBtnStyles}
              justifyContent="flex-end"
              onClick={() => {
                setAddContact(true);
              }}
              style={{ background: "blue" }}
            >
              <Tooltip title="add Explorers">
                <AddBox style={{ fill: "white" }} />
              </Tooltip>
            </IconButton>
          </Toolbar>
        </AppBar>
        <TableContainer
          component={Paper}
          style={{
            margin: "1rem",
            width: "98%",
            maxHeight: "55vh",
            overflow: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  width: "100%",
                }}
              >
                <TableCell style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Phone
                </TableCell>
                <TableCell style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((row, i) => (
                  <TableRow
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4,1fr)",
                      width: "100%",
                      backgroundColor: i % 2 === 0 ? "#f1f1f1" : null,
                    }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        width: "75%",
                      }}
                    >
                      <IconButton style={{ width: "3.5rem", height: "3.5rem" }}>
                        <Edit style={{ fonSize: "1.5rem" }} />
                      </IconButton>
                      <IconButton style={{ width: "3.5rem", height: "3.5rem" }}>
                        <Delete style={{ fontSize: "1.5rem" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <AddContact openPopUp={addContact} setOpenPopUp={setAddContact} />
    </React.Fragment>
  );
}
