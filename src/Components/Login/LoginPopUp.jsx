import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PeopleLogo from "../../assets/people-logo.png";
import { NAV_ACTIONS } from "../../Context/NavigationReducers";
import { useLogin } from "../../Context/ServerState";
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

export default function LoginPopUp({ setSignUp }) {
  const history = useNavigate();
  const openPopUp = useSelector((state) => state.navigation);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    handle: false,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { data, refetch } = useLogin(inputValue, handle);

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
          handleCLose();
          dispatch({
            type: USER_ACTIONS.LOGIN,
            payload: res.data,
          });
          handle = false;
          setInputValue((state) => ({ ...state, handle: false }));
          enqueueSnackbar("User Login Successful", { variant: "success" });
          history(`authoritydashboard`);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue.handle]);

  const handleCLose = () => {
    dispatch({
      type: NAV_ACTIONS.NAV_CHANGE,
      payload: { loginPopUp: false, loginType: "" },
    });
  };
  return (
    <React.Fragment>
      <Modal
        open={openPopUp.loginPopUp}
        onClose={handleCLose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={3}
          sx={style}
          style={{
            display: "grid",
            gridTemplateRows: "1.2fr 1fr 1fr",
            height: "57vh",
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
            <img src={PeopleLogo} style={{ width: "7rem" }} alt="people-log" />
            <Typography
              style={{
                fontSize: 24,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              welcome to Arnav as {openPopUp.loginType}
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
              name="email"
              onChange={handleChange}
              value={inputValue.email}
              style={{ width: 400 }}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={inputValue.password}
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
              Login
            </Button>
            <Typography style={{ color: "blue" }}>Forget password ?</Typography>
            <div
              onClick={() => {
                handleCLose();
                setSignUp(true);
              }}
            >
              Don't have an account ?
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  paddingLeft: ".5rem",
                }}
              >
                Sign Up
              </span>
            </div>
          </div>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}
