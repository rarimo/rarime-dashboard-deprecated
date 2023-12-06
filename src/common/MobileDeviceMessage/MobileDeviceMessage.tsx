import './styles.scss'

import { useTranslation } from 'react-i18next'

import { Icon } from '@/common'
import { IconNames } from '@/enums'

const MobileDeviceMessage = () => {
  const { t } = useTranslation()
  return (
    <div
      key={'mobile-device__error-mobile-component'}
      className='mobile-device'
    >
      <div className='mobile-device__icon-wrp'>
        <Icon className='mobile-device__icon' name={IconNames.DeviceMobile} />
      </div>
      <h4 className='mobile-device__title'>
        {t('mobile-device-message.title')}
      </h4>
      <span className='mobile-device__subtitle'>
        {t(`mobile-device-message.description`)}
      </span>
    </div>
  )
}

export default MobileDeviceMessage
