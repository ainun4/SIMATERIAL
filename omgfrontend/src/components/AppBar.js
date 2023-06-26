import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Grid, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthService from "../Services/auth.services.js";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function TopBar() {
  const user = AuthService.getCurrentUser();
  const id = user.id_karyawan;

  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#363740",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {document.title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Grid direction="column" justifyContent="center" alignItems="flex-end">
          <Grid item xs>
            <Typography onClick={() =>
                              navigate(
                                "/detail/profile/" +
                                  id
                              )
                            }
               align="right">{user.nama}</Typography>
          </Grid>
          <Grid item xs>
            <Typography onClick={() =>
                              navigate(
                                "/detail/profile/" +
                                  id
                              )
                            }  fontSize={12} align="right">
              {user.role}
            </Typography>
          </Grid>
        </Grid>
        <IconButton onClick={() =>
                              navigate(
                                "/detail/profile/" +
                                  id
                              )
                            } size="large" color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
