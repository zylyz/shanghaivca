import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import $ from "jquery";
import HeadNav from "./HeadNav";
import i18n from "../i18n/i18n";
import PageSmallDetail from "./page_small_detail";
import audiotwo from '../lib/musictwo';
// 搜索页面
export default class PageSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: []};
        this.tapBtn = this.tapBtn.bind(this);
        this.delete = this.delete.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    componentDidMount(){
        window.isHomePageLoad = true;
        let datas = i18n.getJSONData("ApplicationData");//.ApplicationData;
        console.log('数据',datas)
        this.setState({
            data:datas
        })
    }
    tapBtn(event){
        event && event.preventDefault();
        let target = event.target;
        if(target.tagName != "LI")return;
        let inputBox = this.refs.inputBox;
        let inputItem = $(inputBox).find('li:empty:first');
        if(inputItem.length<=0){
            this.empty();
        }
        let num = target.innerText;
        inputItem.text(num);
    }
    //清空
    empty(){
        let inputItem = $(this.refs.inputBox).find("li");
        inputItem.each((index,item)=>{
             item.innerText = "";
        });
    }
    //删除
    delete(event){
        event && event.preventDefault();
        let inputBox = this.refs.inputBox;
        let inputItem = $(inputBox).find('li:not(:empty):last');
        if(inputItem.length<=0)return;
        inputItem.text("");
    }
    // 得到输入结果
    getValue(){
        let inputBox = this.refs.inputBox;
        let inputItem = $(inputBox).find('li:not(:empty)');
        let text = '';
        inputItem.each((index,item)=>{
                text+=item.innerText;
        });

        return text;
    }
    showPrompt(text,callback){
        let prompt = this.refs.prompt;
        this.timeout && clearTimeout(this.timeout);
        this.vibration([100]);
        $(prompt).html(text).removeClass("search_prompt_show").addClass("search_prompt_show");
        this.timeout = setTimeout(()=>{
            $(this.refs.prompt).removeClass("search_prompt_show");
            typeof(callback) == "function" && callback();
        },3000);
    }
    vibration(data){
        navigator.vibrate = navigator.vibrate
                || navigator.webkitVibrate
                || navigator.mozVibrate
                || navigator.msVibrate;
 
        if (navigator.vibrate) {
            // 支持
            navigator.vibrate(data);
        }
    }
    render(){  
        let data = this.state.data;
        let isCn = i18n.getLocal()=='cn';
        return(
            <React.Fragment>
                <div className="public">
                    <HeadNav right={false} position={true} />
                </div>
            <div className="numberBox" ref="numberBox" style={{
                justifyContent:"center",
                backgroundImage:"url(app/images/mainPageBg.jpg)"
            }}>
                {/* <div className="vca_detail_back" style={{zIndex:99}}>
                    <a href="javascript:window.history.go(-1)">
                        <img src={"app/images/detail/back.png"} style={{width: '.24rem', height:'.42rem'}} />
                    </a>	
                </div>	 */}

                 <div style={{
                     overflow:"hidden",
                     position:"relative",
                     paddingBottom:".4rem"
                 }}>
                   {isCn?<img src={"app/images/slyy.png"} style={{width:"2.04rem"}}/>:<p className={"numberBox_title "+isCn?"fm-st":"fm-bl"} style={{
                        fontSize:'.45rem',
                        color:'white',
                        textAlign:'center',
                        letterSpacing:"1px"
                    }}>
                        Search
                    </p>}
                    <img className="numberBox_line" src="app/images/xinz.png" />
                 </div>
                 {/* <div className="audioBox_2" style={{
                     marginBottom:0
                 }}>
                        <svg viewBox="0 0 24 24">
                            <path d="M20.507,12.851v5.215c0,1.048-0.847,1.894-1.892,1.894s-1.892-0.846-1.892-1.894v-5.215 c0-1.048,0.847-1.894,1.892-1.894c0.363,0,0.685,0.13,0.973,0.308C18.982,7.61,15.823,4.808,12,4.808 c-3.821,0-6.981,2.802-7.588,6.457c0.289-0.178,0.609-0.308,0.973-0.308c1.046,0,1.893,0.846,1.893,1.894v5.215 c0,1.048-0.847,1.894-1.893,1.894c-1.044,0-1.892-0.846-1.892-1.894v-5.215c0-0.115,0.046-0.214,0.065-0.325H3.514 c0-4.678,3.808-8.485,8.485-8.485c4.68,0,8.487,3.808,8.487,8.485h-0.044C20.462,12.636,20.507,12.736,20.507,12.851z"/>
                        </svg>
                 </div> */}
                 {
                     isCn?[
                        <p key="p1" className="fm-ht" style={{
                            fontSize:'.28rem',marginTop:'.3rem'
                        }}>输入带耳机标志的作品编号</p>,
                        <p key="p2" className="fm-ht" style={{
                            fontSize:'.28rem',
                            marginTop:'.11rem'                   
                        }}>快速了解展品信息
                        </p>
                     ]:<p className="fm-bl" style={{
                        fontSize:'.28rem',marginTop:'.3rem'}}>
                             Enter the number of exhibit (with <img src="app/images/icon/icon_1.png"
                            style={{margin: "0 1rem", width: ".4rem", margin: "0 3px", verticalAlign: "bottom"}}/> icon) to listen the audio
                        </p>
                 }
                 
                 
                 <ul className="numberBox_inputBox fm-qb" ref="inputBox">
                     {
                         Array.apply("", Array(2)).map(()=><li></li>)
                     }
                 </ul>
                 {
                     isCn?
                     <p className="fm-ht" ref="prompt" style={{
                        height:0,
                        overflow:"hidden",
                        transition:"0.3s",
                        fontSize:'.28rem'
                    }}>请输入 <span class="">01-39</span> 之间的有效序号</p>
                    :<p className="fm-qb" ref="prompt" style={{
                        height:0,
                        overflow:"hidden",
                        transition:"0.3s",
                        fontSize:'.28rem'
                    }}>
                        Please enter a valid number between 01-39
                    </p>
                 }
                 <ul className="numberBox_inputBox fm-qb numberBox_inputBox_min" onClick={this.tapBtn}>
                     <li>1</li>
                     <li>2</li>
                     <li>3</li>
                     <li>4</li>
                     <li>5</li>
                     <li>6</li>
                     <li>7</li>
                     <li>8</li>
                     <li>9</li>
                     <li>0</li>
                 </ul>
                 <p style={{
                     fontSize:'.28rem',
                 }}>
                     <span style={{
                        borderBottom:'1px solid white',
                        paddingBottom:'.05rem'
                     }} onClick={this.delete}>{
                         isCn?"清除":"Delete"
                     }</span>                 
                 </p>

                 <input type="button" className="myBtn-1 fm-fr" defaultValue={isCn?"开始探索":"Confirm"} onClick={()=>{
                     isCn?gtag('event', "CN_Search_Confirm"):gtag('event', "EN_Search_Confirm")
                        let val = this.getValue();
                        if(!val){
                            let text = isCn?'请输入 <span class="fm-qb">01-39</span> 之间的有效序号':"Please enter a valid number between 01-39";                                                         
                            this.showPrompt(text);
                            return; 
                        };
                    
                        if(parseInt(val)>39 || parseInt(val)<=0 || val.length<2){
                            // alert("请输入 1-39 之间的有效序号"); 
                            this.empty();   
                            let text = isCn?'请输入 <span class="fm-qb">01-39</span> 之间的有效序号':"Please enter a valid number between 01-39";                                                         
                            this.showPrompt(text,()=>{
                            });
                            return;
                        }
                            let tempArr = data.filter((data) => {
                                var intVal = parseInt(val);
                                return data.No == intVal;
                            });
                            audiotwo.src = tempArr[0].AudioUrl;
                            audiotwo.play();
                            window.location = "#PageSmallDetail/"+parseInt(val);
                 }} style={{
                    margin:".5rem"
                 }} />

                 <img onClick={()=>{
                        window.location = "#";
                        isCn?gtag('event', "CN_Search_Home"):gtag('event', "EN_Search_Home")
                 }} src={isCn?"app/images/homeeej.png":"app/images/enh.png"} style={{
                    width:".9rem",
                    height:'.9rem',
                    margin:".15rem auto"
                 }}/>

                 {/* <div style={{width:"100%",height:"1.86rem"}}></div>
                 <div className="searchBottomBox">
                    <img onClick={()=>{
                        window.location = "#";
                    }} src="app/images/icon_11.png"/>
                 </div> */}

            </div>
            </React.Fragment>
        )
    }
}
