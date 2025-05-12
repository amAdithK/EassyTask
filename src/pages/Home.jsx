import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { sessionStorageDelete } from "../utilities/sessionStorage";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    sessionStorageDelete("access_token");
    navigate("/");
  };

  // const handleTabChange = (event, newValue) => {
  //   setTabValue(newValue);
  // };

  return (
    <>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              EasyTask
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 2 }}>
          <TaskList />
        </Box>
      </Box>
      {/* <paragraph style={{ margin: "2px" }}>
        {" "}
        Firebase Token is here : <br /> {props.firebase}
      </paragraph> */}
    </>
  );
}
