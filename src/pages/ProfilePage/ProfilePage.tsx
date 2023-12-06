import './styles.scss'

import { config } from '@config'
import { W3CCredential } from '@rarimo/rarime-connector'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
        <div className='profile-page__header'>
          <h1 className='profile-page__title'>{t('profile-page.title')}</h1>
          <p className='profile-page__description'>
            {t('profile-page.description')}
          </p>
        </div>
        <div className='profile-page__content-wrapper'>
          <Sidebar credentials={credentials ?? []} />
          <div className='profile-page__content'>
            {credentials.length ? (
              <>
                <div className='profile-page__content-header'>
                  <h2 className='profile-page__content-title'>
                    {credentials.length + ' ' + t('profile-page.credential')}
                  </h2>
                  <div className='profile-page__content-actions'>
                    <AppButton
                      className='profile-page__content-actions-add'
                      text={'Add'}
                      scheme='filled'
                      size='medium'
                      modification='border-circle'
                      iconLeft={IconNames.Plus}
                      routePath={config.ROBOTORNOT_LINK}
                    />
                  </div>
                </div>
                <div className='profile-page__content-tiles'>
                  {credentials.map((credential, idx) => (
                    <CredentialsTile key={idx} credential={credential} />
                  ))}
                </div>
              </>
            ) : (
              <div className='profile-page__content-empty'>
                <Icon
                  width={88}
                  height={88}
                  className='profile-page__content-empty-icon'
                  name={IconNames.PlusInCircle}
                />
                <span className='profile-page__content-empty-title'>
                  {t('profile-page.title')}
                </span>
                <p className='profile-page__content-empty-description'>
                  {t('profile-page.description')}
                </p>
                <AppButton
                  className='profile-page__content-empty-button'
                  iconLeft={IconNames.Plus}
                  text={'Add'}
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
