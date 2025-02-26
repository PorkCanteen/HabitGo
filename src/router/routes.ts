import { lazy } from 'react'
import { RouteConfig } from './index'
const routes: RouteConfig[] = [
  {
    path: '/',
    element: lazy(() => import('@/pages/page-a')),
    children: [
      //
    ]
  },
  {
    path: '/b',
    element: lazy(() => import('@/pages/task/list')),
    children: [
      //
    ]
  },
  {
    path: '*',
    element: lazy(() => import('@/pages/page-a'))
  }
]

export default routes
