import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import { App } from '@/App'
import { Web3ProviderContextProvider } from '@/contexts'
import MetamaskZkpSnapContextProvider from '@/contexts/MetamaskZkpSnapContext'
import { RoutesPaths } from '@/enums'

export const AppRoutes = () => {
  const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'))
  const SignInPage = lazy(() => import('@/pages/SignInPage/SignInPage'))

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<></>}>
          <Web3ProviderContextProvider>
            <MetamaskZkpSnapContextProvider>
              <App>
                <AnimatePresence>
                  <Outlet />
                </AnimatePresence>
              </App>
            </MetamaskZkpSnapContextProvider>
          </Web3ProviderContextProvider>
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: RoutesPaths.App,
          element: <ProfilePage />,
        },
        {
          index: true,
          path: RoutesPaths.SignIn,
          element: <SignInPage />,
        },
        {
          path: '/',
          element: <Navigate replace to={RoutesPaths.SignIn} />,
        },
        {
          path: '*',
          element: <Navigate replace to={RoutesPaths.SignIn} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
