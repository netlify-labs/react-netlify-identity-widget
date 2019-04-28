# React Netlify Identity Widget

This is a React port of https://github.com/netlify/netlify-identity-widget (48kb) taking the lightweight functionality https://github.com/sw-yx/react-netlify-identity (4kb) and adding back the nicer UI with a focus on accessibility (with @reach UI) and bundle size.

# usage

we require some peer dependencies:

```bash
yarn add react-netlify-identity-widget @reach/dialog @reach/tabs @reach/visually-hidden
```

and the styles are optional but provided. here's how to use `IdentityModal, useNetlifyIdentity, IdentityContextProvider`:

```tsx
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
            <button className="btn" onClick={() => setDialog(true)}>
              LOG OUT
            </button>
            <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
          </header>
        ) : (
          <header className="App-header">
            <h1> hello! try logging in! </h1>
            <button className="btn" onClick={() => setDialog(true)}>
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
```

# local dev

```bash
yarn
yarn build
yarn link
cd example
yarn && yarn link "react-netlify-identity"
yarn start # to see the example run
```

# tsdx bug

we use https://github.com/ds300/patch-package to patch this bug https://github.com/jaredpalmer/tsdx/issues/36
