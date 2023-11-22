import './styles.scss'

import { W3CCredential } from '@rarimo/rarime-connector'
import { FC, HTMLAttributes } from 'react'

import { Icon } from '@/common'
import { CREDENTIALS_NAMES, ICON_NAMES } from '@/enums'

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
          name={ICON_NAMES.proof}
        />
        <h3 className='credential-tile__content-title'>
          {CREDENTIALS_NAMES[
            String(
              credential.credentialSubject.type,
            ) as keyof typeof CREDENTIALS_NAMES
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
              name={ICON_NAMES.calendar}
              className='credential-tile__footer-icon'
            />
            <p className='credential-tile__footer-date_text'>
              {'Exp:' + ' ' + credential.expirationDate}
            </p>
          </div>
        )}
        <div className='credential-tile__footer-provider'>
          <Icon
            width={16}
            height={16}
            className='credential-tile__footer-provider_icon'
            name={
              ICON_NAMES[
                String(
                  credential.credentialSubject.provider,
                ) as keyof typeof ICON_NAMES
              ]
            }
          />
          <p className='credential-tile__footer-provider_name'>
            {String(credential.credentialSubject.provider)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CredentialsTile
