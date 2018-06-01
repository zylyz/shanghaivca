import React from "react";
import ReactDOM from "react-dom";
export default class PageVideo extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
            // 获取要操作的元素
            var video = document.getElementById("video");
            var videospan = document.getElementById("videospan");
            var videoContainer = document.getElementById("videoContainer");
            var controls = document.getElementById("video_controls");
            var playBtn = document.getElementById("playBtn");

            let _this = this;

            // 创建我们的操作对象，我们的所有操作都在这个对象上。
            var videoPlayer = {
                init: function(){
                    var that = this;
                    video.removeAttribute("controls");
                    bindEvent(video, "loadeddata", videoPlayer.initControls);
                    videoPlayer.operateControls();
                },
                operateControls: function(){
                    bindEvent(playBtn, "click", play);
                    bindEvent(video, "click", play);
                }
            }

            videoPlayer.init();

            // 原生的JavaScript事件绑定函数
            function bindEvent(ele, eventName, func){
                if(window.addEventListener){
                    ele.addEventListener(eventName, func);
                }
            }
            // 控制video的播放
            function play(){
                if ( video.paused || video.ended ){              
                    if ( video.ended ){ 
                        video.currentTime = 0;
                        } 
                    video.play();
                    // 执行回调
                    typeof(_this.props.startPlay) == "function" && _this.props.startPlay(video);
                    
                    video.style.display = "none";
                    videospan.style.display = "block";
                } 
                else{ 
                    video.pause(); 
                    // playBtn.src = "app/images/on.png";
                    video.style.display = "block";
                    videospan.style.display = "block";
                } 
            }
    }
    render(){
        return(
            <div className="pagevideo" style={{marginTop:"1rem",zIndex:0}}>
                <div class="videoPlayer" id="videoContainer" style={{position: "relative"}}>
                    <video id="video" src={this.props.src} preload controls>
                    
                    </video>
                    <span id="playBtn" >
                        <span id="videospan" style={{position:" absolute",top: "0",left: "0",width:"100%",height:"auto",display:"block"}}> 
                            <div style={{width:"100%",height:"100%"}}><img title="Play" src={this.props.cover || "app/images/videoimg1.jpg"} onError={(e)=>{
                                  e.currentTarget.src="app/images/videoimg1.jpg";
                            }} style={{width:"100%",height:"100%"}}/></div>
                        </span> 
                        {/* <span style={{position:"absolute",top:"50%",marginTop:"-50px",left:"50%",marginLeft:"-50px",width:"100px",height:"100px",display:"block",borderRadius:"50%",backgroundColor:"rgba(0,0,0,0.8)"}}>
                            <img src={"app/images/videobf.png"}/>
                        </span> */}
                    </span>
                </div>
            </div>
        )
    }
}