import React from 'react'
import { useIdentityContext } from 'react-netlify-identity'
import useLoading from '../useLoading'

type LogoutProps = {
  onLogout?: () => void
}

export function Logout({ onLogout }: LogoutProps) {
  const identity = useIdentityContext()
  const [msg, setMsg] = React.useState('')
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || 'NoName'

  const [isLoading, load] = useLoading()
  const logout = () =>
    load(identity.logoutUser())
      .then(() => {
        if (onLogout) onLogout()
      })
      .catch((err) => void console.error(err) || setMsg('Error: ' + err.message))
  return (
    <>
      <div className="header">
        <button className="btn btnHeader active">Logged in</button>
      </div>
      <form className="form ">
        <p className="infoText">
          Logged in as <br />
          <span className="infoTextEmail">{name}</span>
        </p>
        <button type="submit" className={isLoading ? 'btn saving' : 'btn'} onClick={logout}>
          Log out
        </button>
        {msg && <pre style={{ background: 'salmon', padding: 10 }}>{msg}</pre>}
      </form>
    </>
  )
}
