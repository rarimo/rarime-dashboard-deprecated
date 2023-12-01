import './styles.scss'

import { config } from '@config'
import { W3CCredential } from '@rarimo/rarime-connector'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppButton, Icon } from '@/common'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/contexts'
import { IconNames, RoutesPaths } from '@/enums'

import { CredentialsTile, Sidebar } from './components'

const ProfilePage = () => {
  const [credentials, setCredentials] = useState([] as W3CCredential[])
  const { getCredentials } = useMetamaskZkpSnapContext()
  const { provider } = useWeb3Context()
  const navigate = useNavigate()

  const getUserCredentials = useCallback(async () => {
    setCredentials(await getCredentials())
  }, [getCredentials])

  useEffect(() => {
    if (!provider?.address) {
      navigate(RoutesPaths.SignIn)
      return
    }
    getUserCredentials()
  }, [getUserCredentials, navigate, provider])

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
                  <div className='profile-page__content-actions-wallets'>
                    <span>{'Wallet'}</span>
                    <AppButton
                      scheme='none'
                      text={'All'}
                      iconRight={IconNames.ExpandMore}
                    />
                  </div>
                  <div className='profile-page__content-actions-filter'>
                    <span>{'Filter'}</span>
                    <AppButton
                      scheme='none'
                      text={'All'}
                      iconRight={IconNames.ExpandMore}
                    />
                  </div>
                  <AppButton
                    className='profile-page__content-actions-add'
                    text={'New'}
                    scheme='filled'
                    size='small'
                    modification='border-circle'
                    iconLeft={IconNames.Plus}
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
                  className='profile-page__content-empty-icon'
                  name={IconNames.PlusInCircle}
                />
                <span className='profile-page__content-empty-title'>
                  {'Add Credentials'}
                </span>
                <p className='profile-page__content-empty-description'>
                  {'Explore credentials marketplace with different providers '}
                </p>
                <AppButton
                  className='profile-page__content-empty-button'
                  iconLeft={IconNames.Plus}
                  text={'New Proof'}
                  size='large'
                  modification='border-circle'
                  routePath={config.ROBOTORNOT_LINK}
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
