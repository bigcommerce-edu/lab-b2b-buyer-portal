import { fetchStorefrontToken } from "@/shared/service/crm-bff";
import { storeHash } from "@/utils/basicConfig";

const initCrm = async ({
  b2bToken,
  companyId,
}: {
  b2bToken: string,
  companyId: string,
}) => {
  throw new Error('initCrm not implemented');
};

export { initCrm };
