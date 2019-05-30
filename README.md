# React Netlify Identity Widget

This is a React port of https://github.com/netlify/netlify-identity-widget (48kb), taking the lightweight functionality of https://github.com/sw-yx/react-netlify-identity (4kb) and adding back the nicer UI with a focus on accessibility (with @reach UI) and bundle size (only 6kb as of writing).

# demo

the demo is hosted at: https://react-netlify-identity-widget.netlify.com (you can see [the deploy logs here](https://app.netlify.com/sites/react-netlify-identity-widget/deploys))

and the source is in `/examples`.

# usage

we require some peer dependencies:

```bash
yarn add react-netlify-identity-widget @reach/dialog @reach/tabs @reach/visually-hidden
```

and the styles are optional but provided. here's how to use `IdentityModal, useNetlifyIdentity, IdentityContextProvider`:

```tsx
import React from "react"
import "./App.css"
import { useIdentityContext, IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

function App() {
  const url = process.env.REACT_APP_NETLIFY_URL // supply the url of your Netlify site instance. VERY IMPORTANT
  return (
    <IdentityContextProvider value={identity}>
      <AuthStatusView />
    </IdentityContextProvider>
  )
}
export default App

// code split the modal til you need it!
const IdentityModal = React.lazy(() => import("react-netlify-identity-widget"))

function AuthStatusView() {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName"
  return (
    <div className="App">
      {identity && identity.isLoggedIn ? (
        <header className="App-header">
          <h1> hello {name}!</h1>
          <button className="btn" onClick={() => setDialog(true)}>
            LOG OUT
          </button>
        </header>
      ) : (
        <header className="App-header">
          <h1> hello! try logging in! </h1>
          <button className="btn" onClick={() => setDialog(true)}>
            LOG IN
          </button>
        </header>
      )}
      <React.Suspense fallback="loading...">
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </React.Suspense>
    </div>
  )
}
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

## List of Alternatives

**Lowest level JS Library**: If you want to use the official Javascript bindings to GoTrue, Netlify's underlying Identity service written in Go, use https://github.com/netlify/gotrue-js

**React bindings**: If you want a thin wrapper over Gotrue-js for React, `react-netlify-identity` is a "headless" library, meaning there is no UI exported and you will write your own UI to work with the authentication. https://github.com/sw-yx/react-netlify-identity. If you want a drop-in UI, there is yet another library that wraps `react-netlify-identity`: https://github.com/sw-yx/react-netlify-identity-widget

**High level overlay**: If you want a "widget" overlay that gives you a nice UI out of the box, with a somewhat larger bundle, check https://github.com/netlify/netlify-identity-widget

**High level popup**: If you want a popup window approach also with a nice UI out of the box, and don't mind the popup flow, check https://github.com/netlify/netlify-auth-providers
