import { useEffect, useState } from "react";
import {
  Button,
  CardContent,
  CircularProgress,
} from "@mui/material";

import { B3Table } from "@/components/table/B3Table";
import B3Spin from "@/components/spin/B3Spin";
import { HeadlessRoutes } from "@/constants";
import { useB3Lang } from "@/lib/lang";
import { type SetOpenPage } from '@/pages/SetOpenPage';
import { fetchOrderSupportCases as crmFetchSupportCases } from "@/shared/service/crm-bff";
import useCrmToken from "@/shared/service/crm-bff/useCrmToken";
import { displayFormat } from "@/utils/b3DateFormat";
import { currencyFormat } from "@/utils/b3CurrencyFormat";

import { getRecentOrders, OverviewOrder } from "../data";
import OverviewCard from "./OverviewCard";

interface OrdersProps {
  startLoad: boolean;
  setOpenPage: SetOpenPage;
}

// TODO Create an interface called `OverviewOrderWithSupportCaseStatus` that extends `OverviewOrder` 
// and adds an optional `supportCaseStatus` field

export default function RecentOrders({
  startLoad,
  setOpenPage,
}: OrdersProps) {
  const crmToken = useCrmToken();
  
  const b3Lang = useB3Lang();

  const [b2bOrders, setB2bOrders] = useState<OverviewOrder[]>([]);
  // TODO: Change the type of `orders` to `OverviewOrderWithSupportCaseStatus` to account for added CRM field
  const [orders, setOrders] = useState<OverviewOrder[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!startLoad || !loading) return;

    getRecentOrders().then((b2bOrders) => {
      setB2bOrders(b2bOrders);
      setOrders(b2bOrders);
      setLoading(false);
    });
  }, [startLoad, loading]);

  useEffect(() => {
    if (!crmToken || (b2bOrders.length <= 0)) return;
    
    crmFetchSupportCases({
      token: crmToken,
      filters: {
        b2bOrderIds: b2bOrders.map((order) => order.orderId),
      },
    }).then((crmCases) => {
      // TODO: Remove this console.log after implementing the main logic
      console.log(crmCases);

      // TODO: Add `supportCaseStatus` field to each order record and update the main `orders` state value
      //  - Use `map` to loop through all `b2bOrders`
      //  - Find the record in `crmCases` with a `b2bOrderId` matching the current order's `orderId`
      //  - Return a new object with the original order data and the CRM case status
      //  - Set the new value to the `orders` state
    });
  }, [crmToken, b2bOrders]);

  // TODO: Update type info for `item` to `OverviewOrderWithSupportCaseStatus`
  const orderColumns = [
    {
      key: 'orderId',
      title: b3Lang('orders.order'),
    },
    {
      key: 'poNumber',
      title: b3Lang('orders.poReference'),
    },
    {
      key: 'totalIncTax',
      title: b3Lang('orders.grandTotal'),
      render: (item: OverviewOrder) => {
        return currencyFormat(item.totalIncTax);
      },
    },
    {
      key: 'createdAt',
      title: b3Lang('orders.createdOn'),
      render: (item: OverviewOrder) => {
        return `${displayFormat(Number(item.createdAt))}`;
      },
    },
    // TODO: Add a new column for `supportCaseStatus`
    //  - The custom `render` function should render a `CircularProgress` component until `supportCaseStatus` has a value
  ];

  return (
    <B3Spin isSpinning={loading}>
      <OverviewCard>
        <CardContent>
          <B3Table
            tableFixed={true}
            columnItems={orderColumns}
            listItems={orders}
            tableKey="orderId"
            showPagination={false}
            onClickRow={(item) => {
              setOpenPage({ isOpen: true, openUrl: `/orderDetail/${item.orderId}` });
            }}
          />
          <Button onClick={() => setOpenPage({ isOpen: true, openUrl: HeadlessRoutes.COMPANY_ORDERS })}>{b3Lang('overview.allOrders')}</Button>
        </CardContent>
      </OverviewCard>
    </B3Spin>
  );
}
