import React,{useState} from "react";

import withRoot from "./withRoot";

import { useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag'
import { Button,Form } from 'semantic-ui-react'
// import PostCard from


const GET_USER_QUERY = gql`
{
    user{
    email
    password
    username
}
}
`;

const USERDATA = gql`
    mutation createUser(
        $username: String!
        $email: String!
        $password: String!
    ){
        createUser(
            username : $username
            password : $password
            email : $email
        ){
            user{
                username
                email
                password

            }
        }
}
`;



function register(){
    
    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    //array  destructurings //usestate function component state
    const [values, setValues] = useState({
        username: '',
        password: '',
        email:''
    })

    const [addUser, {loading}] = useMutation(USERDATA, {
        update(proxy, result) {
            console.log(result)
        },
        onError(err){
            console.log(err)
        },
        variables : values
    })

    const onSubmit = (event) => {
        event.preventDefault()
        addUser();
    }
    return(
        <div>
            <center><br />
            <Form onSubmit={onSubmit}>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    type="text"
                /><br />
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    type="text"
                /><br />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="text"
                /><br /><br />
                <Button type='submit'>Register</Button>
        
            </Form>
            </center>

        </div>

    )
}

export default withRoot(register);
