import React from "react";
import ReactDOM from "react-dom";
import Shade from "./Shade"; 
import $ from "jquery";
import BgMusic from "./BgMusic";
import Pagedownheader from "./page_down_header.js";
export default class Pagesmallgallery extends React.Component{
     constructor(props){
         super(props);


     }
     componentDidMount(){
       // this.refs.test.playMusic();
     }


     render(){
         return(
            <div className="small_gallery_">
                <BgMusic music="app/media/bgm.mp3"/>
                <Pagedownheader ref="test"/>
                <div className="scroll_y" style={{width:"100%",height:"100%",paddingBottom:"1rem", overflow: "hidden"}}>
                    <div className="bgimages">
                    <div className="rolls">
                    <a href="javascript:window.history.go(-1)">
                        <img  src={'app/images/back.png'} className="g1" alt="1"/></a>
                        <span className="sizes"> 
                            <img src={"app/images/smallheader.png"} style={{width:"2.92rem",height:".3rem",display:"block",margin:"auto"}}/>
                            <span>1930年代馆</span>
                        </span>
                    </div>
                    </div>
                    <div className="referral fm-ht  ">
                        <p> 1930年代,浪漫情怀与独特创意从未如此激荡。</p>
                        <p>在延续装饰艺术风格的基础上，</p>
                        <p>也孕育了以高级定制时装为灵感的胸针作品。</p>
                        <p>万用珠宝与隐密式镶嵌法于此时悉数登场，</p>
                        <p>在时代的长河中焕发迷人的创意灵光。</p>
                    </div>
                    <div className="recommend">
                        <p className="wordage fm-st ">一 推荐展品 一 </p>
                    </div>
                    <a href="#PageSmallDetail">
                    <div className="small_listone"style={{marginTop:".5rem"}}>
                        <div>
                            <img src={"app/images/detail/liangduohua.png"}/>
                        </div>
                        <p className="fm-st">两朵花手链</p>
                        <p className="fm-fr year">1939</p>
                    </div>
                    </a>
                    <div className="small_listone" style={{marginTop:"2.5rem"}}>
                        <div>
                            <img src={"app/images/detail/juhua.png"}/>
                        </div>
                        <p className="fm-st">隐密式镶嵌菊花胸针</p>
                        <p className="fm-fr year">1939</p>
                    </div>
                    <div className="small_listone">
                        <div>
                            <img src={"app/images/detail/shozuo.png"}/>
                        </div>
                        <p className="fm-st">鲁多六角形手链</p>
                         <p className="fm-fr year">1939</p>
                    </div>
                    <div className="small_listone">
                        <div>
                            <img src={"app/images/detail/hudiejie.png"}/>
                        </div>
                        <p className="fm-st">立体蝴蝶结胸针</p>
                         <p className="fm-fr year">1937</p>
                    </div>
                </div>
                {/* <Shadetwo /> */}
                <Shade mapId="2" />
            </div>
         )
     }
}
