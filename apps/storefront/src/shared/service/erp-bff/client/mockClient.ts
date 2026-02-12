import * as jose from 'jose';
import mockOrders from './mockOrders.json';
import { type ErpGetRequest, type ErpPostRequest } from './types';

// Simulates a secret key the BFF service would keep in environment config, not in code!
const mockBffSecret = 'fd18b2c6dd4842a34c4feeb5a3827a6d69307732a00a0f302021c0f949d4d06e';

const delay = (delayMilliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delayMilliseconds);
  });
};

const validateJwt = async(jwt: string) => {
  const { payload } = await jose.jwtVerify(jwt, new TextEncoder().encode(mockBffSecret));
  return payload;
};

const logInfo = <RT = void, PT = void, QT = void>(
  type: string, 
  params: MockRequestParams<PT, QT> | RT
) => {
  console.log(type, JSON.stringify(params, null, 2));
};

const logRequest = <PT = void, QT = void>(
  params: MockRequestParams<PT, QT>
) => {
  logInfo('mockEPRRequest', params);
};

const logResponse = <RT>(
  params: any
) => {
  logInfo<RT>('mockEPRResponse', params);
};

interface MockRequestParams<PT = void, QT = void> extends ErpGetRequest<QT> {
  method: "POST" | "GET";
  payload?: PT;
}

const mockRequest = async<RT, PT = void, QT = void>(
  params: MockRequestParams<PT, QT>
): Promise<RT> => {
  logRequest<PT, QT>(params);

  const { method, path: rawPath, token, payload, options } = params;

  const path = rawPath.replace(/^\/+|\/+$/g, '');
  const { queryParams } = options ?? {};

  const randomDelay = Math.floor(Math.random() * 5000) + 1000;
  await delay(randomDelay);
  
  switch (path) {
    case 'storefrontToken':
      if (method !== 'POST') {
        throw new Error('Method not allowed');
      }

      const mockPayload = payload as {
        b2bToken: string;
        b2bCompanyId: string;
        storeHash: string;
      };
      const { b2bToken, b2bCompanyId, storeHash: b2bStoreHash } = mockPayload;
      if (!b2bToken || !b2bCompanyId || !b2bStoreHash) {
        throw new Error('Invalid payload');
      }

      // Validate the payload by using the B2B storefront token in a request to the B2B API
      // to check that the company ID matches the user claim

      const erpStorefrontToken = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      const jwt = await new jose.SignJWT({
        token: erpStorefrontToken,
        companyId: '123456',
        storeHash: b2bStoreHash,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(mockBffSecret));

      const tokenResponse = {
        token: jwt,
      };

      logResponse<RT>(tokenResponse);
      return tokenResponse as RT;

    case 'company/orders':
      // As long as JWT is valid, we don't actually care about the values in this mock client
      await validateJwt(token ?? '');

      const mockQueryParams = queryParams as {
        b2bOrderIds: string[];
      };
      const { b2bOrderIds } = mockQueryParams;

      const orders = mockOrders
        .slice(0, b2bOrderIds.length)
        .map((order, index) => ({
          ...order,
          b2bOrderId: b2bOrderIds[index],
        }));

      const ordersResponse = { 
        orders,
      };

      logResponse<RT>(ordersResponse);
      return ordersResponse as RT;

    default:
      throw new Error('Invalid path');
  }
};

const mockClient = {
  post: async<RT, PT, QT = void>({
    path,
    token,
    payload,
    options,
  }: ErpPostRequest<PT, QT>) => {
    return mockRequest<RT, PT, QT>({ method: 'POST', path, token, payload, options });
  },

  get: async<RT, QT = void>({
    path,
    token,
    options,
  }: ErpGetRequest<QT>) => {
    return mockRequest<RT, void, QT>({ method: 'GET', path, token, options });
  },
};

export default mockClient;
