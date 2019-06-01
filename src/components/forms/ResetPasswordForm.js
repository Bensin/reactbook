import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import InlineError from '../message/InlineError';

class ResetPasswordForm extends Component {
    state = {
        data:{
            token:this.props.token,
            password:'',
            passwordConfirm:''
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
        if(data.password !== data.passwordConfirm) errors.passwordConfirm="password must be same";
        return errors;
    }

    render(){
        const {data,loading,errors} = this.state;
        return(
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field>
                    <label>Password</label>
                    <input type="password" id="password" name="password" value={data.password}
                     onChange={this.handleChange}/>
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Form.Field>
                    <label>Password Confirmation</label>
                    <input type="password" id="passwordConfirm" name="passwordConfirm" value={data.passwordConfirm}
                     onChange={this.handleChange}/>
                    {errors.passwordConfirm && <InlineError text={errors.passwordConfirm}/>}
                </Form.Field>
                <Button primary>Reset</Button>
            </Form>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit:PropTypes.func.isRequired,
    token:PropTypes.string.isRequired
}

export default ResetPasswordForm;