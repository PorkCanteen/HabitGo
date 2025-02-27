import Loading from '@/pages/loading'
import { ComponentType, LazyExoticComponent } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router'
import routes from './routes'

export type RouteConfig = Omit<RouteObject, 'element' | 'children'> & {
  element?: LazyExoticComponent<ComponentType>
  children?: RouteConfig[]
}

const transformRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map(route => {
    return {
      ...route,
      element: route.element ? <Loading lazy={route.element} /> : undefined,
      children: route.children?.length ? transformRoutes(route.children) : undefined
    } as RouteObject
  })
}

// history路由配置
const router = createBrowserRouter(transformRoutes(routes))

export default router
