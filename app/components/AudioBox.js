import React from "react";
import ReactDOM from "react-dom";
import close from '../images/close.png';
import i18n from '../i18n/i18n';
// import audio from "../lib/music";
import audiotwo from '../lib/musictwo';
export default class AudioBox extends React.Component{
    constructor(props){
        super(props);
        
        this.timer = null;
        
        this.state={
            Detail_content:this.props.Detail_content
        }
     }

    static defaultProps = {
        autoPlay:true,
        
    }
    static timeaudio = {
        autoPlayTime:0,
        src:''
    }

 
    componentDidMount(){ 
        var audios = audiotwo;
        var audioPlay = this.refs.audioPlay;
        var audioInfoBtn = this.refs.audioInfoBtn;
        var audioInfoBox = this.refs.audioInfoBox;
        var audioBox = this.refs.audioBox;

        var audioTime = this.refs.audioTime;
        var speed = this.refs.audioSpeed;

        let self = this;

        bindEvent(audioPlay,"click",function(){
            //如果暂停中
            if(audios.paused){
                audios.play();
                setAudioState(1);
            }else{
                audios.pause();
                setAudioState(0);
            }
        });


        function setAudioState(state){
            var audioPlay = self.refs.audioPlay;
            // let statePath=['<path d="M7.086,23.039V0.961L20.719,12L7.086,23.039z"/>','<path d="M5.795,0.984h3.339v22.032H5.795V0.984z"/><path d="M14.865,0.984h3.34v22.032h-3.34V0.984z"/>'];
            // audioPlay.getElementsByTagName("svg")[0].innerHTML=statePath[state];       
            let statePath=['app/images/on.png','app/images/off.png'];
            try {
                audioPlay.getElementsByTagName("img")[0].src=statePath[state];           
            } catch (error) {
                
            }
        }

        setintval(speed,audioTime);        
        function setintval(speed,time){
           
            self.timer = setInterval(function(){
                if(audios.error){
                    clearInterval(self.timer);
                    speed.style.width = '0%';
                    time.innerText="加载失败";
                    setAudioState(0);
                    return;
                }
                speed.style.width = (audios.currentTime / audios.duration)*100+'%';
                time.innerText=s_to_hs(audios.duration - audios.currentTime);
                if(audios.currentTime>audios.duration){
                    clearInterval(self.timer);
                    setAudioState(0)
                }
            },100);
            
         }
         
        // 绑定点击是是事件 T
        var audioInfoBox = this.refs.audioInfoBox;
        var audioBox = this.refs.audioBox;
        bindEvent(audioInfoBtn,'click',function(){
            audioInfoBox.style.transform = "translateY(0)";
            audioBox.style.transform = "translateY(50%)";
            audioBox.style.opacity = "0";
            $(document, document.body).on('touchmove.audiobox', function(e) {
                e.preventDefault();

            })
        });
        bindEvent(audioInfoBox.getElementsByClassName("audioInfoBoxClose")[0],'click',function(){
            audioInfoBox.style.transform = "translateY(101%)";
            audioBox.style.transform = "translateY(0)";
            audioBox.style.opacity = "1";
            // $('body').css({"height":"100%","overflow":"auto"})
            $('body,html').css({"overflow":"auto"});
            $(document, document.body).off('touchmove.audiobox');
            
        });
        self.refs.audioInfoBox.addEventListener("touchmove",function(e){
            e.preventDefault();
        })
        self.refs.audioInfoBoxContent.addEventListener('touchmove', function(e) {
            e.stopPropagation();

        }, false);

        AudioBox.timeaudio.autoPlayTime = audios.currentTime;
        AudioBox.timeaudio.src = audios.src;

    }
     componentWillUnmount(){
        var audios = audiotwo;
        clearInterval(this.timer);
        console.log('zhzhzhzhzzhzhzhzhzhzhzhzhzh')
        audios.pause();
        AudioBox.timeaudio.src = audios.src;
        AudioBox.timeaudio.autoPlayTime = audios.currentTime;
    }

    qihuanpause(){
        var audios = audiotwo;
        console.log('===============',audios.paused)
        if(audios.paused){
            audios.play();
        }else{
            audios.pause();
        }
        return audios.paused;
    }
      
    componentWillReceiveProps(nextProps){
        
        var audios = audiotwo;
        if(this.props.src!=nextProps.src || this.audio.paused){
            audiotwo.src = nextProps.src;
            audiotwo.play();
        }


        AudioBox.timeaudio.src = audios.src;


        this.setState({
            Detail_content:nextProps.Detail_content
        });
    }

    render(){
         return(
            <div style={{zIndex:999,display:"none"}}>
                    {/* <div style={{width:"100%",height:"3rem"}}></div> */}
                    <div className="audioInfoBox" ref="audioInfoBox" style={{height:"100%",backgroundColor:"rgba(0,0,0,0)",padding:"0"}}>
                        <div ref="audioInfoBoxsub" style={{position:"absolute",bottom:"0",background:"rgba(0,0,0,0.9)"}}>
                            <div className="audioInfoBoxClose">
                                <div className="audioInfoBoxClose_close">
                                    <img src={close}/>
                                </div>
                            </div>
                            <div ref="audioInfoBoxContent" className="audioInfoBoxContent">
                                <p dangerouslySetInnerHTML={{__html:this.state.Detail_content}} className={`${i18n.getLocal()!='cn'  ? 'fm-bl' :'fm-ht'}`}>
                                    {
                                        
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                <div>
                    <div className="audioBox" ref="audioBox">
                        <div className="audioSpeedBox">
                             <span ref="audioSpeed" id="audioSpeed"></span>
                        </div>
                        <div className="audioTool">
                            <div className="audioToolLeft">
                            <div onClick={
                                ()=>{typeof (this.props.onTapLeftBtn) === 'function' && this.props.onTapLeftBtn()
                            }}>
                                {/*  */}
                                <img src="app/images/icon/previous.png" />
                            </div>	
                            <div ref="audioPlay" id="audioPlay">
                                {/* <svg viewBox="0 0 24 24" style={{width:"24px",height:"24px",fill:"white"}}>
                                    <path d="M7.086,23.039V0.961L20.719,12L7.086,23.039z"/>
                                </svg> 	 */}
                                <img src="app/images/off.png" />
                            </div>	
                            <div onClick={
                                ()=>typeof (this.props.onTapRightBtn) === 'function' && this.props.onTapRightBtn()
                            }>
                                {/*  */}
                                <img src="app/images/icon/next.png" />
                            </div>	
                            </div>
                            <div className="audioToolRight">
                                <span ref="audioTime" id="audioTime">00:00</span>
                                <div ref="audioInfoBtn" id="audioInfoBtn">
                                    {/*  */}
                                    <img src="app/images/icon/t.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function bindEvent(ele, eventName, func){
    try{
            if(typeof(eventName) === "object"){
               for(let i in eventName){
                     if(window.addEventListener){
                 ele.addEventListener(eventName[i], func);
               }
               else{
                 events('on' + eventName, func);
               }
               }
         }else{
              if(window.addEventListener){
             ele.addEventListener(eventName, func);
           }
           else{
             events('on' + eventName, func);
           }
         }
    }catch(e){
        
    }
 }
 //秒数转换
 function s_to_hs(s){
    if(!s){
        return "00:00";
    };
    var h;
    h  =   Math.floor(s/60);
    s  =   parseInt(s%60);
    
    h    +=    '';
    s    +=    '';
    h  =   (h.length==1)?'0'+h:h;
    s  =   (s.length==1)?'0'+s:s;
    return h+':'+s;
}


