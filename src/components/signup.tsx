import React from "react"

export function SignUp() {
  return (
    <div>
      <label>
        Name
        <input type="text" />
      </label>
      <label>
        Email
        <input type="email" />
      </label>
      <label>
        Password
        <input type="password" />
      </label>
      <button>Sign up</button>
    </div>
  )
}
