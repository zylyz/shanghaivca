import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import $ from "jquery";
import PageSmallDetail from "./page_small_detail";
import AudioBox from "./AudioBox.js";
import audiotwo from '../lib/musictwo';

// 页面头部导航条
export default class HeadNav extends React.Component{
    static defaultProps = {
        right:<a className="btn-search" href="#PageSearch">
                 <img src={"app/images/icon/musci_0.png"}/>
             </a>
    };
    constructor(props){
        super(props);
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa',window.isHomePageLoad)
        
    }
     render(){
         console.log('qaqaqaqaqa',this.props.list)
         return(
            <div className="h header" style={{position:this.props.position?"absolute":"initial",zIndex:'3000'}}>
                <a  className="btn-return" onClick={()=>{
                    // if(this.props.list){
                    //     window.location = "";
                    // }
                    window.history.go(-1);
                    
                    setTimeout(function(){
                        try {
                            var str =window.location.hash;
                            str = str.match(/#\/(\S*)\//)[1]; 
                        if(str=="PageSmallDetail"){
                            audiotwo.src =AudioBox.timeaudio.src;
                            audiotwo.currentTime=AudioBox.timeaudio.autoPlayTime
                            audiotwo.play();
                            } 
                        } catch (error) {
                            
                        }
                       
                    },100)
                }}><img src={"app/images/return.png"}/></a>
                <div className="p_s_d_h_center">
                {
                    this.props.children
                }
                </div>
                <div className="search">
                    {
                       this.props.right&&this.props.right
                    }
                    
                </div>
            </div>
         )
     }   
}