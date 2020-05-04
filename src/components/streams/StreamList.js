import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchStreams } from '../../actions'

class StreamList extends Component {

  componentDidMount() {
    this.props.fetchStreams()
  }

  renderAdmin(stream) {
    // Check to see if the logged in Google auth userId is same as the Google auth userId that's passed into the stream
    // This allows the admin who created the stream to edit/delete the stream
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
          <Link className="ui button negative" to={`/streams/delete/${stream.id}`}>Delete</Link>
        </div>
      )
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
          </div>
          <div className="description">
            {stream.description}
          </div>
        </div>
      )
    })
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streamReducer), // Turns all the values in obj and returns as an array
    currentUserId: state.authReducer.userId,
    isSignedIn: state.authReducer.isSignedIn
  }
}

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList)