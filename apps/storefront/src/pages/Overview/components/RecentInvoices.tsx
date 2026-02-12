import { useEffect, useState } from "react";
import {
  Button,
  CardContent,
} from "@mui/material";

import { B3Table } from "@/components/table/B3Table";
import B3Spin from "@/components/spin/B3Spin";
import { HeadlessRoutes } from "@/constants";
import { useB3Lang } from "@/lib/lang";
import InvoiceStatus from "@/pages/Invoice/components/InvoiceStatus";
import { type SetOpenPage } from '@/pages/SetOpenPage';
import { displayFormat } from "@/utils/b3DateFormat";
import { currencyFormat } from "@/utils/b3CurrencyFormat";

import { getRecentInvoices, OverviewInvoice } from "../data";
import OverviewCard from "./OverviewCard";

interface InvoicesProps {
  startLoad: boolean;
  setOpenPage: SetOpenPage;
}

export default function RecentInvoices({
  startLoad,
  setOpenPage,
}: InvoicesProps) {
  const b3Lang = useB3Lang();
  const currentDate = new Date().getTime();

  const [invoices, setInvoices] = useState<OverviewInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!startLoad || !loading) return;

    getRecentInvoices().then((invoices) => {
      setInvoices(invoices);
      setLoading(false);
    });
  }, [startLoad]);

  const invoiceColumns = [
    {
      key: 'id',
      title: b3Lang('invoice.headers.invoice'),
    },
    {
      key: 'orderNumber',
      title: b3Lang('invoice.headers.order'),
    },
    {
      key: 'createdAt',
      title: b3Lang('invoice.headers.invoiceDate'),
      render: (item: OverviewInvoice) =>
        `${item.createdAt ? displayFormat(Number(item.createdAt)) : '–'}`,
    },
    {
      key: 'originalBalance',
      title: b3Lang('invoice.headers.invoiceTotal'),
      render: (item: OverviewInvoice) => {
        return currencyFormat(item.originalBalance.value);
      },
    },
    {
      key: 'openBalance',
      title: b3Lang('invoice.headers.amountDue'),
      render: (item: OverviewInvoice) => {
        return currencyFormat(item.openBalance.value);
      },
    },
    {
      key: 'status',
      title: b3Lang('invoice.headers.status'),
      render: (item: OverviewInvoice) => {
        const { status, dueDate } = item;
        let code = item.status;
  
        // (3, "Overdue")-【Display status when invoice exceeds due date. For front-end display only】
        if (status === 0 && currentDate > dueDate * 1000) {
          code = 3;
        }
  
        return <InvoiceStatus code={code} />;
      },
    },
  ];

  return (
    <B3Spin isSpinning={loading}>
      <OverviewCard>
        <CardContent>
          <B3Table
            tableFixed={true}
            columnItems={invoiceColumns}
            listItems={invoices}
            showPagination={false}
            />
          <Button onClick={() => setOpenPage({ isOpen: true, openUrl: HeadlessRoutes.INVOICE })}>{b3Lang('overview.allInvoices')}</Button>
        </CardContent>
      </OverviewCard>
    </B3Spin>
  );
}
