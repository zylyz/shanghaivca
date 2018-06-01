import React from "react";
import ReactDOM from "react-dom";
import Shade from "./Shade"; 
import $ from "jquery";
import Pagedownheader from "./page_down_header.js";
import BgMusic from "./BgMusic";
export default class Pagemmallgallery extends React.Component{
     constructor(props){
         super(props);
     }
     componentDidMount(){
        scroll();
     }
     render(){
         return(
            <div className="small_gallery_  mmall">
                <BgMusic music="app/media/bgm.mp3"/>
                <Pagedownheader/>
                <div className="scroll_y" style={{width:"100%",height:"100%", overflow: "hidden"}}>
                    <div className="bgimages">
                    <div className="rolls">
                    <a href="javascript:window.history.go(-1)">
                        <img  src={'app/images/back.png'} className="g1" alt="1"/></a>
                        <span className="sizes"> 
                        <img src={"app/images/centerimg.png"} style={{width:"2.92rem",height:".3rem",display:"block",margin:"auto"}}/>
                            <span>2010年代馆</span>
                        </span>
                        <a href =""><img src={'app/images/icon/musci_0.png'} className="g2" alt="2"/></a>
                    </div>
                    </div>
                    <div className="referral">
                        <p> 2010年代,浪漫情怀与独特创意从未如此激荡。</p>
                        <p>在延续装饰艺术风格的基础上，</p>
                        <p>也孕育了以高级定制时装为灵感的胸针作品。</p>
                        <p>万用珠宝与隐密式镶嵌法于此时悉数登场，</p>
                        <p>在时代的长河中焕发迷人的创意灵光。</p>
                    </div>
                    <div className="recommend">
                        <p className="wordage">一 推荐展品 一 </p>
                    </div>
                    <a href="#PageSmallDetail">
                    <div className="  small_listone" style={{marginTop:".5rem"}}>
                        <div>
                            <img src={"app/images/Links/wegwgeg1.png"}/>
                        </div>
                        <p>蕾丝蝴蝶结胸针 </p>
                        <p>1949</p>
                    </div>
                    </a>
                    <div className="  small_listone">
                        <div>
                            <img src={"app/images/Links/gwef.png"}/>
                        </div>
                        <p>美之精灵胸针 </p>
                        <p>约1944</p>
                    </div>
                    <div className="  small_listone"  style={{marginTop:".5rem"}}>
                        <div>
                            <img src={"app/images/Links/54f1.png"}/>
                        </div>
                        <p>罂粟花胸针 </p>
                        <p>约1944</p>
                    </div>
                    <div className="  small_listone" style={{marginTop:".5rem"}}>
                        <div>
                            <img src={"app/images/Links/tupian1.png"}/>
                        </div>
                        <p>西班牙舞伶胸针</p>
                        <p>1941</p>
                    </div>
                    <div className="  small_listone" style={{marginTop:".5rem"}}>
                        <div>
                            <img src={"app/images/Links/1ss.png"}/>
                        </div>
                        <p>流苏耳环</p>
                        <p>1953</p>
                    </div>
                    <div className="  small_listone" style={{marginTop:"2rem"}}>
                        <div>
                            <img src={"app/images/Links/ada.png"}/>
                        </div>
                        <p>罂粟花胸针</p>
                        <p>1952</p>
                    </div>
                    <div className="  small_listone" style={{marginTop:".5rem"}}>
                        <div>
                            <img src={"app/images/Links/qqq.png"}/>
                        </div>
                        <p>印度图案胸针 </p>
                        <p>1965</p>
                    </div>
                    <div className="  small_listone" style={{marginTop:"2rem"}}>
                        <div>
                            <img src={"app/images/Links/weia.png"}/>
                        </div>
                        <p>圣诞玫瑰胸针和耳环套件</p>
                        {/* <p>1953</p> */}
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/78vb.png"}/>
                        </div>
                        <p>Alhambra 项链</p>
                        <p>1971</p>
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/sada.png"}/>
                        </div>
                        <p>小鸟胸针</p>
                        <p>1965</p>
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/anhui.png"}/>
                        </div>
                        <p>Sublime 项链</p>
                        <p>1988</p>
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/gfv.png"}/>
                        </div>
                        <p>威尼斯项链</p>
                        <p>1985</p>
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/vdfbd.png"}/>
                        </div>
                        <p>蝴蝶胸针</p>
                        <p>2012</p>
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/54.png"}/>
                        </div>
                        <p>三角形图案耳环和手镯套件</p>
                        <p>1997</p>
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/87v4.png"}/>
                        </div>
                        <p> 维多利亚项链和耳环套件</p>
                        <p>2008</p>
                    </div>
                    <div className="  small_listone" >
                        <div>
                            <img src={"app/images/Links/8748ve1.png"}/>
                        </div>
                        <p>飞鸟项链和耳环套件</p>
                        <p>2011</p>
                    </div>
                
                </div>
                {/* <Shadethree/> */}
                <Shade mapId="3" />
            </div>
         )
     }
}
function scroll(){
    var p=0,t=0;
    console.log('1')
        $(window).scroll(function(e){
            e.stopPropagation();
            e.preventDefault();  
            p = $(this).scrollTop();  
            
            if(t<=p){//下滚
                $('.page_down_head').fadeIn();
                $('.page_down_head').css({"z-index":999})
            }  
            
            else{//上滚 
                $('.page_down_head').fadeOut(); 
                $('.p_s_d_header').css({"z-index":999})
                $('.page_down_head').css({"z-index":-999})
            }  
            setTimeout(function(){t = p;},0);         
        });
}