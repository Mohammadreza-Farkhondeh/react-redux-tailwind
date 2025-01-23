/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/**
 * SignupRequest
 * Schema for user registration requests.
 * Inherits from UserCreate to avoid redundancy.
 */
export interface SignupRequest {
  /** Username */
  username: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /**
   * Password
   * @minLength 8
   * @example "strongpassword123"
   */
  password: string;
}

/**
 * SignupResponse
 * Schema for user registration responses.
 */
export interface SignupResponse {
  /**
   * Message
   * @default "User registered successfully"
   */
  message?: string;
  user: UserOut;
}

/**
 * TokenObtainRequest
 * Schema for obtaining tokens (login).
 */
export interface TokenObtainRequest {
  /**
   * Email
   * @example "m@example.com"
   */
  email: string;
  /**
   * Password
   * @example "securepassword123"
   */
  password: string;
}

/**
 * TokenRefreshRequest
 * Schema for refreshing tokens.
 */
export interface TokenRefreshRequest {
  /** Refresh */
  refresh: string;
}

/**
 * TokenResponse
 * Schema for token responses (both obtain and refresh).
 */
export interface TokenResponse {
  /** Access */
  access: string;
  /** Refresh */
  refresh: string;
}

/** UserOut */
export interface UserOut {
  /** Id */
  id: number | null;
  /** Created At */
  created_at: string | null;
  /** Updated At */
  updated_at: string | null;
  /** Username */
  username: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Is Active */
  is_active: boolean;
  /** Is Superuser */
  is_superuser: boolean;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title FastAPI Project
 * @version v1
 *
 * Project description goes here
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * @description Endpoint for user registration.
     *
     * @tags auth, auth
     * @name SignupUserAuthSignupPost
     * @summary Signup User
     * @request POST:/auth/signup
     */
    signupUserAuthSignupPost: (data: SignupRequest, params: RequestParams = {}) =>
      this.request<SignupResponse, HTTPValidationError>({
        path: `/auth/signup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Endpoint for obtaining access and refresh tokens.
     *
     * @tags auth, auth
     * @name ObtainTokenAuthTokenObtainPost
     * @summary Obtain Token
     * @request POST:/auth/token/obtain
     */
    obtainTokenAuthTokenObtainPost: (data: TokenObtainRequest, params: RequestParams = {}) =>
      this.request<TokenResponse, HTTPValidationError>({
        path: `/auth/token/obtain`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Endpoint for refreshing the access token.
     *
     * @tags auth, auth
     * @name RefreshTokenAuthTokenRefreshPost
     * @summary Refresh Token
     * @request POST:/auth/token/refresh
     */
    refreshTokenAuthTokenRefreshPost: (data: TokenRefreshRequest, params: RequestParams = {}) =>
      this.request<TokenResponse, HTTPValidationError>({
        path: `/auth/token/refresh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  health = {
    /**
     * @description Basic health check endpoint.
     *
     * @tags system
     * @name HealthCheckHealthGet
     * @summary Health Check
     * @request GET:/health
     */
    healthCheckHealthGet: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/health`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
