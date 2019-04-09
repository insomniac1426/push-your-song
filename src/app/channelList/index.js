import React from 'react';
import './channelList.css'

class ChannelList extends React.Component {
    
    render() {
        return(
            <div className="card channel-list">
                <div className="channel-list-heading">Join a channel</div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="list-group channel-list-group">
                            {
                                this.props.channelList.map((channel) => {
                                    return (
                                    <li 
                                        key={channel.id} 
                                        className="channel-list-item list-group-item"
                                        onClick={() => this.props.onChannelSelect(channel)}
                                    >
                                        {channel.channel_name}
                                    </li>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="input-group mb-3">
                            <input 
                                className="form-control" 
                                placeholder="Search your channel"
                                onChange={ this.props.onSearchChannelChange }
                            />
                            <div className="input-group-append">
                                <button 
                                    className="btn btn-outline-secondary" 
                                    type="button"
                                    onClick={ this.props.onSearchChannelClick }
                                >Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChannelList;