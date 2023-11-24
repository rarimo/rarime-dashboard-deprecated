import './styles.scss'

import { FC, HTMLAttributes } from 'react'

import { Icon } from '@/common'
import { IconNames } from '@/enums'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string
  message: string
  iconName?: IconNames
}

const ErrorMessage: FC<Props> = ({
  title,
  message,
  iconName = IconNames.ExclamationCircle,
  className = '',
  ...rest
}) => {
  return (
    <div className={`error-message ${className}`} {...rest}>
      <Icon className='error-message__img' name={iconName} />
      {title ? <h3 className='error-message__title'>{title}</h3> : <></>}
      <p className='error-message__message'>{message}</p>
    </div>
  )
}

export default ErrorMessage
