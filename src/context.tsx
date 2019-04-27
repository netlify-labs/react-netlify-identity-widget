import React from "react"
import { useNetlifyIdentity } from "react-netlify-identity"

export const IdentityContext = React.createContext<ReturnType<typeof useNetlifyIdentity> | undefined>(undefined) // not necessary but recommended

const { ctx, Provider } = createCtx<"login" | "signup">("login")

export const FormStateContext = ctx
export const FormStateContextProvider = Provider

function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  const defaultUpdate: UpdateType = () => defaultValue
  const ctx = React.createContext({ state: defaultValue, update: defaultUpdate })
  function Provider({ children }: { children: React.ReactNode }) {
    const [state, update] = React.useState(defaultValue)
    return <ctx.Provider value={{ state, update }}>{children}</ctx.Provider>
  }
  // return [ctx, Provider] as [typeof ctx, typeof Provider]
  return { ctx, Provider }
}
