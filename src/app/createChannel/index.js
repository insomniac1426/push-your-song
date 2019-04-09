import React from 'react';
import './createChannel.css'
import axios from 'axios';


class CreateChannel extends React.Component  {
    render() {
        return (
            <div className="form-group home-screen-form card">
                <h3>Create Channel</h3>
                <input 
                    onChange= {(event) => this.props.onCreateChannelInputChange(event)}
                    className="form-control" 
                    placeholder="Enter Channel Name"
                />
                <div className="create-button">
                    <button 
                        onClick={ this.props.onCreateChannel } 
                        className="btn btn-dark">Create
                    </button>
                </div>
            </div>
        )
    }
    
}
export default CreateChannel;