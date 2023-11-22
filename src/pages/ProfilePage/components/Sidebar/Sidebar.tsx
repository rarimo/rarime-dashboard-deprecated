import './styles.scss'

import { W3CCredential } from '@rarimo/rarime-connector'
import { FC, HTMLAttributes } from 'react'

import { AppButton, Icon } from '@/common'
import { useWeb3Context } from '@/contexts'
import { ICON_NAMES } from '@/enums'

type Props = {
  credentials: W3CCredential[]
} & HTMLAttributes<HTMLDivElement>

const Sidebar: FC<Props> = ({ credentials }) => {
  const { provider } = useWeb3Context()

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-header__content'>
          {/*TODO: add dynamic avatar*/}
          <img
            src='/static/imgs/default-profile-img.png'
            width={40}
            height={40}
            alt='avatar'
          />
          <div className='sidebar-header__content-text'>
            <p className='sidebar-header__content-text_title'>{'Profile #1'}</p>
            <p className='sidebar-header__content-text_description'>
              {/*TODO: add dynamic proofs*/}
              {credentials.length + ' Credentials'}
            </p>
          </div>
        </div>
        <AppButton
          iconLeft={ICON_NAMES.expandAll}
          scheme='none'
          size='x-small'
        />
      </div>
      <div className='sidebar-content'>
        <div className='sidebar-content__wallet'>
          <div className='sidebar-content__wallet-content'>
            <Icon
              className='sidebar-content__wallet-icon'
              name={
                ICON_NAMES[
                  String(provider?.providerType) as keyof typeof ICON_NAMES
                ]
              }
            />
            <span className='sidebar-content__wallet-name'>
              {String(provider?.providerType)}
            </span>
          </div>
          <AppButton
            iconLeft={ICON_NAMES.expandMore}
            scheme='none'
            size='x-small'
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
