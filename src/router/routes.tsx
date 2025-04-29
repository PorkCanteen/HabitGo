import { lazy } from "react";
import { RouteConfig } from "./index";
import { Navigate, redirect } from "react-router-dom";

const routes: RouteConfig[] = [
  {
    path: "/",
    element: lazy(() => import("@/pages/MainLayout")),
    children: [
      // 添加 index 路由实现自动重定向
      {
        index: true,
        loader: () => redirect("/task"),
        element: lazy(() => import("react-router-dom").then(() => ({ default: () => <Navigate to="/task" /> }))),
      },
      {
        path: "/task",
        element: lazy(() => import("@/pages/task/TaskBoard")),
        children: [
          //
        ],
      },
      {
        path: "/task/detail",
        element: lazy(() => import("@/pages/task/components/TaskDetail")),
        children: [
          //
        ],
      },
      {
        path: "/todo",
        element: lazy(() => import("@/pages/todo/TodoBoard")),
        children: [
          //
        ],
      },
      {
        path: '/setting',
        element: lazy(() => import("@/pages/setting/SettingBoard")),
      }
    ],
  },
  {
    path: "/login",
    element: lazy(() => import("@/pages/login")),
    children: [
      //
    ],
  },
  {
    path: "*",
    element: lazy(() => import("@/pages/404")),
  },
];

export default routes;
