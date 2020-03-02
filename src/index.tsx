import React from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { Widget, AuthProps } from './app'

import {
  IdentityContextProvider as _IdentityContextProvider,
  useIdentityContext as _useIdentityContext,
} from 'react-netlify-identity'
export { User, Settings, ReactNetlifyIdentityAPI, useNetlifyIdentity } from 'react-netlify-identity'

/** URL of your Netlify Instance with Identity enabled e.g. https://netlify-gotrue-in-react.netlify.com */

type ModalProps = {
  /** pass a boolean to be true or false */
  showDialog: boolean
  /** modal will call this function to set the state of showDialog to false */
  onCloseDialog?: () => void
} & AuthProps

export const IdentityContextProvider = _IdentityContextProvider
export const useIdentityContext = _useIdentityContext
export function IdentityModal({ showDialog, onCloseDialog, ...authprops }: ModalProps) {
  return (
    <Dialog
      role="dialog"
      aria-modal="true"
      aria-label="Login Modal"
      isOpen={showDialog}
      onDismiss={onCloseDialog}
      style={{
        border: 'solid 5px hsla(0, 0%, 0%, 0.5)',
        borderRadius: '10px',
        position: 'relative',
        maxWidth: 400,
      }}
    >
      <button className="RNIW_btn RNIW_btnClose" onClick={onCloseDialog}>
        <VisuallyHidden>Close</VisuallyHidden>
      </button>
      <Widget {...authprops} />
    </Dialog>
  )
}
export default IdentityModal
