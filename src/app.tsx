import React from "react"
import { Login } from "./components/login"
import { Logout } from "./components/logout"
import { Signup } from "./components/signup"
import { useIdentityContext } from "./context"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
// const pagesWithHeader = { login: true, signup: true }
// const pages = {
//   login: {
//     login: true,
//     button: "Log in",
//     button_saving: "Logging in",
//     email: true,
//     password: true,
//     link: "amnesia",
//     link_text: "Forgot password?",
//     providers: true
//   },
//   signup: {
//     signup: true,
//     button: "Sign up",
//     button_saving: "Signing Up",
//     name: true,
//     email: true,
//     password: true,
//     providers: true
//   },
//   amnesia: {
//     title: "Recover password",
//     button: "Send recovery email",
//     button_saving: "Sending recovery email",
//     email: true,
//     link: "login",
//     link_text: "Never mind"
//   },
//   recovery: {
//     title: "Recover password",
//     button: "Update password",
//     button_saving: "Updating password",
//     password: true,
//     link: "login",
//     link_text: "Never mind"
//   },
//   invite: {
//     title: "Complete your signup",
//     button: "Sign up",
//     button_saving: "Signing Up",
//     password: true,
//     providers: true
//   },
//   user: {
//     title: "Logged in"
//   }
// }

function LoggedOutScreen() {
  // return
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

      <div className="providersGroup">
        <hr className="hr" />
        <button className="providerGoogle btn btnProvider">Continue with Google</button>
        <button className="providerGitHub btn btnProvider">Continue with GitHub</button>
        <button className="providerGitLab btn btnProvider">Continue with GitLab</button>
        <button className="providerBitBucket btn btnProvider">Continue with BitBucket</button>
      </div>

      {/* <form className="form ">
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">Enter your email</span>
              <input
                className="formControl"
                type="email"
                name="email"
                placeholder="Email"
                autocapitalize="off"
                required=""
              />
              <div className="inputFieldIcon inputFieldEmail" />
            </label>
          </div>
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">Enter your password</span>
              <input className="formControl" type="password" name="password" placeholder="Password" required="" />
              <div className="inputFieldIcon inputFieldPassword" />
            </label>
          </div>
          <button type="submit" className="btn">
            Log in
          </button>
        </form>
        <button className="btnLink forgotPasswordLink">Forgot password?</button>
         */}
    </div>
  )
}
function LoggedInScreen() {
  return <Logout />
}

function Gate({  }: { onCloseDialog: Function }) {
  const identity = useIdentityContext()
  const isLoggedIn = Boolean(identity && identity.user)
  return isLoggedIn ? <LoggedInScreen /> : <LoggedOutScreen />
}

export function Widget({ onCloseDialog }: { onCloseDialog: Function }) {
  return <Gate onCloseDialog={onCloseDialog} />
}

// renderBody() {
//   const { store } = this.props
//   const page = pages[store.modal.page] || {}
//   const pageLinkHandler = () => this.handlePage(page.link)

//   if (!store.gotrue) {
//     return <SiteURLForm onSiteURL={this.handleSiteURL} />
//   }
//   if (!store.settings) {
//     return
//   }
//   if (store.user) {
//     return <LogoutForm user={store.user} saving={store.saving} onLogout={this.handleLogout} />
//   }
//   if (store.modal.page === "signup" && store.settings.disable_signup) {
//     return <Message type="signup_disabled" />
//   }

//   return (
//     <div>
//       <UserForm
//         page={pages[store.modal.page] || {}}
//         message={store.message}
//         saving={store.saving}
//         onSubmit={this.handleUser}
//         namePlaceholder={store.namePlaceholder}
//       />
//       {!store.user && page.link && store.gotrue && (
//         <button onclick={pageLinkHandler} className="btnLink forgotPasswordLink">
//           {page.link_text}
//         </button>
//       )}
//       <SiteURLForm devMode="true" onSiteURL={this.clearSiteURL} />
//     </div>
//   )
// }

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
