import React from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends React.Component{
    constructor(){
        super();
        this.state={
            isLogin:localStorage.getItem('isLogin')
        }
    }

    handleLogout=()=>{
        localStorage.removeItem('isLogin');
        this.setState({
            isLogin:false
        })
    }

    render(){
        if(this.state.isLogin===false){
            return <Redirect to={'/'} />
        }

        return(
            <div>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default Logout;