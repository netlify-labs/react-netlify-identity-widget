import React from "react"
import { useIdentityContext } from "../context"
import useLoading from "../useLoading"
import VisuallyHidden from "@reach/visually-hidden"

export function Login() {
  const { loginUser } = useIdentityContext()
  const formRef = React.useRef<HTMLFormElement>(null)
  const [msg, setMsg] = React.useState("")
  const [isLoading, load] = useLoading()
  // const signup = () => {
  //   if (!formRef.current) return
  //   const email = formRef.current.email.value
  //   const password = formRef.current.password.value
  //   const data = { signupSource: "react-netlify-identity-widget" }
  //   load(signupUser(email, password, data))
  //     .then(user => {
  //       console.log("Success! Signed up", user)
  //       // navigate("/dashboard")
  //     })
  //     .catch(err => void console.error(err) || setMsg("Error: " + err.message))
  // }
  return (
    <form
      ref={formRef}
      className="form"
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & { email: { value: string }; password: { value: string } }
        const email = target.email.value
        const password = target.password.value
        load(loginUser(email, password, true))
          .then(user => {
            console.log("Success! Logged in", user)
            // navigate("/dashboard")
          })
          .catch(err => void console.error(err) || setMsg("Error: " + err.message))
      }}
    >
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
          Log in
        </button>
        {msg && <pre style={{ background: "salmon", padding: 10 }}>{msg}</pre>}
      </div>
      <button type="button" className="btnLink forgotPasswordLink">
        Forgot password?
      </button>
    </form>
  )
}
