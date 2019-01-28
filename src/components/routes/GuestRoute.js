import React from 'react';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


const GuestRoute = ({isAuthenticated,component:Component,...rest}) =>(
    <Route {...rest} render={props => !isAuthenticated ?<Component {...props}/>:<Redirect to ="/dashboard" />}/>
);

function mapStateToProps(state){
    return {
        isAuthenticated:!!state.user.token
    }
}

GuestRoute.propTypes = {
    isAuthenticated:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
}

export default connect(mapStateToProps)(GuestRoute);