import React from 'react';
import './app.css'
import { withRouter, Switch, Route } from 'react-router-dom';
import CreateChannel from './createChannel';
import UserDashboard from './userDashboard';
import ChannelList from './channelList';
import LandingPage from './landingPage';
import AdminDashboard from './adminDashboard';
import axios from 'axios'

class App extends React.Component {
    state = {
        host:'http://192.168.43.58',
        channelName:null,
        userSongSearchString: "",
        userSongSearchList: null,
        playlist: [],
        channelList:[],
        currentUserChannel:null,
        upVotedSongs: {},
        currentPlayingSong: null,
        currentAdminChannelId: null,
        adminInterval : null,
        clietInterval : null,
        currentlyPlayingAudio: null,
        channelSearchText :"",
        songSearchValidationMsg:"",
        songSearchTOuched: false,
    }


    componentWillUnmount () {
        if(this.state.clietInterval) clearInterval(this.state.clietInterval);
        if(this.state.adminInterval) clearInterval(this.state.adminInterval);
    }

    createChannelInputChangeHandler = (event) => {
        this.setState({
            channelName: event.target.value
        })
    }

    createChannelHandler = () => {
        if(this.state.channelName) {
            axios.post(`${this.state.host}/CollabPlay/ChannelAPI.php`, {
                "channel_name" : this.state.channelName,
                "add":1
            }).then(response => {
                console.log(response);
                this.setState({
                    currentAdminChannelId: response.data
                })
                this.getCurrentPlayingSong({id: response.data})
                this.props.history.push('/adminDashboard');
            })
            .catch(err => {
                console.log(err)
            })
        }
        
    }
    
    getChannelList = () => {
        axios.post(`${this.state.host}/CollabPlay/ChannelAPI.php`, {
            fetch:1
        }).then(res => {
            console.log(res)
            this.setState({
                channelList: (res.data) ? res.data :[]
            })
        })
        .catch(err => console.log(err));
    }

    userChannelSelectionHandler = (channel) => {
        this.setState({
            currentUserChannel: channel
        })
        this.getCurrentPlayingSong(channel, this.getCurrentUserPlaylist);
        this.props.history.push('/userDashboard');
    }

    searchSongClickHandler = () => {
        if(this.state.userSongSearchString) {
            axios.post(`${this.state.host}/CollabPlay/SongsAPI.php`, {
                "searched_song":this.state.userSongSearchString
            }).then(res => {
                this.setState({
                    userSongSearchList: (res.data) ? res.data : []
                })
            })
            .catch(err => console.log(err));
        }
    }

    searchSongChangeHandler = (event) => {
        this.setState({
            userSongSearchString: event.target.value
        })
    }

    addSongToPlaylistHandler = (song) => {
        axios.post(`${this.state.host}/CollabPlay/PlaylistAPI.php`, {
            "add_song":1,
            "channel_id":this.state.currentUserChannel.id,
            "song_id":song.id
        }).then(res => {
            console.log(res.data, "ADDED SONG TO QUEUE")
            if(res.data === "queue full") {
                alert("Cannot add any more songs")
            } else {
                this.getCurrentUserPlaylist(this.state.currentUserChannel)
            }
        })
        .catch(err => console.log(err))
    }

    upVoteClickHandler = (songId) => {
        axios.post(`${this.state.host}/CollabPlay/PlaylistAPI.php`, {
            "upvote": 1,
            "channel_id": this.state.currentUserChannel.id,
            "song_id": songId
        }).then(res => {
            this.setState({
                upVotedSongs: {
                    ...this.state.upVotedSongs,
                    [songId]:true,
                },
            })
            this.getCurrentUserPlaylist(this.state.currentUserChannel);
        }).catch(err => console.log(err));
    }

    getCurrentPlayingSong = (channel, cb) => {
        console.log(channel);
        axios.post(`${this.state.host}/CollabPlay/PlaylistAPI.php`, {
            "channel_id":channel.id,
            "current_song":1
        }).then(res => {
            console.log(res);
            if(!(res.data === null && this.state.currentPlayingSong === null)) {
                this.setState({
                    currentPlayingSong: (res.data)?res.data[0]:null
                })
            }
            if(cb) cb(channel);
        })
        .catch(err => console.log(err));
    }

