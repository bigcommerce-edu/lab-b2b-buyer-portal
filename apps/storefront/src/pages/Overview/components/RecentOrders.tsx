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

  // TODO: Use `useEffect` to fetch/set order data when component first mounts
  //  - Initially, use `mockOrders` to set the value of `orders`

  // TODO: Create an `orderColumns` array to define the columns for the table
  //  - Include a unique key (matching the GraphQL response field) and a title for each column
  //  - Include columns for `orderId`, `poNumber`, `totalIncTax`, and `createdAt`
  //  - `totalIncTax` needs a custom `render` function to use currency formatting for the value
  //  - `createdAt` needs a custom `render` function to use date formatting for the value

  // TODO: Implement the JSX
  //  - Use `B3Spin` as a wrapper to eventually control loading feedback
  //  - Use `OverviewCard` with a `CardContent`
  //  - Render a `B3Table`
  //    - Use the `orders` state as the value of `listItems`
  //    - Use `orderColumns` as the value of `columnItems`
  //    - The `onClickRow` behavior should use `navigate` to go to the route /orderDetail/{item.orderId}
  throw new Error('RecentOrders not implemented');
}
