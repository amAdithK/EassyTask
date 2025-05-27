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
import { useNavigate } from "react-router-dom";

export default function Home() {
  // const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
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
              eaSsy Corp Track
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
    </>
  );
}
