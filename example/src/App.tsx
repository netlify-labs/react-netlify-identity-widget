import React from "react"
import "./App.css"
import { IdentityModal, useNetlifyIdentity, IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

function App() {
  const [dialog, setDialog] = React.useState(false)
  const identity = useNetlifyIdentity("https://netlify-gotrue-in-react.netlify.com")
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName"
  return (
    <IdentityContextProvider value={identity}>
      <div className="App">
        {identity && identity.isLoggedIn ? (
          <header className="App-header">
            <h1> hello {name}!</h1>
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
      </div>
    </IdentityContextProvider>
  )
}

export default App
