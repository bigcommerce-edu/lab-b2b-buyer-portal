import { fetchStorefrontToken } from "@/shared/service/erp-bff";
import { AppDispatch } from "@/store";
import { setErpToken } from "@/store/slices/erp";
import { storeHash } from "@/utils";

const initErp = ({ 
  b2bToken, 
  companyId,
  appDispatch,
}: { 
  b2bToken: string, 
  companyId: string,
  appDispatch: AppDispatch
}) => {
  if (!b2bToken || !companyId) return;

  // TRY: Watch the console in your browser tools to see the mock token request/response
  fetchStorefrontToken({
    b2bToken,
    b2bCompanyId: companyId,
    storeHash,
  }).then((erpToken) => {
    // TRY: View session storage in your browser tools to see the "persist:erp" value
    appDispatch(setErpToken(erpToken));
  });
};

export { initErp };
