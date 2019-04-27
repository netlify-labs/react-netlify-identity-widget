import React from "react"
import { IdentityContext } from "../context"

export function Logout() {
  const identity = React.useContext(IdentityContext)
  if (!identity) throw new Error("bad context")

  return (
    <>
      <div className="header">
        <button className="btn btnHeader active">Logged in</button>
      </div>
      <form className="form ">
        <p className="infoText">
          Logged in as <br />
          <span className="infoTextEmail">Shawn Wang</span>
        </p>
        <button type="submit" className="btn">
          Log out
        </button>
      </form>
    </>
  )
}
