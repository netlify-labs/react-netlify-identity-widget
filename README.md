# React Netlify Identity Widget

> The easiest way to use [Netlify Identity](https://www.netlify.com/docs/identity/?utm_source=github&utm_medium=swyx-RNIW&utm_campaign=devex) with React, no login UI coding required!

This is a React port of https://github.com/netlify/netlify-identity-widget (48kb), taking the lightweight functionality of https://github.com/sw-yx/react-netlify-identity (4kb) and adding back the nicer UI with a focus on accessibility (with @reach UI) and bundle size (only 6kb as of writing).

## demo

the demo is hosted at: https://react-netlify-identity-widget.netlify.com (you can see [the deploy logs here](https://app.netlify.com/sites/react-netlify-identity-widget/deploys))

and the source is in `/examples`.

## Usage

we require some peer dependencies:

```bash
yarn add react-netlify-identity-widget @reach/dialog @reach/tabs @reach/visually-hidden
```

and the styles are optional but provided. here's how to use `IdentityModal, useIdentityContext, IdentityContextProvider`:

```tsx
import React from 'react'
import './App.css'
import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget'
import 'react-netlify-identity-widget/styles.css'

function App() {
  const url = 'https://your-identity-instance.netlify.com/' // supply the url of your Netlify site instance. VERY IMPORTANT. no point putting in env var since this is public anyway
  return (
    <IdentityContextProvider url={url}>
      <AuthStatusView />
    </IdentityContextProvider>
  )
}
export default App

function AuthStatusView() {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || 'NoName'
  const isLoggedIn = identity && identity.isLoggedIn
  return (
    <div>
      <div>
        <button className="RNIW_btn" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : 'Log In'}
        </button>
      </div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={(user) => console.log('hello ', user.user_metadata)}
        onSignup={(user) => console.log('welcome ', user.user_metadata)}
        onLogout={() => console.log('bye ', name)}
      />
    </div>
  )
}
```

You may also code split the Modal if you wish with `React.lazy` and `React.Suspense`.

## Blogposts

- [Add Netlify Identity Authentication to any React App in 5 minutes with React Context, Hooks and Suspense](https://dev.to/swyx/add-netlify-identity-authentication-to-any-react-app-in-5-minutes-with-react-context-hooks-and-suspense-5gci)

## Gatsby plugin

You may get a little help configuring RNIW for usage with Gatsby by using https://github.com/sw-yx/gatsby-plugin-netlify-identity. Read its README for more info.

## local dev

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
