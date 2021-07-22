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
      playlistTrack: [
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
            <SearchResults results={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}
