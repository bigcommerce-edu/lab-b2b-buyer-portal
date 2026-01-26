import { useAppSelector } from "@/store";
import { selectErpToken } from "@/store/slices/erp";

export default function useErpToken() {
  const erpToken = useAppSelector(selectErpToken);
  return erpToken;
}
