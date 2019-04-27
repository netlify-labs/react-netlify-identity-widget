import React from "react"

export function LogIn() {
  return (
    <div>
      <label>
        Email
        <input type="email" />
      </label>
      <label>
        Password
        <input type="password" />
      </label>
      <button>Login</button>
      <button type="button">Forgot Password</button>
    </div>
  )
}
