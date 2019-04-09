import React from 'react';
import './userDashboard.css';
import Song from './song';

class UserDashboard extends React.Component {  
    componentDidMount() {
        this.props.refreshUserPlaylist();
    } 
    render() {
        return(
            <div className="card admin-dashboard">
                <div className="dashboard-heading">User Dashboard</div>
                <div className="row">
                    <div className="col-sm-6">
                        {( this.props.currentPlayingSong ) ? <div className="list-group playlist">
                            <div 
                                className={`list-group-item active`}
                            >
                                <div>{ this.props.currentPlayingSong.song_name }</div>
                                <div className="currently-playing">
                                    <i className="fas fa-play"></i>
                                </div> 
                            </div>
                        </div>: null}
                        <div className="list-group playlist">
                            {(this.props.playlist) && this.props.playlist.map((song, idx) => <Song 
                                key={ song.song_id } 
                                index={ idx }
                                isUpvoted={this.props.upVotedSongs[song.song_id]}
                                onUpVoteClick = { this.props.onUpVoteClick }
                                { ...song }
                            />)}
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <input 
                                className="form-control" 
                                placeholder="Search your song"
                                onChange = { (event) => this.props.onSearchSongChange(event) }
                            />
                            <div className="input-group-append">
                                <button 
                                    onClick= { this.props.onSearchSongClick }
                                    className="btn btn-outline-secondary" 
                                    type="button">Search
                                </button>
                            </div>
                        </div>
                        <div className="list-group search-list-results">
                            {   (this.props.userSongSearchList && this.props.userSongSearchList.length) ? this.props.userSongSearchList.map((song) => {
                                    return (<li 
                                        onClick={() => this.props.onSongSelect(song)}
                                        key={ song.id } 
                                        className="list-group-item search-items">
                                        { song.song_name }
                                    </li>)
                                }) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}

export default UserDashboard;