import React from "react";
import { Box } from "@mui/material";
import Table from "../components/Table";
import { mrdssCollections } from "../../api/mrdss/mrdssCollection";
import { Col, Container, Row, Stack } from "react-bootstrap";

const BarChartBox = () => {
  const { ready, profiles } = useTracker(() => {
    let subscription;
    if (Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) {
      subscription = UserProfiles.subscribeProfilesAdmin();
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.UNIT_TRAINER)) {
      subscription = UserProfiles.subscribeProfilesTrainer();
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.UNIT_MEMBER)) {
      subscription = UserProfiles.subscribeProfile();
    }
    const rdy = subscription.ready();
    const profilesList = UserProfiles.find().fetch();
    return {
      table: tableList,
      ready: rdy,
    };
  }, []);
  return <Table />
};

export default BarChartBox;
