import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../message/InlineError';

class SignupForm extends Component {
    state = {
        data:{
            email:'',
            password:''
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
        if(!data.password) errors.password = "Cann't be null";
        if(!Validator.isEmail(data.email)) errors.email="Invalid Email";
        return errors;
    }

    render(){
        const {data,loading,errors} = this.state;
        return(
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field>
                    <label>Email</label>
                    <input type="email" id="email" name="email" value={data.email}
                    placeholder="email@email.com" onChange={this.handleChange}/>
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="password" id="password" name="password" value={data.password}
                    placeholder="password" onChange={this.handleChange}/>
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Button primary>Signup</Button>
            </Form>
        );
    }
}

SignupForm.propTypes = {
    submit:PropTypes.func.isRequired
}

export default SignupForm;