import './styles.scss'

import { FC, HTMLAttributes } from 'react'

import { AppButton, AppLogo } from '@/common'
import { IconNames, RoutesPaths } from '@/enums'

const AppNavbar: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <div className={`app-navbar ${className}`} {...rest}>
      <div className='app-navbar__main-section'>
        <AppLogo className='app-navbar__logo' />
        <AppButton
          className='app-navbar__link'
          scheme='none'
          size='none'
          iconLeft={IconNames.AccountBalanceWallet}
          routePath={RoutesPaths.Profiles}
        />
      </div>
    </div>
  )
}

export default AppNavbar
