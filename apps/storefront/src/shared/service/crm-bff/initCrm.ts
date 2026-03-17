import { fetchStorefrontToken } from "@/shared/service/crm-bff";
import { storeHash } from "@/utils/basicConfig";

const initCrm = async ({
  b2bToken,
  companyId,
}: {
  b2bToken: string,
  companyId: string,
}) => {
  // TODO: Use `fetchStorefrontToken` to get the token and log the result
  //  - If `b2bToken` or `companyId` is not provided, return immediately
  throw new Error('initCrm not implemented');
};

export { initCrm };
