import './styles.scss'

import { PROVIDERS } from '@distributedlab/w3p'
import { W3CCredential } from '@rarimo/rarime-connector'
import { FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import { Icon } from '@/common'
import { useWeb3Context } from '@/contexts'
import { IconNames } from '@/enums'

type Props = {
  credentials: W3CCredential[]
} & HTMLAttributes<HTMLDivElement>

const Sidebar: FC<Props> = ({ credentials }) => {
  const { provider } = useWeb3Context()
  const { t } = useTranslation()

  const walletIcon = () => {
    switch (provider?.providerType) {
      case PROVIDERS.Metamask:
        return IconNames.Metamask
      default:
        return IconNames.Metamask
    }
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-header__content'>
          {/*TODO: add dynamic avatar*/}
          <img
            src='/imgs/default-profile-img.png'
            width={40}
            height={40}
            alt='avatar'
          />
          <div className='sidebar-header__content-text'>
            <p className='sidebar-header__content-text-title'>{'Profile #1'}</p>
            <p className='sidebar-header__content-text-description'>
              {/*TODO: add dynamic proofs*/}
              {credentials.length +
                ' ' +
                (credentials.length !== 1
                  ? t('profile-page.credentials')
                  : t('profile-page.credential'))}
            </p>
          </div>
        </div>
      </div>
      <div className='sidebar-content'>
        <div className='sidebar-content__wallet'>
          <div className='sidebar-content__wallet-content'>
            <Icon
              className='sidebar-content__wallet-icon'
              name={walletIcon()}
            />
            <span className='sidebar-content__wallet-name'>
              {String(provider?.providerType)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
