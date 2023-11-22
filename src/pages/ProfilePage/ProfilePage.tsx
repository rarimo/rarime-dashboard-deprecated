import './styles.scss'

import { W3CCredential } from '@rarimo/rarime-connector'
import { useCallback, useEffect, useState } from 'react'

import { AppButton, Icon } from '@/common'
import { useMetamaskZkpSnapContext } from '@/contexts'
import { ICON_NAMES } from '@/enums'
import CredentialsTile from '@/pages/ProfilePage/components/CredentialsTile'
import Sidebar from '@/pages/ProfilePage/components/Sidebar'

const ProfilePage = () => {
  const [credentials, setCredentials] = useState([] as W3CCredential[])
  const { getCredentials } = useMetamaskZkpSnapContext()

  const getUserCredentials = useCallback(async () => {
    const userCredentials = await getCredentials()

    setCredentials(userCredentials)
  }, [getCredentials])

  useEffect(() => {
    getUserCredentials()
  }, [getUserCredentials])

  return (
    <div className='profile-page'>
      <div className='profile-page__wrapper'>
        <h1 className='profile-page__title'>{'Profiles & Wallets'}</h1>
        <p className='profile-page__description'>
          {
            'Manage your identity credentials and Soulbound Tokens (SBTs) easily from this dashboard'
          }
        </p>
        <div className='profile-page__content-wrapper'>
          <Sidebar credentials={credentials ?? []} />
          <div className='profile-page__content'>
            <div className='profile-page__content-header'>
              <h2 className='profile-page__content-title'>{'Profile #1'}</h2>
              {Boolean(credentials.length) && (
                <div className='profile-page__content-actions'>
                  <div className='profile-page__content-actions_wallets'>
                    <span>{'Wallet'}</span>
                    <AppButton
                      scheme='none'
                      text={'All'}
                      iconRight={ICON_NAMES.expandMore}
                    />
                  </div>
                  <div className='profile-page__content-actions_filter'>
                    <span>{'Filter'}</span>
                    <AppButton
                      scheme='none'
                      text={'All'}
                      iconRight={ICON_NAMES.expandMore}
                    />
                  </div>
                  <AppButton
                    className='profile-page__content-actions_add'
                    text={'New'}
                    scheme='filled'
                    size='small'
                    modification='border-circle'
                    iconLeft={ICON_NAMES.plus}
                  />
                </div>
              )}
            </div>
            {credentials.length ? (
              <div className='profile-page__content-tiles'>
                {credentials.map((credential, idx) => (
                  <CredentialsTile key={idx} credential={credential} />
                ))}
              </div>
            ) : (
              <div className='profile-page__content-empty'>
                <Icon
                  width={88}
                  height={88}
                  className='profile-page__content-empty_icon'
                  name={ICON_NAMES.plusInCircle}
                />
                <span className='profile-page__content-empty_title'>
                  {'Add Credentials'}
                </span>
                <p className='profile-page__content-empty_description'>
                  {'Explore credentials marketplace with different providers '}
                </p>
                <AppButton
                  className='profile-page__content-empty_button'
                  iconLeft={ICON_NAMES.plus}
                  text={'New Proof'}
                  size='large'
                  modification='border-circle'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
