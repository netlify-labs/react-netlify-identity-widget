import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { IdentityModal, useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

function App() {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext
  console.log("login status can be used anywhere in app", identity)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={() => setDialog(true)}>open modal</button>
        <IdentityModal
          netlifyInstance="https://netlify-gotrue-in-react.netlify.com"
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
        />
      </header>
    </div>
  )
}

export default App
