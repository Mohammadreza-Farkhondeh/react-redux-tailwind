import { Api } from './Api';

class ApiService {
  private static instance: Api<unknown>;

  public static getInstance(): Api<unknown> {
    if (!ApiService.instance) {
      ApiService.instance = new Api({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        secure: true,
      });
    }
    return ApiService.instance;
  }
}

export const apiService = ApiService.getInstance();
