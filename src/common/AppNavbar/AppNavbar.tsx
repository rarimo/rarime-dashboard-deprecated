import './styles.scss'

import { FC, HTMLAttributes } from 'react'

import { AppButton, AppLogo } from '@/common'
import { RoutesPaths } from '@/enums'

const AppNavbar: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <div className={`app-navbar ${className}`} {...rest}>
      <AppLogo className='app-navbar__logo' />

      <AppButton
        className='app-navbar__link'
        scheme='flat'
        text={RoutesPaths.App}
        routePath={RoutesPaths.App}
      />
    </div>
  )
}

export default AppNavbar
