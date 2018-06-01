// 问答页面
import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import $ from "jquery";

import ComponentNumber from "./ComponentNumber";
import BottomPopup from "./BottomPopup";

export default class PageQuestionAnsweringTemp extends React.Component{
    constructor(props){
        super(props);
        this.num = 0;
    }
    render(){
        return(
            <div>
            <div className="vca_detail_back" style={{zIndex:99}}>
                <a href="javascript:window.history.go(-1)">
                    <img src={"app/images/detail/back.png"} style={{width: '.24rem',height:'.42rm'}} />
                </a>	
              </div>	
            <ComponentNumber fileType="img" filePath="app/images/xianglian2.png" keyWord="1926" title="Collaret 项链" content="这条项链创造于哪一年" callback={(success)=>{
                  if(success){
                    this.num<10 && this.num++; //测试-记录答对的问题数
                    let PopContent;
                    if(this.num<10){
                        // 回答正确弹出层                                
                        PopContent = (props)=>(
                            <div className="answerResultsPop">
                                <p>恭喜您，解答正确!</p>
                                <p>已成功解答{this.num}/10</p>
                                <SpeedPath num={this.num} />
                                <p>继续循着世家的足迹</p>
                                <p>在此展馆探索@符号的其他谜题</p>
                                <br/>
                                <button onClick={()=>{
                                    this.refs.pop.close();
                                }}>知道了</button>
                            </div>
                        )
                    }else{
                        // 全部集齐弹出层  有礼品
                        PopContent = (props)=>(
                            <div className="answerResultsPop" style={{
                                 margin:'.7rem auto'
                            }}>
                                <p>CONGRATULATIONS</p>
                                <p>恭喜您已成功解密{this.num}件世家臻品，</p>
                                <p>保存此页面，前往展览出口处，</p>
                                <p>领取梵克雅宝为您特别准备的礼品一份，</p>
                                <p>*有效码：2018028362816</p>
                                <img style={{
                                    width:'5.05rem',
                                    display:'block',
                                    margin:"0 auto"
                                }} src="app/images/icon_0047.png" />
                                <button onClick={()=>{
                                    window.location="#";
                                }}>返回首页</button>
                            </div>
                        )
                    }

                     // 全部集齐弹出层  无礼品
                     let PopContent2 = ()=>(
                        <div className="answerResultsPop" style={{
                            margin:'.7rem auto'
                        }}>
                            <p>CONGRATULATIONS</p>
                            <p>恭喜您已成功解密{this.num}件世家臻品，</p>
                            <p>感谢您的参与！</p>
                            <p>继续探索更多作品，</p>
                            <p>细赏梵克雅宝雅艺之美</p>
                            <button onClick={()=>{
                                window.location="#";
                            }}>返回首页</button>
                        </div>
                    )
                    this.refs.pop.show(<PopContent2 />);
                }else{
                    // 回答错误弹出层
                    let PopContent = (props)=>(
                        <div className="answerResultsPop">
                            <p>很遗憾，解答错误</p>
                            <p>请仔细观察，再次选择您的答案</p>
                            <br/>
                            <button onClick={()=>{
                                this.refs.pop.close();
                            }}>再试试</button>
                            <button onClick={function(){
                                window.history.go(-1);
                            }}>返回</button>
                        </div>
                    )
                    this.refs.pop.show(<PopContent />);
                }
            }} />
            
            <BottomPopup ref="pop" />
          

            </div>
        )

    }
}






// 回答问题进度图
class SpeedPath extends React.Component{
    constructor(props){
        super(props);
	}
	componentDidMount(){
		let box = this.refs.box;
		let childs = box.childNodes;
		let num = this.props.num || 0;
		for(let i=0;i<childs.length;i++){
			let child = childs[i];
			if(i<num){
				child.style.stroke = "rgb(255,255,255)";
			}
			else{
				child.style.stroke = "rgba(255,255,255,0.5)";
			}
		}
	}
	render(){
		return(
			<svg ref={"box"} x="0px" y="0px" width="3.72rem" style={{
				display:'block',
				margin:'.4rem auto'
			}} viewBox="0 0 347.411 25.502">
				
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M0.767,23.147
					c7.462,1.544,21.435,0.436,29.04-5.584"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M34.393,13.917
					c8.339-4.827,23.121-4.947,32.014-4.226c10.162,0.824,18.126,4.119,6.317,6.866c-7.597,1.766-2.125,3.078,3.842,3.863"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M84.808,21.225
					c2.306,0.154,13.906,0.605,23.074-0.377"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M113.198,20.281
					c5.39-0.891,8.132-2.444,3.743-5.098c-11.811-7.141-1.923-8.514,2.196-9.613c2.274-0.606,13.079,0.21,25.954,0.37"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M149.375,5.967
					c9.313-0.005,19.297-0.446,27.713-2.044"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M181.313,3.188
					c19.887-3.143,36.125-1.233,24.063,5.953c-12.908,7.69-5.493,10.162-2.471,10.711c0.723,0.132,3.35-0.036,7.032-0.355"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M213.166,19.204
					c12.192-1.138,31.354-3.221,36.702-2.648"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M254.484,18.461
					c0.972,0.945,2.423,2.156,11.051,1.982c12.601-0.253,13.994-0.866,13.994-0.866"/>
			    <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M285.746,19.229c0,0,16.591-1.707,24.067-5.646"
					/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M314.611,11.373
					c11.029-4.305,21.004-2.525,32.032,7.857"/>
				
			</svg>
		)
	}
}