import React from 'react';

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
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    } else {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track],
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              results={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}
