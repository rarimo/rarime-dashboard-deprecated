import { PROVIDERS } from '@distributedlab/w3p'
import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { AppNavbar, Loader } from '@/common'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/contexts'
import { bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { useNotification, useViewportSizes } from '@/hooks'

export const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  useViewportSizes()

  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { showToast } = useNotification()
  const { provider, init: initWeb3 } = useWeb3Context()
  const { checkMetamaskExists, checkSnapExists, connectOrInstallSnap } =
    useMetamaskZkpSnapContext()

  const init = useCallback(async () => {
    if (provider?.address) return

    try {
      if (await checkMetamaskExists()) {
        /**
         * We not pass providerType here,
         * because only want to check is user was connected before
         */
        await initWeb3()
        if (await checkSnapExists()) {
          await connectOrInstallSnap()
        } else {
          await initWeb3(PROVIDERS.Metamask)
          await connectOrInstallSnap()
        }
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }, [
    provider?.address,
    checkMetamaskExists,
    initWeb3,
    checkSnapExists,
    connectOrInstallSnap,
  ])

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='app'>
      <AppNavbar className='app__navbar' />
      <div className='app__main'>
        {isAppInitialized ? children : <Loader />}
      </div>

      <ToastContainer />
    </div>
  )
}
