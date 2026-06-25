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

  // TODO: Create a boolean `ordersOpen` state value to track the open state of the orders accordion

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
          {/* TODO: Wrap `RecentOrders` in an `Accordion`
                - An `Accordion` has an `AccordionSummary` and an `AccordionDetails` as children
                - An `onChange` on the `Accordion` should set the `ordersOpen` state value based on the value of `isExpanded`
                - Use the `ExpandMoreIcon` for the `expandIcon` on `AccordionSummary`
                - The existing `RecentOrders` component should be rendered in `AccordionDetails`
          */}
          <RecentOrders
            // TODO: Pass the `ordersOpen` state value to `startLoad`, 
            // to trigger order fetching when the accordion is opened
          />
        </Grid>
        )}
      </Grid>
    </>
  );
}
