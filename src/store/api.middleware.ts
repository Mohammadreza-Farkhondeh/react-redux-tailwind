import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

export const apiMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error('API Error:', action.payload);
  }
  return next(action);
};
