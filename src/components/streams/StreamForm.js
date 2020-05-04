import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const errorClassName = `field ${meta.error && meta.touched ? "error" : null}`

    return (
      <div className={errorClassName}>
        <label>{label}
          <input {...input} autoComplete="off" />
        </label>
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues) // props from parent component
  }

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)} //this.props.handleSubmit is a callback provided by Redux form      
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />

        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

// - Validation form Redux form
const validate = formValues => {
  // console.log(formValues)
  // ** Returning an empty object makes redux form think our form is valid
  const errors = {}
  if (!formValues.title) {
    errors.title = 'Please enter the title'
  }
  if (!formValues.description) {
    errors.description = 'Please enter the description'
  }

  return errors
}

export default reduxForm({
  form: 'streamForm', // <- this form obj key cannot be modified
  validate
})(StreamForm)

/**
 *  - Below is an example of wrapping reduxForm with connect with the component
 */
// const formWrapped = reduxForm({
//   form: 'streamCreate', // <- this form obj key cannot be modified
//   validate
// })(StreamForm)

// export default connect(
//   null,
//   { createStream }
// )(formWrapped)