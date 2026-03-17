import { useAppSelector, selectCrmToken } from "@/store";

export default function useCrmToken() {
  const crmToken = useAppSelector(selectCrmToken);
  return crmToken;
}
