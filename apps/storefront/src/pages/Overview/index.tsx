import { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { permissionLevels } from "@/constants";
import { validatePermissionWithComparisonType } from '@/utils/b3CheckPermissions/check';
import { newPermissions } from "@/shared/routes/config";
import { type SetOpenPage } from '@/pages/SetOpenPage';

import Identity from "./components/Identity";
import RecentOrders from "./components/RecentOrders";

import { useB3Lang } from "@/lib/lang";

interface OverviewProps {
  setOpenPage: SetOpenPage;
}

export default function Overview({
  setOpenPage,
}: OverviewProps) {
  const b3Lang = useB3Lang();

  const [ordersOpen, setOrdersOpen] = useState<boolean>(false);

  // TODO: Create `*Open` state values for invoices, shopping lists, and quotes

  const allowOrders = validatePermissionWithComparisonType({
    code: newPermissions.ordersPermissionCodes,
    level: permissionLevels.COMPANY,
    containOrEqual: 'contain',
  });

  // TODO: Create `allow*` variables for invoices, shopping lists, and quotes

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
          <Accordion
            onChange={(_e, isExpanded) => setOrdersOpen(isExpanded)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h3">{b3Lang('overview.recentOrders')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RecentOrders
                startLoad={ordersOpen}
                setOpenPage={setOpenPage}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        )}

        {/* TODO: Conditionally output invoices, shopping lists, and quotes */}
      </Grid>
    </>
  );
}
