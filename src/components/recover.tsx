import React from "react"

export function Recover() {
  return (
    <div>
      <label>
        Email
        <input type="email" />
      </label>
      <button>Send recovery email</button>
      <button type="button">Never Mind</button>
    </div>
  )
}
