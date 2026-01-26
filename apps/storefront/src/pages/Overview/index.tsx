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
import { HeadlessRoutes, permissionLevels } from "@/constants";
import { validatePermissionWithComparisonType } from '@/utils/b3CheckPermissions/check';
import { newPermissions } from "@/shared/routes/config";
import { type SetOpenPage } from '@/pages/SetOpenPage';

import { useB3Lang } from "@/lib/lang";

interface OverviewProps {
  setOpenPage: SetOpenPage;
}

export default function Overview({
  setOpenPage,
}: OverviewProps) {
  const b3Lang = useB3Lang();

  // TODO: Create a boolean `ordersOpen` state value to track the open state of the orders accordion

  // TODO: Set `allowOrders` based on the result of `validatePermissionWithComparisonType`
  //  - Pass a `code` to check against: the `ordersPermissionCodes` value from `newPermissions`
  //  - Pass a `level` to check (user-level or company-level): The `COMPANY` constant from `permissionLevels`
  //  - Pass a `containOrEqual` value of "contain"

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
          {/* TODO: Replace the placeholder with `Identity` */}
          <h3>Logged-in User Information Placeholder</h3>
        </Grid>

        {/* TODO: Make the rendering of recent orders conditional on `allowOrders` */}
        <Grid
          item
          key="recent-orders"
          xs={12}
        >
          {/* TODO: Replace the placeholder with `RecentOrders` 
                - Pass the `setOpenPage` function this page component received
          */}
          <h3>Recent Orders Placeholder</h3>
          {/* TODO: Add a button to navigate to the orders page with `setOpenPage` 
                - `HeadlessRoutes` includes a constant (`COMPANY_ORDERS`) with the main orders page route
          */}
        </Grid>
      </Grid>
    </>
  );
}
