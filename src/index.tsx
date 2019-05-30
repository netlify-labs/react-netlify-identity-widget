import React from "react"
import {
  Dialog
  // DialogOverlay, DialogContent
} from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"

import { Widget } from "./app"

import { ErrorBoundary } from "./errorBoundary"

import {
  IdentityContextProvider as _IdentityContextProvider,
  useIdentityContext as _useIdentityContext
} from "react-netlify-identity"
export { User, Settings, ReactNetlifyIdentityAPI, useNetlifyIdentity } from "react-netlify-identity"

/** URL of your Netlify Instance with Identity enabled e.g. https://netlify-gotrue-in-react.netlify.com */

type ModalProps = {
  /** pass a boolean to be true or false */
  showDialog: boolean
  /** modal will call this function to set the state of showDialog to false */
  onCloseDialog: () => void
}

export const IdentityContextProvider = _IdentityContextProvider
export const useIdentityContext = _useIdentityContext
export function IdentityModal({ showDialog, onCloseDialog }: ModalProps) {
  return (
    <Dialog
      isOpen={showDialog}
      onDismiss={onCloseDialog}
      style={{
        border: "solid 5px hsla(0, 0%, 0%, 0.5)",
        borderRadius: "10px",
        position: "relative",
        maxWidth: 400
      }}
    >
      <button className="btn btnClose" onClick={onCloseDialog}>
        <VisuallyHidden>Close</VisuallyHidden>
      </button>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Widget onCloseDialog={onCloseDialog} />
        </React.Suspense>
      </ErrorBoundary>
    </Dialog>
  )
}
export default IdentityModal
