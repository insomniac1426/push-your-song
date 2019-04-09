import React from 'react';
import './landingPage.css';
import { withRouter } from 'react-router-dom';

class LandingPage extends React.Component {
    createChannelClickHandler = () => {
        this.props.history.push('/home'); 
    }

    joinChannelClickHandler = () => {
        this.props.getChannelList();
        this.props.history.push('/channelList'); 
    }
    render() {
        return(
            <div className="landing-page">
                <div className="landing-page-heading"> Enjoy Free Collaborative Music</div>
                <div className="button-group">
                    <div className="button-item">
                        <button 
                            onClick= { this.createChannelClickHandler }
                            className="btn btn-outline-dark">Create Channel    
                        </button>
                    </div>
                    <div className="button-item">
                        <button
                            onClick= { this.joinChannelClickHandler }
                            className="btn btn-outline-dark">Join Channel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LandingPage);