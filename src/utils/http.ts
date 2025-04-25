import Cookies from "js-cookie";
import { API_BASE_URL } from "@/config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestConfig {
  url: string;
  method?: HttpMethod;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  baseUrl?: string;
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
    const user = Cookies.get('user');
    if (!user) {
      window.location.href = '/login';
      throw new Error('用户未登录');
    }
    // 从cookie中获取用户信息并添加到请求中
    const userData = JSON.parse(user);
    console.log(user, '用户信息')
    if (userData.id) {
      // 如果是GET请求，将userId添加到URL中
      if (config.method === 'GET' || !config.method) {
        const separator = config.url.includes('?') ? '&' : '?';
        config.url = `${config.url}${separator}userId=${userData.id}`;
      } else {
        // 如果是其他请求，将userId添加到请求体中
        if (!config.data) {
          config.data = {};
        }
        (config.data as any).userId = userData.id;
      }
    }
  }
  return config;
};

// 响应拦截器
const responseInterceptor = <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`请求错误! status: ${response.status}`);
  }
  return response.json();
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

export interface ResponseData {
  code: string;
  message: string;
  data?: unknown;
  // 其他可能的字段
}