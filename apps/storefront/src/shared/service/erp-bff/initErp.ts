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
  if (!b2bToken || !companyId) return;

  // TRY: Watch the console in your browser tools to see the mock token request/response
  fetchStorefrontToken({
    b2bToken,
    b2bCompanyId: companyId,
    storeHash,
  }).then((erpToken) => {
    // TODO: Remove this console.log after implementing dispatch
    console.log('erpToken', erpToken);
  });
};

export { initErp };
