import './styles.scss'

import { W3CCredential } from '@rarimo/rarime-connector'
import { FC, HTMLAttributes } from 'react'

import { Icon } from '@/common'
import { CredentialsNames, IconNames } from '@/enums'
import { CredentialsNamesType, IconNamesType } from '@/types'

type Props = {
  credential: W3CCredential
} & HTMLAttributes<HTMLDivElement>

const CredentialsTile: FC<Props> = ({ credential }) => {
  return (
    <div className='credential-tile'>
      <div className='credential-tile__content'>
        <Icon
          className='credential-tile__content-icon'
          width='40'
          height='40'
          name={IconNames.Proof}
        />
        <h3 className='credential-tile__content-title'>
          {CredentialsNames[
            String(credential.credentialSubject.type) as CredentialsNamesType
          ] ?? credential.credentialSubject.type}
        </h3>
        {/*Todo: add subtitle*/}
        <p className='credential-tile__content-subtitle'>{'subtitle'}</p>
      </div>
      <div className='credential-tile__footer'>
        {credential.expirationDate && (
          <div className='credential-tile__footer-date'>
            <Icon
              width={16}
              height={16}
              name={IconNames.Calendar}
              className='credential-tile__footer-icon'
            />
            <p className='credential-tile__footer-date-text'>
              {'Exp:' + ' ' + credential.expirationDate}
            </p>
          </div>
        )}
        <div className='credential-tile__footer-provider'>
          <Icon
            width={16}
            height={16}
            className='credential-tile__footer-provider-icon'
            name={
              IconNames[
                String(credential.credentialSubject.provider) as IconNamesType
              ]
            }
          />
          <p className='credential-tile__footer-provider-name'>
            {String(credential.credentialSubject.provider)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CredentialsTile
