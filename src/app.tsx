import React from "react"
import { Login } from "./components/login"
import { Logout } from "./components/logout"
import { Signup } from "./components/signup"
import { useIdentityContext } from "react-netlify-identity"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"

import { Providers } from "./components/providers"
function LoggedOutScreen() {
  return (
    <div>
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
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
      <Providers />
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
