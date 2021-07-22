import React from 'react';
import Spotify from '../../Util/Spotify';

import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Name',
          artist: 'Artist',
          album: 'album',
          id: '1',
        },
        {
          name: 'Name',
          artist: 'Artist',
          album: 'album',
          id: '2',
        },
        {
          name: 'Name',
          artist: 'Artist',
          album: 'album',
          id: '3',
        },
      ],
      playlistName: 'My Favorites',
      playlistTracks: [
        {
          name: 'First song',
          artist: 'Ed Sheeran',
          album: 'the album',
          id: '11',
        },
        {
          name: 'Second song',
          artist: 'Ed Sheeran',
          album: 'the album',
          id: '12',
        },
        {
          name: 'Third song',
          artist: 'Ed Sheeran',
          album: 'the album',
          id: '13',
        },
        {
          name: 'Fourth song',
          artist: 'Ed Sheeran',
          album: 'the album',
          id: '14',
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    } else {
      const currentPlaylist = this.state.playlistTracks;
      currentPlaylist.push(track);
      this.setState({
        playlistTracks: currentPlaylist,
      });
    }
  }

  removeTrack(track) {
    const currentPlaylist = this.state.playlistTracks;
    const modifiedPlaylist = currentPlaylist.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    this.setState({ playlistTracks: modifiedPlaylist });
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.forEach((track) => {
      trackURIs.push(track.uri);
    });
    return trackURIs;
  }

  search(term) {
    Spotify.search(term).then((result) => {
      this.setState({ searchResults: result });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              results={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
