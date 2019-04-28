import React from "react"
import {
  // Dialog,
  DialogOverlay,
  DialogContent
} from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"
import { Widget } from "./app"
import { FormStateContextProvider } from "./context"

import { useNetlifyIdentity } from "react-netlify-identity"

type ModalProps = {
  /** URL of your Netlify Instance with Identity enabled e.g. https://netlify-gotrue-in-react.netlify.com */
  netlifyInstance: string
  /** pass a boolean to be true or false */
  showDialog: boolean
  /** modal will call this function to set the state of showDialog to false */
  onCloseDialog: () => void
}

import { IdentityContextProvider, useIdentityContext as _useIdentityContext } from "./context"

export const useIdentityContext = _useIdentityContext
export function IdentityModal({ showDialog, onCloseDialog, netlifyInstance }: ModalProps) {
  if (!netlifyInstance) {
    // just a safety check in case a JS user tries to skip this
    if (!validateUrl(netlifyInstance))
      throw new Error(
        "invalid netlify instance URL: " +
          netlifyInstance +
          ". Please check the docs for proper usage or file an issue."
      )
  }
  const identity = useNetlifyIdentity(netlifyInstance)
  return (
    <DialogOverlay isOpen={showDialog}>
      <DialogContent
        style={{
          border: "solid 5px hsla(0, 0%, 0%, 0.5)",
          borderRadius: "10px",
          position: "relative",
          maxWidth: 364
        }}
      >
        <button className="btn btnClose" onClick={onCloseDialog}>
          <VisuallyHidden>Close</VisuallyHidden>
        </button>
        <FormStateContextProvider>
          <IdentityContextProvider value={identity}>
            <Widget onCloseDialog={onCloseDialog} />
          </IdentityContextProvider>
        </FormStateContextProvider>
      </DialogContent>
    </DialogOverlay>
  )
}
function validateUrl(value: string) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  )
}
