import React from 'react';
import base_api from '../config/baseAPI';
import {Redirect,Link} from 'react-router-dom';
import Logout from '../logout/Logout';

class PlanetDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            planetDetails:{}
        }
    }

    componentDidMount=()=>{
        fetch(base_api+"planets/"+this.props.match.params.id)
        .then(res=>{return res.json()})
        .then(res2=>{
            this.setState({
                planetDetails:res2
            })          
        })
    }

    render(){
        if(!localStorage.getItem('isLogin')){
            return <Redirect to={'/'} />
        } 
        var planetDetails = this.state.planetDetails;              
        return(
            <div>
                <h1>Planet - {planetDetails.name?planetDetails.name:'Not Found'}</h1>
                <Link to={'/dashboard'}>Back</Link><Logout />
                <h4>{JSON.stringify(planetDetails)}</h4>
            </div>
        )
    }
}

export default PlanetDetails;