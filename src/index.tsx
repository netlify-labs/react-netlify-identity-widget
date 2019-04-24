import React from "react"
import {
  // Dialog,
  DialogOverlay,
  DialogContent
} from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"

import { Widget } from "./app"
type ModalProps = {
  /** pass a boolean to be true or false */
  showDialog: boolean
  /** modal will call this function to set the state of showDialog to false */
  onCloseDialog: () => void
}
export function Modal({ showDialog, onCloseDialog }: ModalProps) {
  return (
    <DialogOverlay isOpen={showDialog}>
      <DialogContent
        style={{
          border: "solid 5px hsla(0, 0%, 0%, 0.5)",
          borderRadius: "10px"
        }}
      >
        <button className="close-button" onClick={onCloseDialog}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <div>
          widget
          <Widget />
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
