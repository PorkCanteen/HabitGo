// Token 相关方法
const TOKEN_KEY = 'auth_token'; 
const USER_KEY = 'user_info';

// 保存 token 到本地存储
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// 获取 token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// 移除 token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// 保存用户信息到本地存储
export const setUserInfo = (userInfo: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
};

// 获取用户信息
export const getUserInfo = (): any => {
  const userInfoStr = localStorage.getItem(USER_KEY);
  return userInfoStr ? JSON.parse(userInfoStr) : null;
};

// 移除用户信息
export const removeUserInfo = (): void => {
  localStorage.removeItem(USER_KEY);
};

// 清除所有认证相关数据
export const clearAuth = (): void => {
  removeToken();
  removeUserInfo();
}; 