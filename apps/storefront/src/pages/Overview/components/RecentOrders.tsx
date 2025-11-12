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
import { fetchCompanyOrders as erpFetchCompanyOrders } from "@/shared/service/erp-bff";
import useErpToken from "@/shared/service/erp-bff/useErpToken";
import { displayFormat } from "@/utils/b3DateFormat";
import { currencyFormat } from "@/utils/b3CurrencyFormat";

import { getRecentOrders, OverviewOrder } from "../data";
import OverviewCard from "./OverviewCard";

interface OrdersProps {
  startLoad: boolean;
  setOpenPage: SetOpenPage;
}

// TODO Create an interface called `OverviewOrderWithErpStatus` that extends `OverviewOrder` 
// and adds an optional `erpStatus` field

export default function RecentOrders({
  startLoad,
  setOpenPage,
}: OrdersProps) {
  const erpToken = useErpToken();
  
  const b3Lang = useB3Lang();

  const [b2bOrders, setB2bOrders] = useState<OverviewOrder[]>([]);
  // TODO: Change the type of `orders` to `OverviewOrderWithErpStatus` to account for added ERP field
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
    if (!erpToken || (b2bOrders.length <= 0)) return;
    
    erpFetchCompanyOrders({
      token: erpToken,
      filters: {
        b2bOrderIds: b2bOrders.map((order) => order.orderId),
      },
    }).then((erpOrders) => {
      // TODO: Remove this console.log after implementing the main logic
      console.log(erpOrders);

      // TODO: Add `erpStatus` field to each order record and update the main `orders` state value
      //  - Use `map` to loop through all `b2bOrders`
      //  - Find the record in `erpOrders` with a `b2bOrderId` matching the current order's `orderId`
      //  - Return a new object with the original order data and the ERP status
      //  - Set the new value to the `orders` state
    });
  }, [erpToken, b2bOrders]);

  // TODO: Update type info for `item` to `OverviewOrderWithErpStatus`
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
    // TODO: Add a new column for `erpStatus`
    //  - The custom `render` function should render a `CircularProgress` component until `erpStatus` has a value
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
