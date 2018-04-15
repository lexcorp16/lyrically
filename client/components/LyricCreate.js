import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class LyricCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        songId: this.props.songId,
        content: this.state.content,
      }
    }).then(() => this.setState({content: ''}))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="content">Add a Lyric</label>
        <input
          name="content"
          onChange={(event) => this.setState({content: event.target.value})}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
