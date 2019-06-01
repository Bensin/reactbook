import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Form,Button, Segment, Grid, Image} from 'semantic-ui-react';
import InlineError from '../message/InlineError';

class BookForm extends Component {
    state = {
        data:{
            goodreadsId: this.props.book.goodreadsId,
            title:this.props.book.title,
            authors:this.props.book.authors,
            //cover:this.props.book.cover[0],
            cover:'',
            pages:this.props.book.pages
        },
        covers:this.props.book.covers,
        loading:false,
        errors:{}
    }

    componentWillReceiveProps(props){
        this.setState({
            data:{
                goodreadsId: props.book.goodreadsId,
                title:props.book.title,
                authors:props.book.authors,
                //cover:props.book.cover[0],
                cover:'',
                pages:props.book.pages
            },
            covers:props.book.covers
        })
    }
  
    handleChange = event =>{
        const {name,value} = event.target;
        this.setState({
            data:{...this.state.data,[name]:value}
        });
    }
    
    handleChangeNumber = event =>{
        const {name,value} = event.target;
        this.setState({
            data:{...this.state.data,[name]:parseInt(value,10)}
        });
    }
    onSubmit = e =>{
        e.preventDefault();
        const errors= this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length ===0){
            this.setState({loading:true});
            this.props.submit(this.state.data)
                .catch(err =>
                    this.setState({errors:err.response.data.errors,loading:false})
                    );
        }
    }

    validate = data =>{
        const errors ={};
        if(!data.title) errors.title = "Cann't be null";
        if(!data.authors) errors.authors = "Cann't be null";
        if(!data.pages) errors.pages = "Cann't be null";
        return errors;
    }

    render(){
        const {data,loading,errors} = this.state;
        return(
            <Segment>
                   <Form onSubmit={this.onSubmit} loading={loading}>
                     <Grid columns={2} stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>Title</label>
                                    <input type="text" name="title" id="title" value={data.title}
                                    placeholder="Title" onChange={this.handleChange}/>
                                    {errors.title && <InlineError text={errors.title}/>}
                                </Form.Field>
                                <Form.Field>
                                    <label>Author</label>
                                    <input type="text" name="authors" id="authors" value={data.authors}
                                    placeholder="Authors" onChange={this.handleChange}/>
                                    {errors.authors && <InlineError text={errors.authors}/>}
                                </Form.Field>
                                <Form.Field>
                                    <label>Pages</label>
                                    <input type="text" name="pages" id="pages" value={data.pages !== undefined?data.pages:"Loading"}
                                    placeholder="Pages" onChange={this.handleChangeNumber} disabled={data.pages ===undefined}/>
                                    {errors.pages && <InlineError text={errors.pages}/>}
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Image size="small" src={data.cover}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Button primary>Savek</Button>
                        </Grid.Row>
                     
                     </Grid>
                      
                    </Form>
            </Segment>
           
        );
    }
}

BookForm.propTypes = {
    submit:PropTypes.func.isRequired,
    book: PropTypes.shape({
        goodreadsId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
        covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        pages: PropTypes.number
      }).isRequired

}

export default BookForm;