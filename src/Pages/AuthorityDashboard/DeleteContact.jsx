import { Button, Modal, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useContacts,
  useDeleteContacts,
} from "../../Context/ServerState";

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
export default function DeleteContact({ openPopUp, setOpenPopUp, _id }) {
  const user = useSelector((state) => state.user);

  const [inputValue, setInputValue] = useState({
    handle: false,
  });

  const { enqueueSnackbar } = useSnackbar();
  const { refetch: contactRefetch } = useContacts(user._id);
  const { refetch } = useDeleteContacts(inputValue, handle,_id);

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
          enqueueSnackbar("Contact Removed", { variant: "success" });
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
            height: "20vh",
            gridGap: "1rem",
            borderRadius: "1rem",
            width: "20%",
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
              <b>Delete Contact Details</b>
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
            <Typography>Confirm To Delete Contact</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {" "}
            <Button
              variant="outlined"
              style={{
                backgroundColor: "blue",
                height: 54,
                width: "10rem",
                borderRadius: 8,
                color: "white",
                fontWeight: "bold",
              }}
              onClick={() => setOpenPopUp(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              style={{
                backgroundColor: "blue",
                height: 54,
                width: "10rem",
                borderRadius: 8,
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </div>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}
