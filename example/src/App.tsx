import React from 'react'
import './App.css'
import { IdentityModal, useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget'
import 'react-netlify-identity-widget/styles.css'

function App() {
  const url = process.env.REACT_APP_NETLIFY_IDENTITY_URL // should look something like "https://foo.netlify.com"
  if (!url)
    throw new Error(
      'process.env.REACT_APP_NETLIFY_IDENTITY_URL is blank2, which means you probably forgot to set it in your Netlify environment variables',
    )
  return (
    <IdentityContextProvider url={url}>
      <AuthStatusView />
    </IdentityContextProvider>
  )
}

// // code split the modal til you need it!
// const IdentityModal = React.lazy(() => import('react-netlify-identity-widget'))

function AuthStatusView() {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || 'NoName'
  const avatar_url = identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.avatar_url
  return (
    <div className="App">
      <header className="App-header">
        {identity && identity.isLoggedIn ? (
          <>
            <h1> hello {name}!</h1>
            {avatar_url && <img alt="user name" src={avatar_url} style={{ height: 100, borderRadius: '50%' }} />}
            <button className="btn" style={{ maxWidth: 400, background: 'orangered' }} onClick={() => setDialog(true)}>
              LOG OUT
            </button>
          </>
        ) : (
          <>
            <h1> hello! try logging in! </h1>
            <button className="btn" style={{ maxWidth: 400, background: 'darkgreen' }} onClick={() => setDialog(true)}>
              LOG IN
            </button>
          </>
        )}

        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user) => console.log('hello ', user!.user_metadata)}
          onSignup={(user) => console.log('welcome ', user!.user_metadata)}
          onLogout={() => console.log('bye ', name)}
        />

        <h3>
          Or{' '}
          <a
            href="https://github.com/sw-yx/react-netlify-identity-widget"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'powderblue' }}
          >
            view the source
          </a>
        </h3>
      </header>
    </div>
  )
}
export default App
