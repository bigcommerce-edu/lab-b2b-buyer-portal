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

import Identity from "./components/Identity";

import { useB3Lang } from "@/lib/lang";

interface OverviewProps {
  setOpenPage: SetOpenPage;
}

export default function Overview({
  setOpenPage,
}: OverviewProps) {
  const b3Lang = useB3Lang();

  // TODO: Create a boolean `ordersOpen` state value to track the open state of the orders accordion

  const allowOrders = validatePermissionWithComparisonType({
    code: newPermissions.ordersPermissionCodes,
    level: permissionLevels.COMPANY,
    containOrEqual: 'contain',
  });

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
        {allowOrders && (
        <Grid
          item
          key="recent-orders"
          xs={12}
        >
          {/* TODO: Replace the placeholder with `RecentOrders` 
                - Pass the `setOpenPage` function this page component received
          */}
          <h3>Recent Orders Placeholder</h3>
          <Button onClick={() => setOpenPage({ isOpen: true, openUrl: HeadlessRoutes.COMPANY_ORDERS })}>{b3Lang('overview.allOrders')}</Button>
        </Grid>
        )}
      </Grid>
    </>
  );
}
