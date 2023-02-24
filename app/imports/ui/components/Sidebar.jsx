import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
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
import { House } from "react-bootstrap-icons";
import { blue } from "@mui/material/colors";
import Landing from "../pages/Landing";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
};
function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState();

  const { currentUser } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : "",
    }),
    []
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ display: "flex" }}>
        {/* Logo goes here */}
        {/* Team name goes inline with logo */}
        <ProSidebarProvider>
          <Sidebar
            rootStyles={{
              [`.${sidebarClasses.container}`]: {
                paddingTop: "300px",
              },
              [`.${menuClasses.menuItemRoot}`]: {
                paddingTop: "90px",
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
              <MenuItem icon={<House size={20} />} component={<Link to="/dashboard" />}>
                Dashboard
              </MenuItem>
              <MenuItem> Profiles</MenuItem>
              <MenuItem> Reports</MenuItem>
            </Menu>
          </Sidebar>
        </ProSidebarProvider>
      </div>
    </div>
  );
}

export default SideBar;
