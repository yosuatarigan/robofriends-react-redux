import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../Component/CardList';
import SearchBox from '../Component/Searchbox';
import Scroll from '../Component/Scroll';
import ErrorBoundary from '../Component/ErrorBoundary';
import './App.css';

import {setSearchField} from '../action';

const mapStateToProps = state =>{
    return{
        searchField : state.searchField
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {onSearchChange: (event) => dispatch(setSearchField(event.target.value))}
}


class App extends Component{
    constructor(){
        super()
        this.state = {
            robots : []
        };
    }    

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => Response.json())
            .then(data=> this.setState({robots : data}) )
    }

    render(){
        const {searchField, onSearchChange} = this.props;

        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return !this.state.robots.length ?     <h1>Loading</h1>
        :    
            <div className="f3 tc bw2 ma5">
                    <h2 className='title'>Robofriends</h2>
                    <SearchBox onSearchChange={onSearchChange}/>
                    <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                    </Scroll>
    
            </div>
        }        
    }


 export  default connect(mapStateToProps, mapDispatchToProps)(App);