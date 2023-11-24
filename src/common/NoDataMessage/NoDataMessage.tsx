import './styles.scss'

import { FC, HTMLAttributes } from 'react'

import { Icon } from '@/common'
import { IconNames } from '@/enums'

interface Props extends HTMLAttributes<HTMLDivElement> {
  message: string
  iconName?: IconNames
}

const NoDataMessage: FC<Props> = ({
  message,
  iconName = IconNames.Archive,
  className = '',
  ...rest
}) => {
  return (
    <div className={`no-data-message ${className}`} {...rest}>
      <Icon className='no-data-message__img' name={iconName} />
      <span className='no-data-message__message'>{message}</span>
    </div>
  )
}

export default NoDataMessage
