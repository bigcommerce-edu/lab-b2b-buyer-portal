export interface CrmGetRequest<QT = void> {
  path: string;
  token?: string;
  options?: {
    queryParams?: QT;
  }
}

export interface CrmPostRequest<PT, QT = void> extends CrmGetRequest<QT> {
  payload: PT;
}
