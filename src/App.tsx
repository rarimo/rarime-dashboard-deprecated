import { FC, HTMLAttributes, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { AppNavbar } from '@/common'
import { bus, BUS_EVENTS } from '@/helpers'
import { useNotification, useViewportSizes } from '@/hooks'

export const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  useViewportSizes()

  const { showToast } = useNotification()

  useEffect(() => {
    const showSuccessToast = (payload: unknown) => showToast('success', payload)
    const showWarningToast = (payload: unknown) => showToast('warning', payload)
    const showErrorToast = (payload: unknown) => showToast('error', payload)
    const showInfoToast = (payload: unknown) => showToast('info', payload)

    bus.on(BUS_EVENTS.success, showSuccessToast)
    bus.on(BUS_EVENTS.warning, showWarningToast)
    bus.on(BUS_EVENTS.error, showErrorToast)
    bus.on(BUS_EVENTS.info, showInfoToast)

    return () => {
      bus.off(BUS_EVENTS.success, showSuccessToast)
      bus.off(BUS_EVENTS.warning, showWarningToast)
      bus.off(BUS_EVENTS.error, showErrorToast)
      bus.off(BUS_EVENTS.info, showInfoToast)
    }
  }, [showToast])

  return (
    <div className='app'>
      <AppNavbar className='app__navbar' />
      {children}

      <ToastContainer />
    </div>
  )
}
