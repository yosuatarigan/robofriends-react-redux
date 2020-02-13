import React from 'react';

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            HasError : false
        }
    }

    componentDidCatch(error,info){
        this.setState({HasError:true})
    }

    render(){

      if(this.state.HasError){
          return <h1>oh noooo</h1>
      }
      return this.props.children
    }
}

export default ErrorBoundary;