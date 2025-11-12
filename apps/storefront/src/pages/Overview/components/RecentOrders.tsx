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

interface OverviewOrderWithErpStatus extends OverviewOrder {
  erpStatus?: string;
}

export default function RecentOrders({
  startLoad,
  setOpenPage,
}: OrdersProps) {
  const erpToken = useErpToken();
  
  const b3Lang = useB3Lang();

  const [b2bOrders, setB2bOrders] = useState<OverviewOrder[]>([]);
  const [orders, setOrders] = useState<OverviewOrderWithErpStatus[]>([]);
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
      const updatedOrders = b2bOrders.map((order) => {
        const erpOrder = erpOrders.find((erpOrder) => erpOrder.b2bOrderId === order.orderId);
        return {
          ...order,
          erpStatus: erpOrder?.status,
        };
      });
      setOrders(updatedOrders);
    });
  }, [erpToken, b2bOrders]);

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
      render: (item: OverviewOrderWithErpStatus) => {
        return currencyFormat(item.totalIncTax);
      },
    },
    {
      key: 'createdAt',
      title: b3Lang('orders.createdOn'),
      render: (item: OverviewOrderWithErpStatus) => {
        return `${displayFormat(Number(item.createdAt))}`;
      },
    },
    {
      key: 'erpStatus',
      title: b3Lang('overview.orders.status'),
      render: (item: OverviewOrderWithErpStatus) => {
        if (!item.erpStatus) {
          return <CircularProgress size={16} />;
        }
        return item.erpStatus;
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
