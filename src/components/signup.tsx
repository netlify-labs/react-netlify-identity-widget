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
    const email = formRef.current.email.value
    const password = formRef.current.password.value
    const data = { signupSource: "react-netlify-identity-widget" }
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
      <div className="formGroup">
        <label>
          <VisuallyHidden>Enter your name</VisuallyHidden>
          <input
            className="formControl"
            type="name"
            name="name"
            placeholder="Name"
            autoCapitalize="off"
            required={true}
          />
          <div className="inputFieldIcon inputFieldName" />
        </label>
      </div>
      <div className="formGroup">
        <label>
          <VisuallyHidden>Enter your email</VisuallyHidden>
          <input
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
      <div className="formGroup">
        <label>
          <VisuallyHidden>Enter your password</VisuallyHidden>
          <input className="formControl" type="password" name="password" placeholder="Password" required={true} />
          <div className="inputFieldIcon inputFieldPassword" />
        </label>
      </div>

      <div>
        {isLoading && "loading..."}
        <button type="submit" className="btn">
          Sign Up
        </button>
        {msg && <pre>{msg}</pre>}
      </div>
    </form>
  )
}
