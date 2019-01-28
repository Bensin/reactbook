import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConfirmEmailMessage from '../message/ConfirmEmailMessage';

const DashboardPage = ({isConfirmed}) =>(
    <div>
        {!isConfirmed && <ConfirmEmailMessage />}
    </div>
);

function mapStateToProps(state){
 return {
     isConfirmed: !!state.user.confirmed
 }
}

DashboardPage.propTypes = {
    isConfirmed:PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(DashboardPage);