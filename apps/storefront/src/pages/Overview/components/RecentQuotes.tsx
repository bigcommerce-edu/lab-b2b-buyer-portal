import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CardContent,
} from "@mui/material";

import { B3Table } from "@/components/table/B3Table";
import B3Spin from "@/components/spin/B3Spin";
import { HeadlessRoutes } from "@/constants";
import { useB3Lang } from "@/lib/lang";
import { displayFormat } from "@/utils/b3DateFormat";
import { currencyFormat } from "@/utils/b3CurrencyFormat";

import { getRecentQuotes, OverviewQuote } from "../data";
import OverviewCard from "./OverviewCard";

interface QuotesProps {
  startLoad: boolean;
}

export default function RecentQuotes({
  startLoad,
}: QuotesProps) {
  const b3Lang = useB3Lang();
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState<OverviewQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!startLoad || !loading) return;

    getRecentQuotes().then((quotes) => {
      setQuotes(quotes);
      setLoading(false);
    });
  }, [startLoad]);

  const quoteColumns = [
    {
      key: 'quoteNumber',
      title: b3Lang('quotes.quoteNumber'),
    },
    {
      key: 'quoteTitle',
      title: b3Lang('quotes.title'),
    },
    {
      key: 'createdBy',
      title: b3Lang('quotes.createdBy'),
    },
    {
      key: 'createdAt',
      title: b3Lang('quotes.dateCreated'),
      render: (item: OverviewQuote) => {
        return `${displayFormat(Number(item.createdAt))}`;
      },
    },
    {
      key: 'updatedAt',
      title: b3Lang('quotes.lastUpdate'),
      render: (item: OverviewQuote) => {
        return `${displayFormat(Number(item.updatedAt))}`;
      },
    },
    {
      key: 'totalAmount',
      title: b3Lang('quotes.subtotal'),
      render: (item: OverviewQuote) => {
        return `${currencyFormat(item.totalAmount)}`;
      },
    },
  ];

  return (
    <B3Spin isSpinning={loading}>
      <OverviewCard>
        <CardContent>
          <B3Table
            tableFixed={true}
            columnItems={quoteColumns}
            listItems={quotes}
            showPagination={false}
            onClickRow={(item) => {
              navigate(`/quoteDetail/${item.id}?date=${item.createdAt}`);
            }}
          />
          <Button onClick={() => navigate(HeadlessRoutes.QUOTES)}>{b3Lang('overview.allQuotes')}</Button>
        </CardContent>
      </OverviewCard>
    </B3Spin>
  );
}
