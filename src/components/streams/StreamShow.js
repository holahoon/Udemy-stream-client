import React, { Component } from 'react'
import { connect } from 'react-redux'
import flv from 'flv.js'

import { fetchStream } from '../../actions'

class StreamShow extends Component {
  constructor(props) {
    super(props)

    this.videoRef = React.createRef()
  }

  componentDidMount() {
    const { streamId } = this.props.match.params

    this.props.fetchStream(streamId)
    // When the component first renders, attempt to built the player ( * initial render * )
    this.buildPlayer()
  }

  // - Component re-renders
  componentDidUpdate() {
    // If this component fetches the stream successfully and re-renders, this lifecycle will be called
    // Then, attempt to call this method ( * follow up render  * )
    this.buildPlayer()
  }

  componentWillUnmount() {
    // Stop creating the player itself to clear
    this.player.destroy()
  }

  buildPlayer() {
    const { streamId } = this.props.match.params

    if (this.player || !this.props.stream) {
      // if you have not built the player before or do not have the stream, return
      return
    }
    // flv video
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${streamId}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()

  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }
}

const mapStatetoProps = (state, ownProps) => {
  return {
    stream: state.streamReducer[ownProps.match.params.streamId]
  }
}

export default connect(
  mapStatetoProps,
  { fetchStream }
)(StreamShow)