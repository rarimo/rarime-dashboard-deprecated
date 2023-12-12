import './styles.scss'

import { PROVIDERS } from '@distributedlab/w3p'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AppButton, Icon } from '@/common'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/contexts'
import { IconNames, RoutesPaths } from '@/enums'
import {config} from "@config";

const SignInPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { init: initWeb3, provider } = useWeb3Context()
  const { connectOrInstallSnap, checkSnapExists } = useMetamaskZkpSnapContext()

  const connectWallet = async () => {
    await initWeb3(PROVIDERS.Metamask)
    await connectOrInstallSnap()
    navigate(RoutesPaths.Profiles)
  }

  const redirectToProfiles = async () => {
    if (provider?.address && (await checkSnapExists())) {
      navigate(RoutesPaths.Profiles)
    }
  }

  useEffect(() => {
    redirectToProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <div className='sign-in-page'>
      <div className='sign-in-page__logo-wrapper'>
        <img className='sign-in-page__logo' src='/branding/logo-sign-in.svg' alt={config.APP_NAME} />
      </div>
      <div className='sign-in-page__content'>
        <Icon
          width={88}
          height={88}
          className='sign-in-page__icon'
          name={IconNames.User}
        />
        <span className='sign-in-page__title'>{t('sign-in-page.title')}</span>
        <p className='sign-in-page__description'>
          {t('sign-in-page.description')}
        </p>
        <AppButton
          className='sign-in-page__button'
          iconLeft={IconNames.Metamask}
          text={'Connect Metamask'}
          modification='border-circle'
          onClick={connectWallet}
        />
      </div>
    </div>
  )
}

export default SignInPage
