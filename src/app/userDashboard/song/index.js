import React from 'react';
import './song.css';

class Song extends React.Component {
    onUpVoteClickHandler = (id) => {
        this.props.onUpVoteClick(id);
    }
    render() {
        return (<div 
            className={`list-group-item`}
        >
            <div>{ this.props.song_name }</div>
            {<span className="badge badge-pill badge-dark">{this.props.upvotes}</span>}
            { 
                (!this.props.isUpvoted) ? <div onClick={() => this.onUpVoteClickHandler(this.props.song_id)} className="thumbs-up">
                   <i className="fas fa-thumbs-up"></i>
                </div> : null
            }
        </div>
        )
    }
    
}

export default Song;