import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId)
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.streamId, formValues)
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* The above initialValues is a very special property name with Redux Form */}
        {/* Note: StreamForm is wrapped with ReduxForm helper */}
        <StreamForm
          // initialValues={{ title: this.props.stream.title, description: this.props.stream.description }}
          initialValues={_.pick(this.props.stream, 'title', 'description')} // _.pick() picks out the key from an obj without mutating
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // ** ownProps = reference to the props' object that shows up inside the StreamEdit component(above)    
  return {
    stream: state.streamReducer[ownProps.match.params.streamId]
  }
}

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit)