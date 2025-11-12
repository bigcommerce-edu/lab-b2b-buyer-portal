export interface ErpGetRequest<QT = void> {
  path: string;
  token?: string;
  options?: {
    queryParams?: QT;
  }
}

export interface ErpPostRequest<PT, QT = void> extends ErpGetRequest<QT> {
  payload: PT;
}
