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
        {/*TODO: add sidebar actions*/}
        <AppButton
          className='app-navbar__link'
          scheme='none'
          size='none'
          iconLeft={IconNames.search}
        />
        <AppButton
          className='app-navbar__link'
          scheme='none'
          size='none'
          iconLeft={IconNames.plus}
        />
        <AppButton
          className='app-navbar__link'
          scheme='none'
          size='none'
          iconLeft={IconNames.bolt}
        />
        <AppButton
          className='app-navbar__link'
          scheme='none'
          size='none'
          iconLeft={IconNames.checkCircle}
        />
        <AppButton
          className='app-navbar__link'
          scheme='none'
          size='none'
          iconLeft={IconNames.accountBalanceWallet}
          routePath={RoutesPaths.App}
        />
      </div>
      <div className='app-navbar__profile'>
        {/*TODO: add dynamic avatar*/}
        <img
          src='/static/imgs/default-profile-img.png'
          width={40}
          height={40}
          alt='avatar'
        />
      </div>
    </div>
  )
}

export default AppNavbar
