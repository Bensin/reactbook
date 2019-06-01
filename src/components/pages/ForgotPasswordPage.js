import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import {resetPasswordRequired} from '../../actions/auth';


class ForgotPasswordPage extends Component{
    state ={
        success:false
    }

   submit = data => {
       this.props.resetPasswordRequired(data)
            .then(()=>this.setState({success:true}));
   }
    
    render(){
        return(
            <div>
            {this.state.success ?(
            <Message>Email has been send</Message>):(
                <ForgotPasswordForm submit={this.submit}/>
            )}
            </div>
        );
    }
}


ForgotPasswordPage.propTypes = {
    resetPasswordRequired:PropTypes.func.isRequired
}

export default connect(null,{resetPasswordRequired})(ForgotPasswordPage);