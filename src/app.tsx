import React from "react"
import { Login } from "./components/login"
import { Logout } from "./components/logout"
import { Signup } from "./components/signup"
import { useIdentityContext } from "./context"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import { Settings } from "react-netlify-identity"
import { Providers } from "./components/providers"
function LoggedOutScreen() {
  const { settings } = useIdentityContext()
  const [setting, setSetting] = React.useState<Settings | null>(null)
  React.useEffect(() => {
    settings().then(x => setSetting(x))
  }, [settings])
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
      <Providers setting={setting} />
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
