import React from "react"
import { useIdentityContext } from "../context"

export function Logout() {
  const identity = useIdentityContext()
  console.log({ identity })
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
