import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import base_api from '../config/baseAPI';
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default class Login extends React.Component {
    constructor(){
        super();
        this.state={
            name:'',
            birthyear:'',
            isLogin:false,
            toLogin:true
        }
    }

    componentDidMount=()=>{        
        if(localStorage.getItem('isLogin')){
            this.setState({
                isLogin:true
            })
        }
    }

    handleChange=e=>{
        console.log(e.target.value);   
        var {name, value}=e.target;     
        this.setState({
            ...this.state,
            [name]:value,
            errorMsg:''
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        console.log(base_api);
        this.setState({
            toLogin:!this.state.toLogin
        })
        
        fetch(base_api+"people/")
        .then(res=>{return res.json()})
        .then(res2=>{   
            res2.results.map((person,index)=>{
                console.log(person.name,person.birth_year)
                if(person.name===this.state.name && person.birth_year===this.state.birthyear){   
                    localStorage.setItem('isLogin', true);  
                    this.setState({
                        isLogin:true
                    })                 
                }else{ 
                    this.setState({
                        errorMsg:'User doesn\'t matched',
                        toLogin:true
                    })                  
                             
                }
            })         
        })
    }

    render(){
        if (this.state.isLogin === true) {
            return <Redirect to='/dashboard' />
        }
        console.log(this.state);
        
        return (
            <Container component="main" maxWidth="xs" style={{marginTop:100}}>
            <CssBaseline />            
            <div className={useStyles.paper}>
                
                <Typography component="h1" variant="h5">
                Login  
                </Typography>
                <p>
                {
                    this.state.errorMsg?this.state.errorMsg:''
                }
                </p>
                <form className={useStyles.form} onSubmit={this.handleSubmit} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={this.handleChange}
                    value={this.state.name}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="birthyear"
                    label="Birth Year"
                    type="password"
                    id="birthyear"
                    autoComplete="birthyear"
                    onChange={this.handleChange}
                    value={this.state.birthyear}
                />                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!this.state.toLogin}
                    className={useStyles.submit}
                >
                    Login
                </Button>                
                </form>
            </div>
            </Container>
        );
    }
}