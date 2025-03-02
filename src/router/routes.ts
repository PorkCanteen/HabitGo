import { lazy } from "react";
import { RouteConfig } from "./index";
const routes: RouteConfig[] = [
  {
    path: "/task",
    element: lazy(() => import("@/pages/task/TaskBoard")),
    children: [
      //
    ],
  },
  {
    path: "*",
    element: lazy(() => import("@/pages/page-a")),
  },
];

export default routes;
