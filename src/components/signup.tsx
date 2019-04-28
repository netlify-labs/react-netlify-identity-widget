import React from "react"
import { useIdentityContext } from "../context"
import useLoading from "../useLoading"
import VisuallyHidden from "@reach/visually-hidden"

export function Signup() {
  const { signupUser } = useIdentityContext()
  const formRef = React.useRef<HTMLFormElement>(null)
  const [msg, setMsg] = React.useState("")
  const [isLoading, load] = useLoading()
  const signup = () => {
    if (!formRef.current) return
    const name = formRef.current.username.value
    const email = formRef.current.email.value
    const password = formRef.current.password.value
    const data = { signupSource: "react-netlify-identity-widget", name }
    load(signupUser(email, password, data))
      .then(user => {
        console.log("Success! Signed up", user)
        // navigate("/dashboard")
      })
      .catch(err => void console.error(err) || setMsg("Error: " + err.message))
  }
  return (
    <form
      ref={formRef}
      className="form"
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault()
        signup()
      }}
    >
      <div className="formGroup" key="username">
        <label>
          <VisuallyHidden>Enter your name</VisuallyHidden>
          <input
            id="username"
            className="formControl"
            type="name"
            name="username"
            placeholder="Name"
            autoCapitalize="off"
            required={true}
          />
          <div className="inputFieldIcon inputFieldName" />
        </label>
      </div>
      <div className="formGroup" key="email">
        <label>
          <VisuallyHidden>Enter your email</VisuallyHidden>
          <input
            id="email"
            className="formControl"
            type="email"
            name="email"
            placeholder="Email"
            autoCapitalize="off"
            required={true}
          />
          <div className="inputFieldIcon inputFieldEmail" />
        </label>
      </div>
      <div className="formGroup" key="password">
        <label>
          <VisuallyHidden>Enter your password</VisuallyHidden>
          <input
            id="password"
            className="formControl"
            type="password"
            name="password"
            placeholder="Password"
            required={true}
          />
          <div className="inputFieldIcon inputFieldPassword" />
        </label>
      </div>
      <div>
        <button type="submit" className={isLoading ? "btn saving" : "btn"}>
          Sign Up
        </button>
        {msg && <pre style={{ background: "salmon", padding: 10 }}>{msg}</pre>}
      </div>
    </form>
  )
}
