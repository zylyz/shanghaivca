import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

import i18n from "../i18n/i18n";

export default class PageIntroduce extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        let isCn = i18n.getLocal()=='cn';
        return(
           <div className="PageIntroduce">
                <div className="title">
                {   
                    isCn &&
                    [<p>梵克雅宝雅艺之美</p>,
                    <p>典藏臻品回顾展</p>]
                }
                </div>
                <Link to="/"><div><img src={'app/images/close-icon.png'} style={{width: '.44rem', position: 'absolute',right: '.34rem',top: '.5rem'}}/></div></Link>
                <div className="desc">
                    <p>WHEN ELEGANCE MEETS ART</p>
                </div>
                {
                    isCn?
                    <div className="content">
                        <p>从1906年至今，因爱而生的梵克雅宝,</p>
                        <p>自巴黎芳登广场伊始已流传百年。</p>
                        <p>世家将自然灵感糅合匠心工艺,</p>
                        <p>以款款诗意臻品绽放永恒的优雅。</p>
                        <p>在本次  “雅艺之美”  典藏臻品回顾展中,</p>
                        <p>世家已分布于三大展示空间的400余件展品,</p>
                        <p>呈现1920至1960年代的艺术风貌。</p>
                        <p>以及延续至今的传承之美。</p>
                        <p>邀您踏上百年高级珠宝艺术的探秘之旅。</p>
                    </div>:
                    <div className="content fm-bl">
                        <p>Van Cleef & Arpels presents the exhibition </p>
                        <p>“When Elegance Meets Art” at the Today Art</p>
                        <p>Museum in Beijing, from April 21 to August 5,</p>
                        <p>2018. Displayed chronologically, over 360</p>
                        <p>High Jewelry creations and precious objects </p>
                        <p>were carefully selected to reflect the </p>
                        <p>evolution of the Van Cleef & Arpels style.</p>
                    </div>
                }
                {
                    isCn?
                    <div className="footer">
                        <p className="fm-ht">开馆时间</p>
                        <div className="time-box fm-qb">
                        <span className="clock"><img src={"app/images/time_icon.png"} style={{width: '.38rem', height: '.38rem'}}/></span><span className="time">10:30A.M.-18:30P.M.</span>
                        </div>
                        <p className="fm-ht">周一休馆</p>
                    </div>:
                    <div className="footer fm-bl">
                        <p className="fm-bl">Opening hours</p>
                        <div className="fm-qb page_introduce_content">
                            <p>21st APR to 5th AUG, 2018</p>
                            <p>Closed on Mondays, except holidays</p>
                            <p>SUN to THUR, 10:00-18:00</p>
                            <p>FRI to SAT, 10:00-21:00</p>
                        </div>
                    </div>
                }
                
            </div>
        )
    }
}