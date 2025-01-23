import { Api } from './Api';
import { store } from '../store';
import { refresh } from '../features/auth/authActions';

class ApiService extends Api<unknown> {
  private static instance: ApiService;
  private isRefreshing = false;
  private refreshTokenPromise: Promise<void> | null = null;

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
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            
            try {
              if (!this.refreshTokenPromise) {
                this.refreshTokenPromise = new Promise(async (resolve, reject) => {
                  try {
                    const resultAction = await store.dispatch(refresh());

                    if (refresh.fulfilled.match(resultAction)) {
                      resolve();
                    } else {
                      reject();
                    }
                  } catch (err) {
                    reject(err);
                  }
                });
              }

              await this.refreshTokenPromise;

              const newToken = store.getState().auth.access;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              originalRequest._retry = true;

              return this.instance(originalRequest);
            } catch (refreshError) {
              store.dispatch({ type: 'auth/logout' });
              return Promise.reject(refreshError);
            } finally {
              this.isRefreshing = false;
              this.refreshTokenPromise = null;
            }
          } else {
            try {
              await this.refreshTokenPromise;
              const newToken = store.getState().auth.access;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              originalRequest._retry = true;
              return this.instance(originalRequest);
            } catch {
              store.dispatch({ type: 'auth/logout' });
              return Promise.reject(error);
            }
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