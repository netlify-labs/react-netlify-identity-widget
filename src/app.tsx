import React from 'react'
import { Login } from './components/login'
import { Logout } from './components/logout'
import { Signup } from './components/signup'
import { User, useIdentityContext } from 'react-netlify-identity'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

import { Providers } from './components/providers'
export type AuthProps = {
  onLogin?: (user?: User) => void
  onSignup?: (user?: User) => void
  onLogout?: () => void
}
function LoggedOutScreen(props: AuthProps) {
  return (
    <div>
      <Tabs defaultIndex={0}>
        <TabList className="RNIW_header">
          <Tab className="RNIW_btn RNIW_btnHeader">Login</Tab>
          <Tab className="RNIW_btn RNIW_btnHeader">Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Login onLogin={props.onLogin} />
          </TabPanel>
          <TabPanel>
            <Signup onSignup={props.onSignup} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Providers />
    </div>
  )
}

function LoggedInScreen(props: AuthProps) {
  return <Logout onLogout={props.onLogout} />
}

export function Widget(props: AuthProps) {
  const identity = useIdentityContext()
  const isLoggedIn = Boolean(identity && identity.user)
  return isLoggedIn ? <LoggedInScreen {...props} /> : <LoggedOutScreen {...props} />
}
