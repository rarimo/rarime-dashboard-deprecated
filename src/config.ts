import { Chain } from '@distributedlab/w3p'
import mapKeys from 'lodash/mapKeys'
import pickBy from 'lodash/pickBy'

import FALLBACK_SUPPORTED_CHAINS from '@/assets/fallback-supported-chains.json'

import packageJson from '../package.json'

export type SUPPORTED_CHAINS = keyof typeof FALLBACK_SUPPORTED_CHAINS

export const config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,
  SUPPORTED_CHAINS_DETAILS: {
    ...FALLBACK_SUPPORTED_CHAINS,
    ...(import.meta.env.VITE_SUPPORTED_CHAINS_DETAILS &&
      JSON.parse(import.meta.env.VITE_SUPPORTED_CHAINS_DETAILS)),
  } as Record<keyof typeof FALLBACK_SUPPORTED_CHAINS, Chain>,
  DEFAULT_CHAIN: import.meta.env.VITE_DEFAULT_CHAIN as SUPPORTED_CHAINS,
  ROBOTORNOT_LINK: import.meta.env.VITE_ROBOTORNOT_LINK,
  CHROME_METAMASK_ADDON_LINK:
    'https://chrome.google.com/webstore/detail/metamask/',
  FIREFOX_METAMASK_ADDON_LINK:
    'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  OPERA_METAMASK_ADDON_LINK:
    'https://addons.opera.com/en/extensions/details/metamask-10/',
} as const

Object.assign(config, _mapEnvCfg(import.meta.env))
Object.assign(config, _mapEnvCfg(window.document.ENV))

function _mapEnvCfg(env: ImportMetaEnv | typeof window.document.ENV): {
  [k: string]: string | boolean | undefined
} {
  return mapKeys(
    pickBy(env, (v, k) => k.startsWith('VITE_APP_')),
    (v, k) => k.replace(/^VITE_APP_/, ''),
  )
}
