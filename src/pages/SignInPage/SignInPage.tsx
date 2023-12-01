import './styles.scss'

import { PROVIDERS } from '@distributedlab/w3p'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppButton, Icon } from '@/common'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/contexts'
import { IconNames, RoutesPaths } from '@/enums'

const SignInPage = () => {
  const navigate = useNavigate()
  const { init: initWeb3, provider } = useWeb3Context()
  const { connectOrInstallSnap } = useMetamaskZkpSnapContext()

  const connectWallet = async () => {
    await initWeb3(PROVIDERS.Metamask)
    await connectOrInstallSnap()
  }

  useEffect(() => {
    if (provider?.isConnected) {
      navigate(RoutesPaths.App)
    }
  }, [navigate, provider?.isConnected])

  return (
    <div className='sign-in-page'>
      <div className='sign-in-page__content'>
        <Icon
          width={88}
          height={88}
          className='sign-in-page__icon'
          name={IconNames.User}
        />
        <span className='sign-in-page__title'>{'Sign in'}</span>
        <p className='sign-in-page__description'>
          {
            'Manage your identity credentials and Soulbound Tokens (SBTs) easily from this dashboard'
          }
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
