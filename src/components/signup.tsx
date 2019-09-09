import React from 'react'
import { User, useIdentityContext } from 'react-netlify-identity'
import useLoading from '../useLoading'
import VisuallyHidden from '@reach/visually-hidden'

type SignupProps = {
  onSignup?: (user?: User) => void
}
export function Signup({ onSignup }: SignupProps) {
  const { signupUser } = useIdentityContext()
  const formRef = React.useRef<HTMLFormElement>(null)
  const [msg, setMsg] = React.useState('')
  const [isLoading, load] = useLoading()
  const signup = () => {
    if (!formRef.current) return
    const full_name = formRef.current.username.value
    const email = formRef.current.email.value
    const password = formRef.current.password.value
    const data = { signupSource: 'react-netlify-identity-widget', full_name }
    load(signupUser(email, password, data))
      .then((user) => {
        if (process.env.NODE_ENV !== 'production') console.log('Success! Signed up', user)
        if (onSignup) onSignup(user)
      })
      .catch((err) => void console.error(err) || setMsg('Error: ' + err.message))
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
          <input className="formControl" type="password" name="password" placeholder="Password" required={true} />
          <div className="inputFieldIcon inputFieldPassword" />
        </label>
      </div>
      <div>
        <button type="submit" className={isLoading ? 'btn saving' : 'btn'}>
          Sign Up
        </button>
        {msg && <pre style={{ background: 'salmon', padding: 10 }}>{msg}</pre>}
      </div>
    </form>
  )
}
