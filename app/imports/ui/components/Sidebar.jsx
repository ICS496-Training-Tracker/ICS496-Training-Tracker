import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  menuClasses,
  ProSidebarProvider,
  sidebarClasses,
} from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { blue } from "@mui/material/colors";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
};
function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState();

  return (
    // div for SideBar
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ display: "flex", backgroundColor: "rgb(0, 14, 108)" }}>
        {/* Logo goes here */}
        {/* Team name goes inline with logo */}
        <ProSidebarProvider>
          <Sidebar
            rootStyles={{
              [`.${sidebarClasses.container}`]: {
                paddingTop: "150px",
              },
              [`.${menuClasses.menuItemRoot}`]: {
                paddingTop: "30px",
                color: "black",
              },
            }}
          >
            <Menu
              menuItemStyles={{
                button: {
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                },
              }}
            >
              {/* Need to Link for the following menu items below */}
              <MenuItem> Dashboard</MenuItem>
              <MenuItem> Training</MenuItem>
              <MenuItem> Members</MenuItem>
              <MenuItem> Profile</MenuItem>
            </Menu>
          </Sidebar>
        </ProSidebarProvider>
      </div>
    </div>
  );
}

export default SideBar;
