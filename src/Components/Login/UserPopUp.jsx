import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSignUp } from "../../Context/ServerState";
import { USER_ACTIONS } from "../../Context/UserReducers";

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

export default function UserPopUp({ openPopUp, setOpenPopUp }) {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirm: "",
    secret: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { data, refetch } = useSignUp(inputValue);

  const handleChange = (e) =>
    setInputValue((state) => ({ ...state, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    refetch()
      .then((res) => {
        if (res.isSuccess) {
          dispatch({
            type: USER_ACTIONS.LOGIN,
            payload: data,
          });
          setOpenPopUp(false);

          history(`authoritydashboard`);

          enqueueSnackbar("User SignUp Successful", { variant: "success" });
        }
      })
      .catch(() => {});
  };

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
            gridTemplateRows: "1fr 4fr 2fr",
            height: "40vh",
            gridGap: "1rem",
            borderRadius: "1rem",
            width: "35%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontSize: 24 }}>User Registration</Typography>
          </div>
          <div
            style={{
              display: "grid",
              justifyContent: "space-around",
              alignItems: "center",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "2rem",
            }}
          >
            <TextField
              variant="outlined"
              label="Email Id"
              type="email"
              name="email"
              onChange={handleChange}
              value={inputValue.email}
              style={{ width: "100%" }}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={inputValue.password}
              style={{ width: "100%" }}
            />
            <TextField
              variant="outlined"
              label="Confirm Password"
              type="password"
              name="confirm"
              onChange={handleChange}
              value={inputValue.confirm}
              error={inputValue.confirm !== inputValue.password}
              style={{ width: "100%" }}
            />{" "}
            <TextField
              variant="outlined"
              label="Secret Token"
              name="secret"
              onChange={handleChange}
              value={inputValue.secret}
              style={{ width: "100%" }}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "75%",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "blue",
                  height: 54,
                  width: "13rem",
                  borderRadius: 8,
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </div>

            <Typography style={{ fontSize: ".7rem", textAlign: "center" }}>
              Please upload the relevant document for emergency situations for
              the choice of transport in case of failure .. this data will be
              secure and only used to treat you effectively
            </Typography>
          </div>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}
