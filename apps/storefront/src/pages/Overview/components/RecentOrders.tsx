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
  // TODO: Add the `startLoad` prop, which is a boolean
  // TODO: Add the `setOpenPage` prop, which is an instance of `SetOpenPage`
}

// TODO Create an interface called `OverviewOrderWithErpStatus` that extends `OverviewOrder` 
// and adds an optional `erpStatus` field

export default function RecentOrders({
  // TODO: Add the `startLoad` prop to allow the parent component to control when data is loaded
  // TODO: We need a `setOpenPage` prop to get a function used to change the Buyer Portal page
}: OrdersProps) {
  // TODO: Get the token needed for ERP API calls with `useErpToken`
  
  const b3Lang = useB3Lang();
  
  const [orders, setOrders] = useState<OverviewOrder[]>([]);

  // TODO: Create a `loading` state value to track the loading state of the orders

  // TODO: Use `useEffect` to fetch/set order data when component first mounts
  //  - Initially, use `mockOrders` to set the value of `orders`

  // TODO: Use `useEffect` to inspect the value of the ERP token

  // TODO: Create an `orderColumns` array to define the columns for the table
  //  - Include a unique key (matching the GraphQL response field) and a title for each column
  //  - Include columns for `orderId`, `poNumber`, `totalIncTax`, and `createdAt`
  //  - `totalInclTax` needs a custom `render` function to use currency formatting for the value
  //  - `createdAt` needs a custom `render` function to use date formatting for the value

  // TODO: Implement the JSX
  //  - Use `B3Spin` as a wrapper to eventually control loading feedback
  //  - Use `OverviewCard` with a `CardContent`
  //  - Render a `B3Table`
  //    - Use the `orders` state as the value of `listItems`
  //    - Use `orderColumns` as the value of `columnItems`
  //    - The `onClickRow` behavior should use `setOpenPage` to navigate to the route /orderDetail/{item.orderId}
  throw new Error('RecentOrders not implemented');
}
