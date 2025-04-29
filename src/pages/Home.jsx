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
import TaskList from "../components/TaskList";

export default function Home() {
  const { currentUser, logout } = useAuth();

  // const handleTabChange = (event, newValue) => {
  //   setTabValue(newValue);
  // };

  return (
    <>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="absolute">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              EasyTask
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
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
