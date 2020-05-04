import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
      {/* The child elements do not handle any events -> If any child elements are clicked, the event bubbles up to the parent container where the event is */}
      <div className="ui standard modal visible active" onClick={event => event.stopPropagation()}>
        {/* event.stopPropagation() prevents the event to bubble up. */}
        <div className="header">{props.title}</div>

        <div className="content">{props.content}</div>

        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    // attach it with the body by creating an element inside index.html
    document.querySelector("#modal")
  )
}

export default Modal