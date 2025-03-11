type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestConfig {
  url: string;
  method?: HttpMethod;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  baseUrl?: string;
}

// 全局配置
const globalConfig = {
  baseUrl: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// 请求拦截器
const requestInterceptor = (config: RequestConfig): RequestConfig => {
  // 可以在这里添加token等全局处理
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
  post: <T>(url: string, data?: any) =>
    request<T>({ url, method: "POST", data }),
  put: <T>(url: string, data?: any) => request<T>({ url, method: "PUT", data }),
  delete: <T>(url: string) => request<T>({ url, method: "DELETE" }),
};
