# React Netlify Identity Widget

This is a React port of https://github.com/netlify/netlify-identity-widget (48kb) taking the lightweight functionality https://github.com/sw-yx/react-netlify-identity (4kb) and adding back the nicer UI with a focus on accessibility (with @reach UI) and bundle size.

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
