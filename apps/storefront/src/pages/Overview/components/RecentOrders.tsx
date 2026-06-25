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

import { OverviewOrder } from "../data";
import OverviewCard from "./OverviewCard";

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
  
}

export default function RecentOrders({
  
}: OrdersProps) {
  const b3Lang = useB3Lang();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<OverviewOrder[]>([]);

  throw new Error('RecentOrders not implemented');
}
