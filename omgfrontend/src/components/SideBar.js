import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Icon from '@mui/material/Icon';
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import EventBus from "../common/eventBus";
import AuthService from "../Services/auth.services";
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import logo from '../image/logo.svg';
import logotext from '../image/logotext.svg';
import { Stack } from "@mui/material";

const drawerWidth = 240;

export default function SideBar() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const listStyle3 = {
    background: "#fafa00",
    backgroundColor: "red",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        style={listStyle3}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >

        <Stack justifyContent="center" alignItems="center" spacing={5}  sx={{ paddingX: 2 }}>
          <Typography></Typography>
          <img src={logotext}/>
          <Typography></Typography>
        </Stack>


        <Divider />
        <List>
          {currentUser ? (
            <>
              {SidebarData[currentUser.role].map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <NavLink activeClassName="active" to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              })}
            </>
          ) : (
            <></>
          )}
          <Divider />
        </List>
        <Toolbar />

        <div align="center">
          <li className="nav-text">
            <a
              href="/"
              activeClassName="active"
              className="nav-link"
              onClick={logOut}
            >
              <FaIcons.FaSignOutAlt />
              <span>Keluar</span>
            </a>
          </li>
        </div>
      </Drawer>
    </Box>
  );
}