    getNextSong = (channel) => {
        axios.post(`${this.state.host}/CollabPlay/SongsAPI.php`, {
            "channel_id":channel.id,
            "next_song":1
        }).then(res => {
            this.setState({
                currentPlayingSong: (res.data)?res.data[0]:null,
            })
        })
        .catch(err => console.log(err));
    }

    getCurrentUserPlaylist = (channel) => {
        axios.post(`${this.state.host}/CollabPlay/PlaylistAPI.php`, {
            "channel_id":channel.id,
            "get_playlist":1
        }).then(res => {
            this.setState({
                playlist: (res.data)?res.data:[]
            })
        })
        .catch(err => console.log(err));
    }

    createAdminInterval = () => {
        if(!this.state.adminInterval) {
            let interval = setInterval(() => {
                console.log("Admin Interval", this.state.currentAdminChannelId);
                this.getCurrentPlayingSong({id:this.state.currentAdminChannelId});
            }, 10000)
            this.setState({
                adminInterval: interval
            })
        }
        
    }
    killAdminInterval = () => {
        if(this.state.adminInterval) {
            clearInterval(this.state.adminInterval);
            console.log("Admin Interval Deleted");
            this.setState({
                adminInterval: null
            })
        }   
    }

    refreshUserPlaylist = () => {
        if(!this.state.clietInterval) {
            let userInterval = setInterval(() => {
                console.log("User interval");
                this.getCurrentPlayingSong(this.state.currentUserChannel, this.getCurrentUserPlaylist);
            }, 5000)
            this.setState({
                clietInterval: userInterval
            })
        }
    }

    searchChannelClickHandler = () => {
        if(this.state.channelSearchText) {
            axios.post(`${this.state.host}/CollabPlay/ChannelAPI.php`, {
                'search_channel':1,
                'channel_name':this.state.channelSearchText
            }).then(res => {
                console.log(res);
                this.setState({
                    channelList:(res.data) ? res.data : []
                })
            }).catch(err => console.log(err))
        }
    }

    searchChannelChangeHandler = (event) => {
        this.setState({
            channelSearchText: event.target.value,

        })
    }

    render() {
        console.log(this.state);
        return(
            <div className="container-fluid" onClick={this.hidePopup}>
                <div className="nav">
                    <div className="brand-name">CollabPlay</div>
                </div>
                <div className="app-body">
                        <Switch>
                            <Route
                                path="/channelList"
                                render = {() => <ChannelList
                                    onSearchChannelClick = {this.searchChannelClickHandler}
                                    onSearchChannelChange = {this.searchChannelChangeHandler}
                                    onChannelSelect= { this.userChannelSelectionHandler }
                                    channelList= { this.state.channelList }
                                />}
                            />
                            <Route
                                path="/userDashboard"
                                render = {() => <UserDashboard
                                    refreshUserPlaylist={this.refreshUserPlaylist}
                                    upVotedSongs= { this.state.upVotedSongs }
                                    getCurrentUserPlaylist = { this.getCurrentUserPlaylist } 
                                    onSongSelect = { this.addSongToPlaylistHandler }
                                    userSongSearchList= {this.state.userSongSearchList}
                                    playlist= {this.state.playlist}
                                    currentPlayingSong= {this.state.currentPlayingSong}
                                    onSearchSongClick = { this.searchSongClickHandler }
                                    onSearchSongChange = { this.searchSongChangeHandler }
                                    onUpVoteClick = { this.upVoteClickHandler }
                                />}
                            />
                            <Route
                                path="/adminDashboard"
                                render = {() => <AdminDashboard
                                    currentlyPlayingAudio={this.currentlyPlayingAudio}
                                    createAdminInterval={this.createAdminInterval}
                                    killAdminInterval={this.killAdminInterval}
                                    adminInterval={this.state.adminInterval}
                                    currentAdminChannelId={this.state.currentAdminChannelId}
                                    getNextSong={this.getNextSong}
                                    playlist= {this.state.playlist}
                                    currentPlayingSong= {this.state.currentPlayingSong}
                                />}
                            />
                            <Route 
                                path="/home"
                                render = {() => <CreateChannel
                                    onCreateChannelInputChange = { this.createChannelInputChangeHandler }
                                    onCreateChannel = { this.createChannelHandler }
                                />}
                            />
                            <Route exact path="/" render = { () => <LandingPage
                                getChannelList = { this.getChannelList }
                            />}/>
                        </Switch>
                </div>
            </div>
        );
    }
    
    
}

export default withRouter(App);
