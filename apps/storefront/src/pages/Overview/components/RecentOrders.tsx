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

import { OverviewOrder } from "../data";
import OverviewCard from "./OverviewCard";

// TODO: Remove this once real data fetching is implemented
const mockOrders = [
  {
    orderId: '1234567890',
    poNumber: '12345',
    totalIncTax: 1000,
    createdAt: 1761592667,
  },
  {
    orderId: '1234567891',
    poNumber: '12346',
    totalIncTax: 4500,
    createdAt: 1761595667,
  },
];

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
  // TODO: Get the token needed for ERP API calls with `useErpToken`
  
  const b3Lang = useB3Lang();
  
  const [orders, setOrders] = useState<OverviewOrder[]>([]);

  // TODO: Create a `loading` state value to track the loading state of the orders

  useEffect(() => {
    if (!startLoad) return;

    setOrders(mockOrders);
  }, [startLoad]);

  // TODO: Use `useEffect` to inspect the value of the ERP token

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
  ];

  return (
    <B3Spin isSpinning={false}>
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
