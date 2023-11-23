import type { IconNames } from '@/enums'
import {CredentialsNames} from "@/enums";

export type NotificationObjectPayload = {
  title?: string
  message: string
  iconName?: IconNames // FIXME
}

export type NotificationPayload = string | NotificationObjectPayload

export type IconNamesType = keyof typeof IconNames

export type CredentialsNamesType = keyof typeof CredentialsNames
