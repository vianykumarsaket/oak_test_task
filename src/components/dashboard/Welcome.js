import React from 'react';
import base_api from '../config/baseAPI';
import { Redirect,Link } from 'react-router-dom';
import Logout from '../logout/Logout';

class Welcome extends React.Component{
    constructor(){
        super();
        this.state = {
            search:'',
            planets:[],
            searchResult:[]
        }
    }

    componentDidMount=()=>{
        this.fetchPlanets(base_api+"planets/");        
    }

    handleChange=e=>{
        var {name,value} = e.target;

        var searchResult = this.state.planets.filter((item)=>{
            var item1 = item.name.toLowerCase();            
                      
            if(item1.indexOf(value.toLowerCase())>-1){
                return item;
            }
        })

        this.setState({
            ...this.state,
            searchResult:searchResult,
            [name]:value
        })
    }

    fetchPlanets=(url)=>{
        fetch(url)
        .then(res=>{return res.json()})
        .then(res2=>{  
            this.setState(state=>{   
                const planets = state.planets.concat(res2.results);
                const searchResult = state.planets.concat(res2.results);
                return {
                    planets,
                    searchResult
                };             
            })  
            if(res2.next){
                this.fetchPlanets(res2.next)                
            }   
        })
    }

    render(){
        if(!localStorage.getItem('isLogin')){
            return <Redirect to={'/'} />
        }
        var  searchResult = this.state.searchResult;        
        
        return(
            <div>
                <input type="text" placeholder="Search planets" onChange={this.handleChange} value={this.state.search} name="search"/>
                <Logout />
                <ul>
                {
                    searchResult.map((planet,index)=>{
                        var url = planet.url.replace(base_api,'');
                        var url2 = url.replace('/planets/','')
                        
                        return <li key={index} style={{listStyle:'none'}}><Link to={{pathname: `${url}`, query: { id:`${url2}`}}}>{planet.name}</Link></li>
                    })
                }
                </ul>

            </div>
        )
    }
}

export default Welcome;