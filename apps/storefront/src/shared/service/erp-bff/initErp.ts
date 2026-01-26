import { fetchStorefrontToken } from "@/shared/service/erp-bff";
import { storeHash } from "@/utils/basicConfig";

const initErp = async ({ 
  b2bToken, 
  companyId,
}: { 
  b2bToken: string, 
  companyId: string,
}) => {
  if (!b2bToken || !companyId) return;

  // TRY: Watch the console in your browser tools to see the mock token request/response
  const token = await fetchStorefrontToken({
    b2bToken,
    b2bCompanyId: companyId,
    storeHash,
  });

  return token;
};

export { initErp };
