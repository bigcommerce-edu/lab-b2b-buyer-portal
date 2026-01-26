import { useEffect, useState } from "react";
import {
  Button,
  CardContent,
} from "@mui/material";

import { B3Table } from "@/components/table/B3Table";
import B3Spin from "@/components/spin/B3Spin";
import { HeadlessRoutes } from "@/constants";
import { useB3Lang } from "@/lib/lang";
import { type SetOpenPage } from '@/pages/SetOpenPage';
import { ShoppingListStatusTag } from "@/pages/ShoppingLists/ShoppingListStatusTag";
import { displayFormat } from "@/utils/b3DateFormat";

import { getRecentShoppingLists, OverviewShoppingList } from "../data";
import OverviewCard from "./OverviewCard";

interface ShoppingListsProps {
  startLoad: boolean;
  setOpenPage: SetOpenPage;
}

export default function RecentShoppingLists({
  startLoad,
  setOpenPage,
}: ShoppingListsProps) {
  const b3Lang = useB3Lang();

  const [shoppingLists, setShoppingLists] = useState<OverviewShoppingList[]>([]);
  const [loading, setLoading] = useState(true);

  const shoppingListColumns = [
    {
      key: 'name',
      title: b3Lang('overview.shoppingLists.name'),
    },
    {
      key: 'status',
      title: b3Lang('overview.shoppingLists.status'),
      render: (item: OverviewShoppingList) => {
        return <ShoppingListStatusTag status={item.status} />;
      },
    },
    {
      key: 'customerInfo',
      title: b3Lang('shoppingLists.card.createdBy'),
      render: (item: OverviewShoppingList) => {
        return `${item.customerInfo.firstName} ${item.customerInfo.lastName}`;
      },
    },
    {
      key: 'updatedAt',
      title: b3Lang('shoppingLists.card.lastActivity'),
      render: (item: OverviewShoppingList) => {
        return `${displayFormat(item.updatedAt)}`;
      },
    },
  ];

  useEffect(() => {
    if (!startLoad || !loading) return;

    getRecentShoppingLists().then((shoppingLists) => {
      setShoppingLists(shoppingLists);
      setLoading(false);
    });
  }, [startLoad]);

  return (
    <div>
      <B3Spin isSpinning={loading}>
        <OverviewCard>
          <CardContent>
            <B3Table
              tableFixed={true}
              columnItems={shoppingListColumns}
              listItems={shoppingLists}
              showPagination={false}
              onClickRow={(item) => {
                setOpenPage({ isOpen: true, openUrl: `/shoppingList/${item.id}` });
              }}
              />
            <Button onClick={() => setOpenPage({ isOpen: true, openUrl: HeadlessRoutes.SHOPPING_LISTS })}>{b3Lang('overview.allShoppingLists')}</Button>
          </CardContent>
        </OverviewCard>
      </B3Spin>
    </div>
  );
}
