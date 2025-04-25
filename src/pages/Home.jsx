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

export default function Home(props) {
  const { currentUser, logout } = useAuth();
  const [tabValue, setTabValue] = useState("new");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="New" value="new" />
            <Tab label="In Progress" value="in-progress" />
            <Tab label="Completed" value="done" />
          </Tabs>

          <TaskList status={tabValue} />
        </Box>
      </Box>
      <paragraph style={{ margin: "2px" }}>
        {" "}
        Firebase Token is here : <br /> {props.firebase}
      </paragraph>
    </>
  );
}
