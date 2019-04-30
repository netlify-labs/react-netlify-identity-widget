import React from "react"
import { useIdentityContext, SettingContext } from "../context"
import { Settings } from "react-netlify-identity"



const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function Providers() {
  const setting = React.useContext(SettingContext)
  const hasProviders =
    setting &&
    setting.external &&
    Object.entries(setting.external).some(([k, v]) => ["github", "gitlab", "bitbucket", "google"].includes(k) && v)
  if (!hasProviders) return null
  return (
    <div className="providersGroup">
      {isLocalhost && <pre>⚠️Testing providers on localhost won't work because OAuth redirects to your production site</pre>}
      <hr className="hr" />
      <ProviderButton setting={setting} provider="Google" />
      <ProviderButton setting={setting} provider="GitHub" />
      <ProviderButton setting={setting} provider="GitLab" />
      <ProviderButton setting={setting} provider="Bitbucket" />
    </div>
  )
}

interface Dict<T> {
  [id: string]: T
}
function ProviderButton({ setting, provider }: { setting: Settings | null; provider: string }) {
  if (!setting) return null
  const ext = setting.external as Dict<{}>
  if (!ext[provider.toLowerCase()]) return null
  const { loginProvider } = useIdentityContext()
  const click = () => loginProvider(provider.toLowerCase() as "github" | "gitlab" | "bitbucket" | "google")
  return (
    <button onClick={click} className={`provider${provider} btn btnProvider`}>
      Continue with {provider}
    </button>
  )
}
