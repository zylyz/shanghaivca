import React from "react";
import ReactDOM from "react-dom";
import Roll_chose from '../css/Roll.css';

export default class Shadethree extends React.Component{
    constructor(props){
       super(props);
    //    this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit(e) {
    //     e && e.preventDefault();
    //     this.setState({
    //         name: this.refs.name.value
    //     });
    //     console.log('name', this.setState.name)
    }
    render(){
        
        return(
            <div className="footers">
               <form onSubmit={this.handleSubmit}>
                    <a href =""><img src={'app/images/icon/icon_11.png'} className="g4"alt="5"/></a>
                    <a href="#PageSearch">
                        <span type="submit"  value="搜索"><img src={'app/images/icon/icon_9.png'} className="g5"alt="5"/></span>
                    </a>
                    <a href ="#PageMap/2"><img src={'app/images/icon/shu.png'} className="g6"alt="5"/></a>
               </form>
           </div>  
        )
    }
}