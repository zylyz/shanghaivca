
 /*!  
  **************************************************************  
 *                                                            *  
 *   .=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-.       *  
 *    |                     ______                     |      *  
 *    |                  .-"      "-.                  |      *  
 *    |                 /            \                 |      *  
 *    |     _          |              |          _     |      *  
 *    |    ( \         |,  .-.  .-.  ,|         / )    |      *  
 *    |     > "=._     | )(__/  \__)( |     _.=" <     |      *  
 *    |    (_/"=._"=._ |/     /\     \| _.="_.="\_)    |      *  
 *    |           "=._"(_     ^^     _)"_.="           |      *  
 *    |               "=\__|IIIIII|__/="               |      *  
 *    |              _.="| \IIIIII/ |"=._              |      *  
 *    |    _     _.="_.="\          /"=._"=._     _    |      *  
 *    |   ( \_.="_.="     `--------`     "=._"=._/ )   |      *  
 *    |    > _.="                            "=._ <    |      *  
 *    |   (_/                                    \_)   |      *  
 *    |                                                |      *  
 *    '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='      *  
 *                                                            *  
 *           LASCIATE OGNI SPERANZA, VOI CH'ENTRATE           *  
 **************************************************************   
 ******************************************************************
 *  项目名称 : shanghaiVCA
 *  文件描述 :
 *  文件名称 : BgMusic.js
 *  版  本  : v1.0.0.0
 *  说  明  :  
 *  作  者  : night
 *  邮  箱  : 88962800@qq.com
 *  创建时间 : 2018:03-27 17:08 
 ******************************************************************
    Copyright © 2017-2018, All rights reserved.
 ******************************************************************
 */

 import React from "react";
 import audio from "../lib/music";
 import  i18n from '../i18n/i18n';
 export  default class BgMusic extends React.Component{
     constructor(props){
        super(props);
        console.log('哈哈哈哈',this.props)
         this.state = {
             isPlaying:true
         }
         if(audio && audio.src){
             audio.play();
         }
     }
     handleMusicTouch(e){
         if(!audio)return;
         if(!audio.src){
             audio.src=this.props.music || 'app/media/bgm.mp3';
             audio.loop='loop';
             audio.play();
             return;
         }
         if(audio.paused){
             audio.play();
             this.setState({
                 isPlaying:true
             });
             e.nativeEvent.stopImmediatePropagation();
             return;
         }
         this.setState({
             isPlaying:false
         });
         audio.pause();
         e.nativeEvent.stopImmediatePropagation();

     }
     componentWillUnmount(){
         if(audio){
             audio.pause();
         }
     }
     playMusic(src){
         alert(src || '');
     }
     handClickopen(){
        typeof(this.props.openback) == "function" && this.props.openback();
     }
     handClickclose(){
        typeof(this.props.closeback) == "function" && this.props.closeback();
     }
     render(){
         return(
             <div className="bgmusic_container">
                 <a  onTouchStart={(e)=>{
                     this.handleMusicTouch(e)
                 }} >
                     {this.state.isPlaying ?
                         <img src={'app/images/icon/musci_0.png'} onClick={()=>{this.handClickopen()}} className="g2" alt="2"/>
                         :<img  src={'app/images/icon/musci_1.png'} onClick={()=>{this.handClickclose()}}  className="g2" alt="2"/>
                     }

                 </a>
             </div>

         )
     }
 }