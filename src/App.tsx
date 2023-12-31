import { FC, HTMLAttributes, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useWindowSize } from 'react-use'

import { AppNavbar, Loader, MobileDeviceMessage } from '@/common'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/contexts'
import { RoutesPaths } from '@/enums'
import { bus, BUS_EVENTS, ErrorHandler, isMobile } from '@/helpers'
import { useNotification, useViewportSizes } from '@/hooks'

export const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  useViewportSizes()

  const { provider, init: initWeb3 } = useWeb3Context()
  const [isAppInitialized, setIsAppInitialized] = useState(false)
  const { checkMetamaskExists, connectOrInstallSnap, checkSnapExists } =
    useMetamaskZkpSnapContext()
  const { showToast } = useNotification()
  const { width } = useWindowSize()
  const { pathname } = useLocation()
  const isDeviceMobile = useMemo(() => {
    if (width <= 1280) {
      return isMobile()
    }

    return false
  }, [width])

  const init = async () => {
    if (provider?.address) return

    try {
      if (await checkMetamaskExists()) {
        await initWeb3()

        if (await checkSnapExists()) {
          await connectOrInstallSnap()
        }
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }

  useEffect(() => {
    const showSuccessToast = (payload: unknown) => showToast('success', payload)
    const showWarningToast = (payload: unknown) => showToast('warning', payload)
    const showErrorToast = (payload: unknown) => showToast('error', payload)
    const showInfoToast = (payload: unknown) => showToast('info', payload)

    let mountingInit = async () => {
      bus.on(BUS_EVENTS.success, showSuccessToast)
      bus.on(BUS_EVENTS.warning, showWarningToast)
      bus.on(BUS_EVENTS.error, showErrorToast)
      bus.on(BUS_EVENTS.info, showInfoToast)

      await init()
    }

    mountingInit()

    return () => {
      bus.off(BUS_EVENTS.success, showSuccessToast)
      bus.off(BUS_EVENTS.warning, showWarningToast)
      bus.off(BUS_EVENTS.error, showErrorToast)
      bus.off(BUS_EVENTS.info, showInfoToast)

      mountingInit = async () => {
        /* empty */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='app'>
      {isDeviceMobile ? (
        <MobileDeviceMessage />
      ) : (
        <>
          {pathname !== RoutesPaths.SignIn && (
            <AppNavbar className='app__navbar' />
          )}
          <div className='app__main'>
            {isAppInitialized ? children : <Loader className='app__loader' />}
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  )
}
