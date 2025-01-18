import { Api } from './Api';
import { store } from '../store';
import { refresh } from '../features/auth/authActions';

class ApiService extends Api<unknown> {
  private static instance: ApiService;

  private constructor() {
    super({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    this.instance.interceptors.request.use((config) => {
      const token = store.getState().auth.access;
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const resultAction = await store.dispatch(refresh());

            if (refresh.fulfilled.match(resultAction)) {
              const newToken = resultAction.payload.access;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            } else {
              store.dispatch({ type: 'auth/logout' });
              return Promise.reject(
                resultAction.payload || 'Refresh token failed'
              );
            }
          } catch (err) {
            store.dispatch({ type: 'auth/logout' });
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
}

export const apiService = ApiService.getInstance();
