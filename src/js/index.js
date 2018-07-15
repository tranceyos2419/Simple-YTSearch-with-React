import "../../views/index.html";
import "../css/style.css";

import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import SearchBar from "./components/search_bar.jsx";
import VideoList from "./components/video_list.jsx";
import VideoDetail from "./components/video_detail.jsx";

import YTSearch from "youtube-api-search";
const API_KEY = "AIzaSyDx6RmykKBg7CF3Hl3Gxs-Ol-GyijFmVs4";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("Mamamoo");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      console.log("Video ", videos);
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const Searching = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={Searching} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
        />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector(".container"));

// videoSearch(term) {
//   YTSearch({ key: API_KEY, term: term }, videos => {
//     console.log("Video ", videos);
//     this.setState({
//       videos: videos,
//       selectedVideo: videos[0]
//     }); //this.setState({videos: videos})
//   });

// import axios from "axios";
// const API_KEY = "AIzaSyDx6RmykKBg7CF3Hl3Gxs-Ol-GyijFmVs4";
// const URL = "https://www.googleapis.com/youtube/v3/search?part=snippet";
// const TYPE = "video";

//this.setState({videos: videos})
