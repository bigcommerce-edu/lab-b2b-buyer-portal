import { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  rolePermissionSelector,
  useAppSelector,
} from '@/store';

import Identity from "./components/Identity";
import RecentOrders from "./components/RecentOrders";

import { useB3Lang } from "@/lib/lang";

export default function Overview() {
  const b3Lang = useB3Lang();

  const { getOrderPermission } = useAppSelector(rolePermissionSelector);

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
          <Identity />
        </Grid>

        {/* TRY: Log in as a Junior Buyer user to verify that Recent Orders does not show */}
        {getOrderPermission && (
        <Grid
          item
          key="recent-orders"
          xs={12}
        >
          <RecentOrders
          />
        </Grid>
        )}
      </Grid>
    </>
  );
}
