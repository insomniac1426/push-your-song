import React from 'react';
import './adminDashboard.css';

class AdminDashboard extends React.Component {
    state = {}

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.currentPlayingSong && nextProps.currentAdminChannelId) {
            nextProps.killAdminInterval();
            if(!nextProps.currentlyPlayingAudio) {
                let audio = new Audio(`http://192.168.43.58${nextProps.currentPlayingSong.file_path}`);
                audio.play();
                audio.addEventListener("ended", () => {
                    audio.currentTime = 0
                    // console.log("song ended", audio)
                    nextProps.getNextSong({id: nextProps.currentAdminChannelId})
                })
            }
        } else {
            nextProps.createAdminInterval();
        }
        
        return null;
    }
    componentWillUnmount() {
        this.props.killAdminInterval();
    }
    render() {
        return(
            <div className="card admin-dashboard">
                <div className="dashboard-heading">Admin Dashboard</div>
                <div className="row">
                    <div className="col-sm-6">
                        {(this.props.currentPlayingSong) ? <div className="list-group playlist">
                            <li 
                                className={`list-group-item search-items active`}
                            >
                                    { this.props.currentPlayingSong.song_name }
                            </li>
                        </div>:null}
                        <div className="list-group playlist">
                            {
                                this.props.playlist.map((song) => {
                                    return (
                                    <li 
                                        key={song_id} 
                                        className={`list-group-item search-items`}
                                    >
                                            {song.song_name}
                                    </li>)
                                })
                            }
                        </div>
                    </div>
                    {/* <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <input className="form-control" placeholder="Search your song"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">Button</button>
                            </div>
                        </div>
                        <div className="list-group search-list-results">
                            {
                                this.state.searchList.map((song, idx) => {
                                    return (<li key={idx} className="list-group-item search-items">
                                        {song.title}
                                    </li>)
                                })
                            }
                        </div>
                    </div> */}
                </div>
            </div>
        );
    } 
}

export default AdminDashboard;