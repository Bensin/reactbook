import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Form,Button,Message} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../message/InlineError';

class ForgotPasswordForm extends Component {
    state={
        data:{
            email:''
        },
        loading:false,
        errors:{}
    }

    handleChange = event =>{
        const {name,value} = event.target;
        this.setState({
            data:{...this.state.data,[name]:value}
        });
    }

    onSubmit = e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({loading:true});
            this.props.submit(this.state.data)
                .catch(err => 
                    this.setState({errors:err.response.data.errors,loading:false})
                    );
        }
        
        
    }

    validate = data =>{
        const errors = {};
        if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        return errors;
    }

    render(){
        const { data,loading, errors} = this.state;
        return(
            <div>
                <Form onSubmit={this.onSubmit} loading={loading}>
                {!!errors.global && <Message negative>{errors.global}</Message>}
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" id="email" name="email" value={data.email}
                        placeholder="example@example.com" onChange={this.handleChange}/>
                        {errors.email && <InlineError text={errors.email}/>}
                    </Form.Field>
                    <Button primary>Send</Button>
                </Form>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit:PropTypes.func.isRequired
}

export default ForgotPasswordForm;