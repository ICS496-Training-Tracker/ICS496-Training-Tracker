import React from "react";
import { Meteor } from "meteor/meteor";
import Col from "react-bootstrap/Col";
import { PAGE_IDS } from "../utilities/PageIDs";
import { Navigate, redirect } from "react-router-dom";

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */

const SignOut = () => {
  {
    if (window.localStorage) {
      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload();
        Meteor.logout();
      } else localStorage.removeItem("firstLoad");
    }
  }

  return <Navigate to={"/"} />;
};

export default SignOut;
