import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConfirmEmailMessage from '../message/ConfirmEmailMessage';
import {allBooksSelector} from '../../reducers/books';
import AddBookCta from '../ctas/AddBookCta';
import {fetchBooks} from '../../actions/books';

class DashboardPage extends Component {
    componentDidMount = () =>this.onInit(this.props);

    onInit = props =>props.fetchBooks();
    render(){
        const {isConfirmed,books} = this.props;

        return(
            <div>
                {!isConfirmed && <ConfirmEmailMessage />}

                {books.length ===0 && <AddBookCta />}
            </div>
        );
    }
}

function mapStateToProps(state){
 return {
     isConfirmed: !!state.user.confirmed,
     books:allBooksSelector(state)
 }
}

DashboardPage.propTypes = {
    isConfirmed:PropTypes.bool.isRequired,
    fetchBooks:PropTypes.func.isRequired,
    books:PropTypes.arrayOf(PropTypes.shape({
        title:PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default connect(mapStateToProps,{fetchBooks})(DashboardPage);