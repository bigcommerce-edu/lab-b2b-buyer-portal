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

export default function Identity() {
  const company = useAppSelector(({ company }) => company);
  const { companyInfo, customer } = company;
  const { companyName } = companyInfo;
  const { firstName, lastName, companyRoleName } = customer;

  const b3Lang = useB3Lang();

  throw new Error('Identity component not implemented');
}
