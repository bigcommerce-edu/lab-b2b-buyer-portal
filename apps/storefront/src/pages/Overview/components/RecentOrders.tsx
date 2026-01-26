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

  // TODO: Create a new state value called `b2bOrders` that stores the initial order records 
  // with only B2B Edition data
  
  const [orders, setOrders] = useState<OverviewOrder[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!startLoad || !loading) return;

    getRecentOrders().then((b2bOrders) => {
      // TODO: Also set the `b2bOrders` state value to trigger loading third-party data
      setOrders(b2bOrders);
      setLoading(false);
    });
  }, [startLoad, loading]);

  useEffect(() => {
    // TODO: Fetch ERP order data for all orders
    //  - Effect should depend on the value of `b2bOrders`
    //  - Return immediately if `b2bOrders` is empty or there is no ERP token
    //  - Use `erpFetchCompanyOrders` to fetch the ERP order data and log the result

    if (!erpToken) return;
    
    console.log('erpToken', erpToken);
  }, [erpToken]);

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
