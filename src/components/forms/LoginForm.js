import React ,{Component} from 'react';
import PropTypes from "prop-types";
import {Button , Form, Message, MessageHeader} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../message/InlineError";


class LoginForm extends Component {
  
    state ={
        data:{
            email:'',
            password:''
        },
        loading:false,
        errors:{},

    };

    handleChange = event =>{
        const {name,value} = event.target;
        this.setState({
           data:{...this.state.data,[name]:value}
        });
    }

    onSubmit = () =>{
        const errors = this.validate(this.state.data);
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
        const errors= {};
        if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if(!data.password) errors.password = "Can't be blank";
        return errors;  
    }

    render(){
        const {data,errors,loading} = this.state;
        return(
           <Form onSubmit={this.onSubmit} loading={loading}>
           { errors.global && (
                <Message negative>
                    <Message.Header>
                        something wet wrong
                        <p>{errors.global}</p>
                    </Message.Header>
               </Message>
           )}
               <Form.Field error={!!errors.email}>
                   <label>Email</label>
                   <input type="email" id="email" name="email" value={data.email}
                    placeholder="Enter Email" onChange={this.handleChange} />
                    {errors.email && <InlineError text={errors.email}/>}
               </Form.Field>
               <Form.Field error={!!errors.password}>
                   <label>Password</label>
                   <input type="password" id="password" name="password" value={data.password}
                    placeholder="Enter Password" onChange={this.handleChange}/>
                    {errors.password && <InlineError text={errors.password}/>}
               </Form.Field>
               <Button primary>Login</Button>
           </Form> 
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
  };

export default LoginForm;