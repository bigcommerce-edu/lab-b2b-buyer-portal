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
import RecentInvoices from "./components/RecentInvoices";
import RecentShoppingLists from "./components/RecentShoppingLists";
import RecentQuotes from "./components/RecentQuotes";

import { useB3Lang } from "@/lib/lang";

export default function Overview() {
  const b3Lang = useB3Lang();

  const [ordersOpen, setOrdersOpen] = useState<boolean>(false);
  const [invoicesOpen, setInvoicesOpen] = useState<boolean>(false);
  const [shoppingListsOpen, setShoppingListsOpen] = useState<boolean>(false);
  const [quotesOpen, setQuotesOpen] = useState<boolean>(false);

  const {
    getOrderPermission,
    getInvoicesPermission,
    getShoppingListPermission,
    getQuotesPermission,
  } = useAppSelector(rolePermissionSelector);

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
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        )}

        {getInvoicesPermission && (
        <Grid
          item
          key="recent-invoices"
          xs={12}
        >
          <Accordion
            onChange={(_e, isExpanded) => setInvoicesOpen(isExpanded)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h3">{b3Lang('overview.recentInvoices')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RecentInvoices
                startLoad={invoicesOpen}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        )}

        {getShoppingListPermission && (
        <Grid
          item
          key="recent-shopping-lists"
          xs={12}
        >
          <Accordion
            onChange={(_e, isExpanded) => setShoppingListsOpen(isExpanded)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h3">{b3Lang('overview.recentShoppingLists')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RecentShoppingLists
                startLoad={shoppingListsOpen}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        )}

        {getQuotesPermission && (
        <Grid
          item
          key="recent-quotes"
          xs={12}
        >
          <Accordion
            onChange={(_e, isExpanded) => setQuotesOpen(isExpanded)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h3">{b3Lang('overview.recentQuotes')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RecentQuotes
                startLoad={quotesOpen}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        )}
      </Grid>
    </>
  );
}
