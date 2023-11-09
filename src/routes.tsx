import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import { App } from '@/App'
import { RoutesPaths } from '@/enums'

export const AppRoutes = () => {
  const MainPage = lazy(() => import('@/pages/MainPage'))

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<></>}>
          <App>
            <AnimatePresence>
              <Outlet />
            </AnimatePresence>
          </App>
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: RoutesPaths.App,
          element: <MainPage />,
        },
        {
          path: '/',
          element: <Navigate replace to={RoutesPaths.App} />,
        },
        {
          path: '*',
          element: <Navigate replace to={RoutesPaths.App} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
