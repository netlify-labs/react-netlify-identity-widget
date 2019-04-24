import React from "react"
import { IdentityContext } from "./context"
// import { User } from "react-netlify-identity"
import useLoading from "./useLoading"
// log in/sign up example

export function Login() {
  const identity = React.useContext(IdentityContext)
  if (!identity) throw new Error("invalid context")
  const { loginUser, signupUser } = identity
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
      <div>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <div>
        {isLoading && "loading..."}
        <input type="submit" value="Log in" />
        <button onClick={signup}>Sign Up </button>
        {msg && <pre>{msg}</pre>}
      </div>
    </form>
  )
}
