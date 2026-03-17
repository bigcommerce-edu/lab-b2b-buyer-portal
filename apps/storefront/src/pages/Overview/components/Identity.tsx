import { useAppSelector } from "@/store";
import { 
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import {
  Security as SecurityIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { useB3Lang } from "@/lib/lang";

// TODO: Use `styled` to create a reusable `IdentityCard` component based on `Card`
//  - Define a background color, padding, border radius, and text alignment

export default function Identity() {
  const company = useAppSelector(({ company }) => company);
  const { companyInfo, customer } = company;
  const { companyName } = companyInfo;
  const { firstName, lastName, companyRoleName } = customer;

  const b3Lang = useB3Lang();

  // TODO: Implement the JSX
  //  - Wrap the entire contents in a `Box`, using `sx` for basic `overflowX` and `paddingX` styles
  //  - Output a `Grid` container with 3 `Grid` items
  //    - Use the `xs` and `lg` properties on `Grid` items to control the layout for different screen sizes
  //  - In each `Grid` item, render a `Card` with a `CardHeader` and `CardContent`
  //  - Item 1 should display the user's first and last name
  //  - Item 2 should display the company name
  //  - Item 3 should display the user role name
  throw new Error('Identity component not implemented');
}
