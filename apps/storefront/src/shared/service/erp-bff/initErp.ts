import { fetchStorefrontToken } from "@/shared/service/erp-bff";
import { storeHash } from "@/utils/basicConfig";

const initErp = async ({ 
  b2bToken, 
  companyId,
}: { 
  b2bToken: string, 
  companyId: string,
}) => {
  // TODO: Use `fetchStorefrontToken` to get the token and log the result
  //  - If `b2bToken` or `companyId` is not provided, return immediately
  throw new Error('initErp not implemented');
};

export { initErp };
