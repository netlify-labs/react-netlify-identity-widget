import React from "react"
import {
  Dialog
  // DialogOverlay, DialogContent
} from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"

import { Widget } from "./app"

import { FormStateContextProvider, SettingContext } from "./context"
import { ErrorBoundary } from "./errorBoundary"

import { Settings, useNetlifyIdentity as _useNetlifyIdentity } from "react-netlify-identity"

/** URL of your Netlify Instance with Identity enabled e.g. https://netlify-gotrue-in-react.netlify.com */

type ModalProps = {
  /** pass a boolean to be true or false */
  showDialog: boolean
  /** modal will call this function to set the state of showDialog to false */
  onCloseDialog: () => void
}

import {
  IdentityContextProvider as _IdentityContextProvider,
  useIdentityContext as _useIdentityContext,
  IdentityContext as _IdentityContext
} from "./context"

export const IdentityContextProvider = _IdentityContextProvider
export const useNetlifyIdentity = _useNetlifyIdentity
export const IdentityContext = _IdentityContext
export const useIdentityContext = _useIdentityContext
export default function IdentityModal({ showDialog, onCloseDialog }: ModalProps) {
  const { settings } = useIdentityContext()
  const [setting, setSetting] = React.useState<Settings | null>(null)
  React.useEffect(() => {
    settings().then(x => setSetting(x))
  }, [settings])
  return (
    <SettingContext.Provider value={setting}>
      <Dialog
        isOpen={showDialog}
        onDismiss={() => void console.log("hi") || onCloseDialog()}
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
        <FormStateContextProvider>
          <ErrorBoundary>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Widget onCloseDialog={onCloseDialog} />
            </React.Suspense>
          </ErrorBoundary>
        </FormStateContextProvider>
      </Dialog>
    </SettingContext.Provider>
  )
}
