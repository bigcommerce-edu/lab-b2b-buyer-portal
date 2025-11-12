import { fetchStorefrontToken } from "@/shared/service/erp-bff";
import { AppDispatch } from "@/store";
import { storeHash } from "@/utils";

const initErp = ({ 
  b2bToken, 
  companyId,
  // TODO: Add a parameter called `appDispatch`
}: { 
  b2bToken: string, 
  companyId: string,
  // TODO: Type `appDispatch` as `AppDispatch`
}) => {
  // TODO: Use `fetchStorefrontToken` to get the token and log the result
  //  - If `b2bToken` or `companyId` is not provided, return immediately
  throw new Error('initErp not implemented');
};

export { initErp };
