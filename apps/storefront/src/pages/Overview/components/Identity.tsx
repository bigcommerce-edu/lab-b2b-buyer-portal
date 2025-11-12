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

const IdentityCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  padding: '20px',
  borderRadius: '30px',
  textAlign: 'center',
}));

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
          xs: '10px',
          lg: '60px',
        },
        paddingY: {
          xs: '10px',
          lg: '20px',
        },
        backgroundColor: '#fff',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'primary.main',
        borderRadius: '30px',
      }}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12} lg={4}>
          <IdentityCard>
            <CardHeader title={b3Lang('identity.user')} />
            <CardContent>
              <PersonIcon fontSize="large" color="primary" />
              <Typography variant="body1" fontWeight="bold">{firstName} {lastName}</Typography>
            </CardContent>
          </IdentityCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <IdentityCard>
            <CardHeader title={b3Lang('identity.company')} />
            <CardContent>
              <BusinessIcon fontSize="large" color="primary" />
              <Typography variant="body1" fontWeight="bold">{companyName}</Typography>
            </CardContent>
          </IdentityCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <IdentityCard>
            <CardHeader title={b3Lang('identity.role')} />
            <CardContent>
              <SecurityIcon fontSize="large" color="primary" />
              <Typography variant="body1" fontWeight="bold">{companyRoleName}</Typography>
            </CardContent>
          </IdentityCard>
        </Grid>
      </Grid>
    </Box>
  </>;
}
