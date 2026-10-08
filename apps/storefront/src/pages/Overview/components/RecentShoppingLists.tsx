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
import { ShoppingListStatusTag } from "@/pages/ShoppingLists/ShoppingListStatusTag";
import { displayFormat } from "@/utils/b3DateFormat";

import { getRecentShoppingLists, OverviewShoppingList } from "../data";
import OverviewCard from "./OverviewCard";

interface ShoppingListsProps {
  startLoad: boolean;
}

export default function RecentShoppingLists({
  startLoad,
}: ShoppingListsProps) {
  const b3Lang = useB3Lang();
  const navigate = useNavigate();

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
                navigate(`/shoppingList/${item.id}`);
              }}
              />
            <Button onClick={() => navigate(HeadlessRoutes.SHOPPING_LISTS)}>{b3Lang('overview.allShoppingLists')}</Button>
          </CardContent>
        </OverviewCard>
      </B3Spin>
    </div>
  );
}
