import React from "react"
import { Login } from "./components/login"
import { Logout } from "./components/logout"
import { Signup } from "./components/signup"
import { useIdentityContext } from "./context"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"

function LoggedOutScreen() {
  return (
    <div>
      <Tabs defaultIndex={0}>
        <TabList className="header">
          <Tab className="btn btnHeader ">Login</Tab>
          <Tab className="btn btnHeader ">Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* <div className="providersGroup">
        <hr className="hr" />
        <button className="providerGoogle btn btnProvider">Continue with Google</button>
        <button className="providerGitHub btn btnProvider">Continue with GitHub</button>
        <button className="providerGitLab btn btnProvider">Continue with GitLab</button>
        <button className="providerBitBucket btn btnProvider">Continue with BitBucket</button>
      </div> */}
    </div>
  )
}
function LoggedInScreen() {
  return <Logout />
}

function Gate({  }: { onCloseDialog: Function }) {
  const identity = useIdentityContext()
  console.log({ identity })
  const isLoggedIn = Boolean(identity && identity.user)
  return isLoggedIn ? <LoggedInScreen /> : <LoggedOutScreen />
}

export function Widget({ onCloseDialog }: { onCloseDialog: Function }) {
  return <Gate onCloseDialog={onCloseDialog} />
}

// renderProviders() {
//   const { store } = this.props

//   if (!(store.gotrue && store.settings)) {
//     return null
//   }
//   if (store.modal.page === "signup" && store.settings.disable_signup) {
//     return null
//   }
//   const page = pages[store.modal.page] || {}

//   if (!page.providers) {
//     return null
//   }

//   const providers = ["Google", "GitHub", "GitLab", "BitBucket", "SAML"].filter(
//     p => store.settings.external[p.toLowerCase()]
//   )

//   return providers.length ? (
//     <Providers
//       providers={providers}
//       labels={store.settings.external_labels || {}}
//       onLogin={this.handleExternalLogin}
//     />
//   ) : null
// }
