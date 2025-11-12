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

  return <>
    <Box
      sx={{
        overflowX: 'auto',
        paddingX: {
          xs: '0',
          lg: '60px',
        },
      }}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader title={b3Lang('identity.user')} />
            <CardContent>
              {firstName} {lastName}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader title={b3Lang('identity.company')} />
            <CardContent>
              {companyName}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader title={b3Lang('identity.role')} />
            <CardContent>
              {companyRoleName}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </>;
}
