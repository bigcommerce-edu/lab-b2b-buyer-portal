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
  const navigate = useNavigate();

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
          <h3>Logged-in User Information Placeholder</h3>
        </Grid>

        {/* TRY: Log in as a Junior Buyer user to verify that Recent Orders does not show */}
        {getOrderPermission && (
        <Grid
          item
          key="recent-orders"
          xs={12}
        >
          <h3>Recent Orders Placeholder</h3>
          <Button onClick={() => navigate(HeadlessRoutes.COMPANY_ORDERS)}>{b3Lang('overview.allOrders')}</Button>
        </Grid>
        )}
      </Grid>
    </>
  );
}
