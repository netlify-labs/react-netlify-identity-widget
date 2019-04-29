import React from "react"
import "./App.css"
import { IdentityModal, useNetlifyIdentity, IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

function App() {
  const [dialog, setDialog] = React.useState(false)
  const identity = useNetlifyIdentity("https://react-netlify-identity-widget.netlify.com")
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "NoName"
  const avatar_url = identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.avatar_url
  return (
    <IdentityContextProvider value={identity}>
      <div className="App">
        {identity && identity.isLoggedIn ? (
          <header className="App-header">
            <h1> hello {name}!</h1>
            {avatar_url && <img src={avatar_url} style={{ height: 100, borderRadius: "50%" }} />}
            <button className="btn" style={{ maxWidth: 400, background: "orangered" }} onClick={() => setDialog(true)}>
              LOG OUT
            </button>

            <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
          </header>
        ) : (
          <header className="App-header">
            <h1> hello! try logging in! </h1>
            <button className="btn" style={{ maxWidth: 400, background: "darkgreen" }} onClick={() => setDialog(true)}>
              LOG IN
            </button>
            <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
          </header>
        )}
        <h3>
          Or{" "}
          <a
            href="https://github.com/sw-yx/react-netlify-identity-widget"
            target="_blank"
            style={{ color: "powderblue" }}
          >
            view the source
          </a>
        </h3>
      </div>
    </IdentityContextProvider>
  )
}

export default App
