import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { AppNavbar, Loader } from '@/common'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/contexts'
import { bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { useNotification, useViewportSizes } from '@/hooks'

export const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  useViewportSizes()

  const { provider, init: initWeb3 } = useWeb3Context()
  const [isAppInitialized, setIsAppInitialized] = useState(false)
  const { checkMetamaskExists } = useMetamaskZkpSnapContext()
  const { showToast } = useNotification()

  const init = async () => {
    try {
      if (provider?.address) return
      if (await checkMetamaskExists()) {
        await initWeb3()
        setIsAppInitialized(true)
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }
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
      {provider?.isConnected && <AppNavbar className='app__navbar' />}
      <div className='app__main'>
        {isAppInitialized ? children : <Loader />}
      </div>

      <ToastContainer />
    </div>
  )
}
