import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CardContent,
  CircularProgress,
} from "@mui/material";

import { B3Table } from "@/components/table/B3Table";
import B3Spin from "@/components/spin/B3Spin";
import { HeadlessRoutes } from "@/constants";
import { useB3Lang } from "@/lib/lang";
import { fetchOrderSupportCases as crmFetchSupportCases } from "@/shared/service/crm-bff";
import useCrmToken from "@/shared/service/crm-bff/useCrmToken";
import { displayFormat } from "@/utils/b3DateFormat";
import { currencyFormat } from "@/utils/b3CurrencyFormat";

import { getRecentOrders, OverviewOrder } from "../data";
import OverviewCard from "./OverviewCard";

interface OrdersProps {
  startLoad: boolean;
}

export default function RecentOrders({
  startLoad,
}: OrdersProps) {
  const b3Lang = useB3Lang();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<OverviewOrder[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!startLoad || !loading) return;

    getRecentOrders().then((b2bOrders) => {
      setOrders(b2bOrders);
      setLoading(false);
    });
  }, [startLoad, loading]);

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
              navigate(`/orderDetail/${item.orderId}`);
            }}
          />
          <Button onClick={() => navigate(HeadlessRoutes.COMPANY_ORDERS)}>{b3Lang('overview.allOrders')}</Button>
        </CardContent>
      </OverviewCard>
    </B3Spin>
  );
}
