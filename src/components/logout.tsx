import React from "react"
import { useIdentityContext } from "../context"
import useLoading from "../useLoading"

export function Logout() {
  const identity = useIdentityContext()
  const [isLoading, load] = useLoading()
  const logout = () => load(identity.logoutUser())
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
        <button type="submit" className={isLoading ? "btn saving" : "btn"} onClick={logout}>
          Log out
        </button>
      </form>
    </>
  )
}
