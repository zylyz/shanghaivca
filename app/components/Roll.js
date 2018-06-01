import React from "react";
import ReactDOM from "react-dom";
import Roll_chose from '../css/Roll.css';
import {Link} from 'react-router-dom';
import Shade from "./Shade"; 
import {Collerettes, matter} from '../lib/Datas.json';
import BgMusic from "./BgMusic";
export default class Rolls extends React.Component{
    constructor(props){
       super(props);
       this.state = {
        Collerettes: Collerettes,
        matter: matter
       }
    }
    render(){
        console.log('ii',Collerettes);
        console.log('mm',matter)
        return(
            <div className="Rolls_">
                {/* <div>
                   {
                       this.state.matter.map(function(data){
                           return <span>
                               {data.img}
                           </span>
                       })
                   }
                </div> */}
                <BgMusic music="app/media/bgm.mp3"/>
                <div className="bgimages">
                    <div className="rolls">
                    <a href="javascript:window.history.go(-1)">
                        <img  src={'app/images/back.png'} className="g1" alt="1"/></a>
                        <span className="sizes"> 
                        <img src={"app/images/detail/samllll.png"} style={{width: '2.94rem', display:"block",margin:"auto"}} />
                     <img src={"app/images/largetitlemap.png"} style={{display:"block",width:"3.64rem",height:".38rem",margin:"auto",marginTop:".28rem"}}/>
                    
                        </span>
                    </div>
                    <div className="referral fm-ht" >
                        <p> Van Cleef & Arpels 梵克雅宝诞生于优雅与时尚的荟萃之地--巴黎，浸染浓郁的艺术气息，在珠宝的殿堂中，演绎着妩媚、灵动、高贵......的美学价值，历经百年，淬炼出优雅和璀璨的独特眼界，成为众多名流雅士的珍藏。而今，10件不容错过的稀世珍品被荟集于此，向公众展示着Van Cleef & Arpels 梵克雅宝的百年珠宝传奇。</p>
                    </div>
                    <a href="#Detail_sp" style={{textDecoration:"none"}}>
                    <div className="recommend">
                         <p className="wordage fm-st">— 推荐展品 — </p>
                         <img src={'app/images/sp.png'} className="photo" alt="3"/>
                         <p className="wordages">
                             <span> <span className="fm-fr"><h2 style={{display: 'inline'}}>N</h2>ÉCESSAIRE</span><span className="fm-st"> 化妆盒</span></span>
                             <img src={'app/images/icon/yaoshi.png'} alt=""/>
                         </p>
                         <p className="times">1926</p>
                    </div>
                    </a>
       
                    <a href="#TempDetail2">
                        <div className="brooch">
                            <img src={'app/images/hua6.png'} className="g7" alt="6"/><br/>
                            <p className="peony">
                            <h2 style={{display: 'inline'}}>P</h2>EONY <span className="bigboss">胸针 </span>
                                <img src={'app/images/icon/yaoshi.png'} alt="7"/> 
                            </p>
                            <p className="times">1937</p>
                        </div>
                    </a>
                    <div className="brooch">
                         <img src={'app/images/ren.png'} className="g9" alt="6"/><br/>
                         <p className="peony">
                            <h2 style={{display: 'inline'}}>S</h2>EQUINED <h2 style={{display: 'inline'}}>D</h2>ANCER <span className="bigboss">胸针 </span>
                              {/* <img src="" alt="7"/>  */}
                         </p>
                         <p className="times">1953</p>
                    </div>
                    <div className="necklace">
                         <img src={'app/images/xianglian3.png'} className="g3" alt="6"/><br/>
                         <p className="peony">
                              <h2 style={{display: 'inline'}}>Z</h2>IP <span className="bigboss">项链</span>
                              <img src={'app/images/icon/yaoshi.png'} alt="7"/> 
                         </p>
                         <p className="times">1951</p>
                    </div>
                    <div className="necklace zhens">
                         <img src={'app/images/zhen.png'} className="gg10" alt="6"/><br/>
                         <p className="peony">
                              <h2 style={{display: 'inline'}}>S</h2>EQUINS <span className="bigboss">胸针</span>
                              <img src={'app/images/icon/yaoshi.png'} alt="7"/>
                         </p>
                         <p className="times">1948</p>
                    </div>
                    <a href="#TempDetail">
                        <div className="necklace">
                            <img src={'app/images/xianglian2.png'} className="g35" alt="6"/><br/>
                            <p className="peony">
                                <h2 style={{display: 'inline'}}>C</h2>OLLARET <span className="bigboss">项链</span>
                                <img src={'app/images/icon/yaoshi.png'} alt="7"/> 
                            </p>
                            {/* <p className="times">1948</p> */}
                        </div>
                    </a>
                    <div className="necklace">
                         <img src={'app/images/xianglian.png'} className="g34" alt="6"/><br/>
                         <p className="peony">
                              <h2 style={{display: 'inline'}}>C</h2>OLLARET <span className="bigboss">项链</span>
                              <img src={'app/images/icon/yaoshi.png'} alt="7"/>
                         </p>
                         <p className="times">1929</p>
                    </div>
                    <div className="necklace">
                         <img src={'app/images/feiji.png'} className="g33" alt="6"/><br/>
                         <p className="peony">
                              <h2 style={{display: 'inline'}}>M</h2>YSTÈRE <h2 style={{display: 'inline'}}>IV</h2> <span className="bigboss">项链</span>
                              <img src={'app/images/icon/yaoshi.png'} alt="7"/> 
                         </p>
                         <p className="times">1956</p>
                    </div>
                    <div className="necklace">
                         <img src={'app/images/h.png'} className="gg11" alt="6"/><br/>
                         <p className="peony">
                              <h2 style={{display: 'inline'}}>F</h2>IVE <h2 style={{display: 'inline'}}>L</h2>EAVES <span className="bigboss">胸针</span>
                              {/* <img src={'app/images/icon/yaoshi.png'} alt="7"/>  */}
                         </p>
                         <p className="times">1967</p>
                    </div>
                    <div className="necklace">
                         <img src={'app/images/long.png'} className="g36" alt="6"/><br/>
                         <p className="peony">
                              <h2 style={{display: 'inline'}}>D</h2>RAGON <span className="bigboss">胸针</span>
                              <img src={'app/images/icon/yaoshi.png'} alt="7"/> 
                         </p>
                         <p className="times">1959</p>
                    </div>
                    <div className="low"></div>
                    
                    <div>
                        <Shade mapId="1" />
                    </div>
                </div>
            </div>
        )
    }
}