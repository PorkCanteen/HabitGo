import { lazy } from "react";
import { RouteConfig } from "./index";

const routes: RouteConfig[] = [
  {
    path: "/",
    element: lazy(() => import("@/pages/MainLayout")),
    children: [
      {
        path: "/task",
        element: lazy(() => import("@/pages/task/TaskBoard")),
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
    ],
  },

  {
    path: "*",
    element: lazy(() => import("@/pages/404")),
  },
];

export default routes;
