import { API_BASE_URL } from "@/config";
import { getToken, clearAuth } from "./tokenUtils";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestConfig {
  url: string;
  method?: HttpMethod;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  baseUrl?: string;
}

// 定义响应数据类型
export interface ResponseData<T = unknown> {
  code: string;
  message: string;
  data?: T;
}

// 全局配置
const globalConfig = {
  baseUrl: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// 请求拦截器
const requestInterceptor = (config: RequestConfig): RequestConfig => {
  // 排除登录接口的检查
  if (!config.url.includes('/login')) {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      throw new Error('用户未登录');
    }
    
    // 添加token到请求头
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
};

// 处理认证失败的情况
const handleAuthFailure = (message: string = '认证失败，请重新登录') => {
  clearAuth();
  window.location.href = '/login';
  throw new Error(message);
};

// 响应拦截器
const responseInterceptor = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    // 如果是401未授权错误，则清除token并跳转到登录页
    if (response.status === 401) {
      handleAuthFailure();
    }
    throw new Error(`请求错误! status: ${response.status}`);
  }
  
  // 解析响应数据
  const data = await response.json();
  
  // 检查后端返回的特定错误码
  if (data && typeof data === 'object') {
    const responseData = data as ResponseData;
    
    // 检查是否是认证失败的错误码
    if (responseData.code === '500' && responseData.message?.includes('无效的认证Token')) {
      handleAuthFailure(responseData.message);
    }
  }
  
  return data as T;
};

// 核心请求方法
export const request = async <T>(config: RequestConfig): Promise<T> => {
  const mergedConfig = requestInterceptor({
    ...globalConfig,
    ...config,
    headers: { ...globalConfig.headers, ...config.headers },
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), mergedConfig.timeout);

  try {
    const response = await fetch(mergedConfig.baseUrl + mergedConfig.url, {
      method: mergedConfig.method || "GET",
      headers: mergedConfig.headers,
      body: mergedConfig.data ? JSON.stringify(mergedConfig.data) : undefined,
      signal: controller.signal,
    });

    return responseInterceptor<T>(response);
  } catch (error) {
    throw new Error(
      `请求错误: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    clearTimeout(timeoutId);
  }
};

// 快捷方法
export const http = {
  get: <T>(url: string) => request<T>({ url, method: "GET" }),
  post: <T>(url: string, data?: unknown) =>
    request<T>({ url, method: "POST", data }),
  put: <T>(url: string, data?: unknown) => request<T>({ url, method: "PUT", data }),
  delete: <T>(url: string) => request<T>({ url, method: "DELETE" }),
};