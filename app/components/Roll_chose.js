import React from "react";
import ReactDOM from "react-dom";
import Roll_chose from '../css/Roll_chose.css';
import Rollscroll from './Roll_scroll';
import i18n from "../i18n/i18n";

export default class Rollchoose extends React.Component{
    constructor(props){
       super(props);
       this.state = {
           data:null,
           selectIndex:0
       };
    }
    handles=()=>{
        let index = this.state.selectIndex;
        if(!index)return;
        let correct = this.isCorrect(index);
        typeof(this.props.callback) === "function" && this.props.callback(correct);
    }
    confirmclick(){
        let isCn = i18n.getLocal()=='cn';
        if(this.props.ids=='24'){
            isCn?gtag('event', "CN_Lgallery_Collaret1_quiz_Confirm"):gtag('event', "EN_Lgallery_Collaret1_quiz_Confirm")
        }else if(this.props.ids=='28'){
            isCn?gtag('event', "CN_Lgallery_Sequined_quiz_Confirm"):gtag('event', "EN_Lgallery_Sequined_quiz_Confirm")
        }else if(this.props.ids=='36'){
            isCn?gtag('event', "CN_Lgallery_Five_quiz_Confirm"):gtag('event', "EN_Lgallery_Five_quiz_Confirm")
        }else if(this.props.ids=='37'){
            isCn?gtag('event', "CN_Lgallery_Dragon_quiz_Confirm"):gtag('event', "EN_Lgallery_Dragon_quiz_Confirm")
        }
    }

    // 判断结果
    isCorrect(index){
        if(!index)return false;

        let keyWord = this.props.keyWord; // 正确列表
        keyWord = typeof(keyWord) === "object"?keyWord:[keyWord];

        for(let i in keyWord){
            let s = keyWord[i];
            if(index.toString() == s.toString())return true;
        }

        return false;
    }
    render(){
        console.log('ksdfllllllllllllllll',this.props.ids)
        return(
            <div className="dancer">
                {this.props.children}
                <div className="titles">
                {/* <a href="javascript:window.history.go(-1)">
                    <img src={'app/images/back.png'} alt="1" />
                </a> */}
                    <div className="titles_p">
                        <span className="tit fm-st" dangerouslySetInnerHTML={{__html:this.props.title}}>{
                            
                        }</span><br/>
                        {
                            this.props.title2 &&
                            <span className="tit1 fm-st" style={{fontSize:'.35rem'}}>{this.props.title2}</span>
                        }
                    </div>
                </div>
                <div className="d_photo" >
                     <img src={this.props.img} alt="" />
                    {this.props.ids=="36"?<p className="ps fm-st cnen" style={{width:"100%","left":"0"}} dangerouslySetInnerHTML={{__html:this.props.content}}></p>:<p className="ps fm-st cnen" dangerouslySetInnerHTML={{__html:this.props.content}}></p>}
                </div>
                <div className="scrolls">
                   <Rollscroll dataList={this.props.dataList} ids={this.props.ids} NodataList={this.props.NodataList} onChange={(index=0)=>{
                        this.setState({selectIndex:index+1});
                   }}  />
                </div>{
                    i18n.getLocal()=='cn'?
                <button onClick={()=>{this.handles();this.confirmclick()}}>
                    {this.state.selectIndex? '确定' : '选择'}
                </button>:<button onClick={()=>{this.handles();this.confirmclick()}} className="fm-fr">
                    {this.state.selectIndex? 'Confirm' : 'Choose'}
                </button>
                }
            </div>
        )
    }
}
