import './styles.scss'

import { config } from '@config'
import { PROVIDERS } from '@distributedlab/w3p'
import get from 'lodash/get'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AppButton, Icon } from '@/common'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/contexts'
import { IconNames, RoutesPaths } from '@/enums'

const SignInPage = () => {
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { init: initWeb3, provider } = useWeb3Context()
  const { connectOrInstallSnap, checkSnapExists, isMetamaskInstalled } =
    useMetamaskZkpSnapContext()

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

  const installMMLink = useMemo(() => {
    if (isMetamaskInstalled) return ''

    const browserExtensionsLinks = {
      chrome: config.CHROME_METAMASK_ADDON_LINK,
      opera: config.OPERA_METAMASK_ADDON_LINK,
      firefox: config.FIREFOX_METAMASK_ADDON_LINK,
    }

    // Get the user-agent string
    const userAgentString = navigator.userAgent

    let chromeAgent = userAgentString.indexOf('Chrome') > -1 ? 'chrome' : ''
    const firefoxAgent =
      userAgentString.indexOf('Firefox') > -1 ? 'firefox' : ''
    const operaAgent = userAgentString.indexOf('OP') > -1 ? 'opera' : ''

    // Discard Chrome since it also matches Opera
    if (chromeAgent && operaAgent) chromeAgent = ''

    const currentBrowser = chromeAgent || firefoxAgent || operaAgent || ''

    if (!currentBrowser) return config.OTHER_BROWSER_METAMASK_LINK

    return get(browserExtensionsLinks, currentBrowser, '')
  }, [isMetamaskInstalled])

  const openInstallMetamaskLink = useCallback(() => {
    if (!installMMLink) return

    setIsPending(true)

    window.open(installMMLink, '_blank', 'noopener noreferrer')
  }, [installMMLink])

  useEffect(() => {
    redirectToProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <div className='sign-in-page'>
      <div className='sign-in-page__backdrop' />
      <div className='sign-in-page__logo-wrapper'>
        <img
          className='sign-in-page__logo'
          src='/branding/logo-sign-in.svg'
          alt={config.APP_NAME}
        />
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
        {isMetamaskInstalled ? (
          <AppButton
            className='sign-in-page__button'
            iconLeft={IconNames.Metamask}
            text={'Connect Metamask'}
            modification='border-circle'
            onClick={connectWallet}
          />
        ) : (
          <AppButton
            iconLeft={IconNames.Metamask}
            className='sign-in-page__button'
            text={isPending ? `Please, reload page` : `Install metamask`}
            modification='border-circle'
            onClick={openInstallMetamaskLink}
            target='_blank'
            rel='noopener noreferrer'
            isDisabled={isPending}
          />
        )}
      </div>
    </div>
  )
}

export default SignInPage
