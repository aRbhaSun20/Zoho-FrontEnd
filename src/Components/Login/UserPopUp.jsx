import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { NAV_ACTIONS } from "../../Context/NavigationReducers";
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

let handle = false;

export default function UserPopUp({ openPopUp, setOpenPopUp }) {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirm: "",
    secret: "",
    handle: false,
  });
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { refetch } = useSignUp(inputValue, handle);

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
          dispatch({
            type: USER_ACTIONS.LOGIN,
            payload: res.data,
          });
          handle = false;

          setInputValue((state) => ({ ...state, handle: false }));
          setOpenPopUp(false);
          enqueueSnackbar("User SignUp Successful", { variant: "success" });
          history(`authoritydashboard`);
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
            <Typography style={{ fontSize: 24 }}>Sign Up</Typography>
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
                paddingBottom: ".5rem",
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
                Sign Up
              </Button>
            </div>{" "}
            <div
              onClick={() => {
                setOpenPopUp(false);
                dispatch({
                  type: NAV_ACTIONS.NAV_CHANGE,
                  payload: { loginPopUp: true },
                });
              }}
            >
              Already have an account ?
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  paddingLeft: ".5rem",
                }}
              >
                Sign In
              </span>
            </div>
            <Typography style={{ fontSize: ".7rem", textAlign: "center" }}>
              By clickingon "Sign Up" button you are creating an account and you
              agree to the Terms of use.
            </Typography>{" "}
          </div>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}
