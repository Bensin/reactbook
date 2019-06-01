import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import axio from 'axios';

class SearchBookForm extends Component {

    state = {
        query:'',
        loading:false,
        options:[],
        books:{}
    }

    onSearchChange = (e,data) =>{
        clearTimeout(this.timer);
        this.setState({query :data});
        this.timer = setTimeout(this.fetchOptions,1000);
    }

    onChange = (e,data)=>{
        this.setState({query:data.value});
        this.props.onBookSelect(this.state.books[data.value]);
    }

    fetchOptions = () =>{
        if(!this.state.query) return;
        this.setState({loading:true});
        axio.get(`/api/books/search?q=${this.state.query}`)
            .then(res => res.data.books)
            .then(books =>{
                const options =[];
                const bookHash = {};
                books.forEach(book =>{
                    bookHash[book.goodreadsId] = book;
                    options.push({
                        key:book.goodreadsId,
                        value:book.goodreadsId,
                        text:book.title,

                    });
                });
                this.setState({loading:false,options,books:bookHash})
            })
    }
    
    render(){

        return(
            <Form>
                <Dropdown 
                 search
                 fluid
                 placeholder="search book by title"
                 value ={this.state.query}
                 onSearchChange ={this.onSearchChange}
                 options ={this.state.options}
                 loading ={this.state.loading}
                 onChange={this.onChange}
                />
            </Form>
        )
    }
}

SearchBookForm.propTypes = {
    onBookSelect:PropTypes.func.isRequired
}

export default SearchBookForm;