import React from "react"
import { useNetlifyIdentity } from "react-netlify-identity"
import { Settings } from "react-netlify-identity"
export const [useIdentityContext, IdentityContextProvider, IdentityContext] = createUsableCtx<
  ReturnType<typeof useNetlifyIdentity>
>()

export const SettingContext = React.createContext<Settings | null>(null)

export const [FormStateContext, FormStateContextProvider] = createMutableCtx<"login" | "signup">("login")

// utils

function createMutableCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  const defaultUpdate: UpdateType = () => defaultValue
  const ctx = React.createContext({ state: defaultValue, update: defaultUpdate })
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue)
    return <ctx.Provider value={{ state, update }} {...props} />
  }
  return [ctx, Provider] as const
}

function createUsableCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined)
  function useCtx() {
    const c = React.useContext(ctx)
    if (!c) throw new Error("useCtx must be inside a Provider with a value")
    return c
  }
  return [useCtx, ctx.Provider, ctx] as const
}
