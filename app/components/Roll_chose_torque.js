import React from "react";
import ReactDOM from "react-dom";
import Roll_chose from '../css/Roll_chose.css';
import Rollscroll_torque from './Roll_scroll_torque';
// import {Link} from 'react-router-dom'
export default class Rollchoose_torque extends React.Component{
    constructor(props){
       super(props);
    }
    render(){
        return(
            <div className="dancer">
                <div className="titles">
                     <img src={'app/images/back.png'} alt="1" />
                    <span className="tit"> Zip &nbsp;项&nbsp;链</span><br/>
                    <span className="tit1">1967</span>
                </div>
                <div className="d_photo long">
                     <img src={'app/images/xianglian3.png'} alt="" />
                     <p className="ps">Zip 项链的创作灵感<br/>来源于哪位名人的创意？ </p>
                </div>
                <div className="scrolls">
                   <Rollscroll_torque/>
                </div>
                <button>选&nbsp;择</button>

            </div>
        )
    }
}