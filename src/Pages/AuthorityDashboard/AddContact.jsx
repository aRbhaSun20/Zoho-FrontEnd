import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddContacts, useContacts } from "../../Context/ServerState";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
let handle = false;
export default function AddContact({ openPopUp, setOpenPopUp }) {
  const user = useSelector((state) => state.user);

  const [inputValue, setInputValue] = useState({
    email: "",
    phone: "",
    name: "",
    handle: false,
  });

  const { enqueueSnackbar } = useSnackbar();
  const { refetch: contactRefetch } = useContacts(user._id);
  const { refetch } = useAddContacts(user._id, inputValue, handle);

  const handleChange = (e) =>
    setInputValue((state) => ({ ...state, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    handle = true;
    setInputValue((state) => ({ ...state, handle: true }));
  };

  useEffect(() => {
    if (inputValue.handle) {
      refetch().then((res) => {
        if (res.isSuccess) {
          setOpenPopUp(false);
          contactRefetch();
          handle = false;
          setInputValue((state) => ({ ...state, handle: false }));
          enqueueSnackbar("New Contact Added", { variant: "success" });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue.handle]);

  return (
    <React.Fragment>
      <Modal
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={3}
          sx={style}
          style={{
            display: "grid",
            gridTemplateRows: ".5fr 1.5fr .5fr",
            height: "45vh",
            gridGap: "1rem",
            borderRadius: "1rem",
            width: "25%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                fontSize: 24,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              <b>Add New Contact Details</b>
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              variant="outlined"
              label="Username"
              name="name"
              onChange={handleChange}
              value={inputValue.name}
              style={{ width: 400 }}
            />
            <TextField
              variant="outlined"
              name="phone"
              onChange={handleChange}
              value={inputValue.phone}
              label="Phone Number"
              style={{ width: 400 }}
            />{" "}
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              value={inputValue.email}
              style={{ width: 400 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              variant="outlined"
              style={{
                backgroundColor: "blue",
                height: 54,
                width: "17rem",
                borderRadius: 8,
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}
