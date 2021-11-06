import axios from 'axios';
import React, { Component } from 'react';
    

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }

    }
    getPagedetail = (link) => {
        axios.get(`http://localhost:3001/page/link/${link}`)
            .then((response) => {
               this.setState({data : response.data[0]})
                
            })
            .catch((error) => {
                
               
            })
    }
    componentDidMount() {
      this.getPagedetail(this.props.link)
    }
    render() {
        
        return (
            <div>
                <h1>{this.state.data.link}</h1>
            </div>
        )
    }
}


