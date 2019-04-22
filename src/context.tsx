import React from "react"
import { useNetlifyIdentity } from "react-netlify-identity"

export const IdentityContext = React.createContext<ReturnType<typeof useNetlifyIdentity> | undefined>(undefined) // not necessary but recommended
