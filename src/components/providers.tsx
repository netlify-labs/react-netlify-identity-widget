import React from 'react'
import { Settings, useIdentityContext } from 'react-netlify-identity'

export function Providers() {
  const { settings } = useIdentityContext()
  const hasProviders = Object.entries(settings.external).some(
    ([k, v]) => ['github', 'gitlab', 'bitbucket', 'google'].includes(k) && v,
  )
  if (!hasProviders) return null
  let isLocalhost = false
  if (typeof window !== 'undefined') {
    isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
    )
  }
  return (
    <div className="providersGroup">
      {isLocalhost && (
        <pre>⚠️Testing providers on localhost won't work because OAuth redirects to your production site</pre>
      )}
      <hr className="RNIW_hr" />
      <ProviderButton settings={settings} provider="Google" />
      <ProviderButton settings={settings} provider="GitHub" />
      <ProviderButton settings={settings} provider="GitLab" />
      <ProviderButton settings={settings} provider="Bitbucket" />
    </div>
  )
}

interface Dict<T> {
  [id: string]: T
}
function ProviderButton({ settings, provider }: { settings: Settings; provider: string }) {
  const ext = settings.external as Dict<{}>
  if (!ext[provider.toLowerCase()]) return null
  const { loginProvider } = useIdentityContext()
  const click = () => loginProvider(provider.toLowerCase() as 'github' | 'gitlab' | 'bitbucket' | 'google')
  return (
    <button onClick={click} className={`provider${provider} RNIW_btn RNIW_btnProvider`}>
      Continue with {provider}
    </button>
  )
}
