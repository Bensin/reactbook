import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Message,Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component{
    state ={
        loading:true,
        success:false
    };

    componentDidMount(){
        this.props.confirm(this.props.match.params.token)
            .then(()=>this.setState({loading:false,success:true}))
            .catch(()=>this.setState({loading:true,success:false}));
    }

    render(){
        const {loading,success} = this.state;
        return(
            <div>
                {loading && (
                    <Message icon>
                        <Icon name="circle notched" loading/>
                        <Message.Header>Validating your email</Message.Header>
                    </Message>
                )}

                {!loading && success && (
                    <Message success icon>
                        <Icon name="check"/>
                        <Message.Content>
                            <Message.Header>Thank you. Email has been verifyed</Message.Header>
                            <Link to="/dashboard">Go to your dashboard</Link>
                        </Message.Content>
                    </Message>
                )}

                {!loading && !success && (
                    <Message negative icon>
                    <Icon name="warning sign"/>
                    <Message.Content>
                        <Message.Header>
                            Oops token not valid .
                        </Message.Header>
                    </Message.Content>
                    </Message>
                )}
            </div>
        );
    }
}

ConfirmationPage.propTypes = {
    confirm:PropTypes.func.isRequired,
    match:PropTypes.shape({
        params:PropTypes.shape({
            token:PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null,{confirm})(ConfirmationPage);