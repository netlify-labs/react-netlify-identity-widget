import React from "react"
import { Login } from "./components/login"
import { Logout } from "./components/logout"
import { Signup } from "./components/signup"
import { useIdentityContext } from "./context"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"

import { Providers } from "./components/providers"
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

export default function Widget({ onCloseDialog }: { onCloseDialog: Function }) {
  return <Gate onCloseDialog={onCloseDialog} />
}
