import React from "react"
import { IdentityContext } from "./context"

export function Logout() {
  const identity = React.useContext(IdentityContext)
  if (!identity) throw new Error("bad context")

  return <button onClick={identity.logoutUser}>You are signed in. Log Out</button>
}
