import { useState } from "react";
import {
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { HeadlessRoutes } from "@/constants";
import {
  rolePermissionSelector,
  useAppSelector,
} from '@/store';

import { useB3Lang } from "@/lib/lang";

export default function Overview() {
  const b3Lang = useB3Lang();

  // TODO: Get the user's permissions from the Redux store
  //  - Use `useAppSelector` with the `rolePermissionSelector` selector
  //  - Destructure `getOrderPermission` from the result

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          key="overview"
          xs={12}
        >
          <h3>Logged-in User Information Placeholder</h3>
        </Grid>

        {/* TODO: Make the rendering of recent orders conditional on `getOrderPermission` */}
        <Grid
          item
          key="recent-orders"
          xs={12}
        >
          <h3>Recent Orders Placeholder</h3>
        </Grid>
      </Grid>
    </>
  );
}
