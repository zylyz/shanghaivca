import React from 'react';
import ReactDOM from 'react-dom';
import Detail_game from './detail_game';
import { Link } from "react-router-dom";
import detail_sp from '../../css/detail_sp.css';
import util from "../../lib/jUtil";
import jMove from "../../lib/jMove";
import BottomPopup from "../../components/BottomPopup";
import Game_Bg from "../Game_Bg";
import api from '../../lib/api';
import i18n from "../../i18n/i18n";

import PageQuestionAnswering from "../page_QuestionAnswering";

export default class Box_game extends React.Component {
	static touchmove = function(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	constructor(props) {
		super(props);
		this.pageQuestionAnswering = new PageQuestionAnswering();
		this.pageQuestionAnswering.init("25");

		var userinfos = api.doGetUserInfo();
        userinfos.then((datas)=>{
			return; 
            console.log('22222')
            this.questionList2 = datas.data.questionList;
            console.log('=questionList2',this.questionList2)
            this.questionList2Key = Object.keys(this.questionList2);
            for(let s in this.questionList2Key){
                let keyName = this.questionList2Key[s];
                this.questionList2Key[s]=keyName.replace("question","");
            }
            console.log('questionList2Key',this.questionList2Key);

            if(this.isInit){
                try {
                    let id = this.props.match.params.id;
                    let s = this.questionList2Key.includes(id.toString())
                    if(s){
						// $(document, document.body).on('touchmove', function(e) {
						// 	if(location.hash == '#/Box_game'){
						// 		e.preventDefault();
						// 	}
				
						// })
                       this.result(true,id);         
                    }
                } catch (error) {
                    
                }
            }
        });
		this.targetPoint= [
			[86, 174],
			[184, 121],
			[292, 65]
		];
		this.state={
			isFirst : true,
			isError : false
		};
        /**
		 * 正确答案
		 * 图案索引:位置索引
         * @type {{0: number}}
         */
		this.rightAnswer={
			'0':'1',
			'1':'0',
			'2':'2'
		};
        /**
		 * 当前答案
         * @type {{}}
         */
		this.answer = {};
		window.restart  = this.restart.bind(this);
	}
	componentDidMount() {
        this.isInit = true;
		let _this = this;
		var c = $(this.refs.c_img);
		var ims = c.find('.flower');
		var startX, startY;

		util.touch.single(ims, {
			down: function(pos) {
				startX = $(this).data('x') || 0;
				startY = $(this).data('y') || 0;
			},
			move: function(dp, tpos, pos, e) {
				let obj = $(this);

				if(!!this.dataset.complete) {
					return
				};
				dp = {
					x: dp.deltaX / 100 + startX,
					y: dp.deltaY / 100 + startY
				};
				jMove.css(obj, {
					x: dp.x,
					y: dp.y
				});
				obj.data('x', dp.x).data('y', dp.y);
                //_this.cs(this);
                var index = obj.data('index') - 1;
				var r = _this.checkPoint(dp.x * 100, dp.y * 100, index);
				if(r && r.length) {
					jMove.css(obj, {
						x: r[1] + 'rem',
						y: r[2] + 'rem'
					});
					_this.targetPoint[r[0]].isUse = true;
					this.dataset.complete = true;
					_this.answer[index] = r[0];
				}
			},
			up: function() {
				if(!this.dataset.complete) {
					jMove.css($(this), {
						x: 0,
						y: 0
					});
					$(this).data('x', 0).data('y', 0);
				}
			}
		});
		document.body.addEventListener("touchmove", Box_game.touchmove, { passive: false });
	}
	componentWillUnmount(){
		
		document.body.removeEventListener("touchmove", Box_game.touchmove, { passive: false });
	}
	get oPoint() {
		return [
			[45, 440],
			[209, 440],
			[375, 440],
		]
	}

    /**
	 * 检查答案
     */
	checkAnswer(){
        var r = [];
		//**********
		for(var o in this.answer){
            if(this.answer[o] != this.rightAnswer[o]){
                r.push(this.answer[o]);
            }
		}
		return r;
	}

    /**
	 * 检查坐标
     * @param x
     * @param y
     * @param index
     * @returns {*}
     */
	checkPoint(x, y, index) {
		var tp = this.targetPoint;
		let point = this.oPoint[index];
		let i = 0;
		for(;i<tp.length;i++){
            if(tp[i].isUse) {
                continue;
            }
            var tx = tp[i][0] - point[0],
                ty = tp[i][1] - point[1];
            if(Math.abs(tx - x) < 50 && Math.abs(ty - y) < 50) {
                return [i, tx / 100, ty / 100];
            }
		}
		return undefined;
	}
	async submitQues(no, status) {
        no = no 
        // console.log(this.state.data["No"]);

        try {
            var r = await api.doQuestion(no, status);
            console.log('哎',r);
        } catch (ex) {
            console.log('submit error' + ex);
        }
    }

    onError(no) {
        //this.submitQues(no, 0);
    }

    onRight(no) {
        this.submitQues(no, 1);
    }
	async onComplete (){
		try {
			var r = await  api.doGetCode();
			console.log('累',r)
			if(r.errorcode == 0){
				return r.data.code;
			}
			return false;
		} catch (ex) {
			return false
		}

    }
    /**
	 * 重来
     */
	restart(){
		this.answer = {};
		jMove.css($('.flower').data('x',0).data('y',0),{x:0,y:0});
		this.targetPoint.forEach(p=>{p.isUse=false;});
		Array.from($('.flower')).forEach(p=>{p.dataset.complete='';});
		 $(".vca_box_game_div div").removeClass("error_n_animation").removeClass("n_animation").removeClass('success')
		 this.setState({
		 	isFirst:true,
		 	isError:false
		 });
	}
	complete(){
		if(Object.keys(this.answer).length<3){
			return;
		}
 
        let isCn = i18n.getLocal()=='cn';

		var r =this.checkAnswer();
		if(r.length){
			/**************************************************************/
			/*************************************************************/
			let rose = $(".vca_box_game_div div");
			for(let i=0;i<r.length;i++){
				$(rose[r[i]]).addClass("error_n_animation");
			}
			this.setState({
				isFirst :false,
				isError : true
			})
			this.onError('25')
			return;
		}
		$(".vca_box_game_div div").addClass("n_animation success");
		
	
		    this.pageQuestionAnswering.result(true,"25",(pop)=>{
				this.refs.pop.show(pop);
		        console.log('********',pop);
			});

		return;
		// 回答正确
		/*****************************************************/
			//  答题记录本地缓存数据测试
			
			// let questionList = JSON.parse(localStorage.questionList || "{}");
			// console.log(questionList);
			// questionList["25"] = 1;
			let num = this.questionList2Key.length; //获得答题记录进度
			// var str = JSON.stringify(questionList);
			// localStorage.questionList = str;
			
			// var code = await this.onComplete();
			num++;
			if(num>=10){
				num=10;
			}
		/*****************************************************/
		let PopCompletion = (props)=>(
            isCn?
            <div className="answerResultsPop fm-bl" style={{
                margin: '.7rem auto'
            }}>
                <p>CONGRATULATIONS</p>
                <p>恭喜您已成功解密10件世家臻品，</p>
                <p>感谢您的参与！</p>
                <p>继续探索更多作品，</p>
                <p>细赏梵克雅宝雅艺之美</p>
                <button onClick={() => {
                    window.history.go(-1);
                }}>返回
                </button>
            </div>:
            <div className="answerResultsPop fm-bl" style={{
                margin: '.7rem auto'
            }}>
                <p>CONGRATULATIONS</p>
                <p>Thank you for your participation,you have</p>
                <p>succeeded in unlocking all masterpieces. </p>
                <p>Continue to explore more of Van Cleef & Arpels High Jewelry creations.</p>
                <button onClick={() => {
                    window.history.go(-1);
                }} className="fm-fr">Back
                </button>
            </div>
        );
			// 集齐
			/***********************************/
			 var code =this.onComplete();
			 code.then((datacode)=>{
				 this.datacodes = datacode;
				 if(num>=10&&this.datacodes&&!localStorage.getItem("qlist")){
					localStorage.setItem('qlist',1);
				 let PopFirstCompletion = (props)=>(
					isCn?
					<div className="answerResultsPop" style={{
						margin: '.7rem auto'
					}}>
						<p>CONGRATULATIONS</p>
						<p>恭喜您已成功解密10件世家臻品，</p>
						<p>截图并保存此页面，前往礼品兑换处，</p>
						<p>可领取礼品一份。</p>
						<p>*有效验证码：{this.datacodes}</p>
						<img style={{
							width: '5.05rem',
							display: 'block',
							margin: "0 auto"
						}} src="app/images/icon_0047.png"/>
						<button onClick={() => {
							window.history.go(-3);
						}}>返回
						</button>
		
					</div>:
					<div className="answerResultsPop fm-bl" style={{
						margin: '.7rem auto'
					}}>
						<p>CONGRATULATIONS</p>
						<p>ou have succeeded in unlocking all masterpieces!</p>
						<p>Save the screenshots and go to the gift </p>
						<p>redemption area to redeem a gift.</p>
						<p>Effective code：{props.code}</p>
						<img style={{
							width: '5.05rem',
							display: 'block',
							margin: "0 auto"
						}} src="app/images/icon_0047.png"/>
						<button onClick={() => {
							window.history.go(-3);
						}} className="fm-fr">Back
						</button>
		
					
					</div>
				);
				/***********************************/  
	
				// num = num>10?10:num;
				this.refs.pop.show(<PopFirstCompletion num={num} />);
			}else if(num>=10&&localStorage.getItem("qlist")){
				<PopCompletion/>
			}else{
				// 回答正确
				this.onRight('25')
				let PopSuccess = (props)=>(
					isCn?
					<div className="answerResultsPop">
						<p>恭喜您，解答正确!</p>
						<p>已成功解答{props.num || 1}/10</p>
						<SpeedPath num={props.num || 1}/>
						<p>继续循着世家的足迹</p>
						<p>
							在此展馆探索
							<img src="app/images/icon/icon_1.png"
									style={{margin: "0 1rem", width: ".4rem", margin: "0 3px", verticalAlign: "bottom"}}/>
							符号的其他谜题
						</p>
						<br/>
						<button onClick={() => {
						   window.history.go(-3);
						}}>知道了
						</button>
					</div>:
					<div className="answerResultsPop fm-bl">
						<p>Congratulations！</p>
						<p>you have completed{props.num || 1}/10</p>
						<SpeedPath num={props.num || 1}/>
						<p>Continue to explore other pieces with<img src="app/images/icon/icon_1.png"
									style={{margin: "0 1rem", width: ".4rem", margin: "0 3px", verticalAlign: "bottom"}}/>
									this icon
						</p>
						<br/>
						<button onClick={() => {
						window.history.go(-3);
						}} className="fm-fr">Yes
						</button>
					</div>
				);
	
			   this.refs.pop.show(<PopSuccess num={num} />);
			}
			 })
			

		setTimeout(function(){
		 // location.href='#/Box_game_suc';
	    },800);
	}
	cs(target, callback) {

		if(!target) return;
		let _this = this;
		let box = this.refs.box;
		let items = box.childNodes;
		// let items = box.getElementsByClassName("box");

		for(let i = 0; i < items.length; i++) {
			let item = items[i];
			if(item.childNodes.length > 0) continue;
			let rect = item.getBoundingClientRect();
			let rect2 = target.getBoundingClientRect();
			//  console.log(rect);
			let ss = _this.collide(rect, rect2);
			if(ss) {
				item.style.borderColor = "red";

				//			    target.removeAttribute("style");
				target.style.borderColor = "blue";

				target.dataset.complete = true;

				//	     		target.style.tranform = "translateX("+rect.height/2+"px) translateY("+rect.height/2+"px)";
				let x = rect.left + (rect.width / 2);
				let y = rect.top + (rect.height / 2);

				jMove.css($(target), {
					x: x / 100,
					y: y / 100
				});
				//              $(this).data('x',80).data('y',80);
				return true;
			} else {
				item.style.borderColor = "white";
			}
		}
		return false;
	}
	collide(rect1, rect2) {
		var maxX, maxY, minX, minY;
		let x1, y1, x2, y2;
		x1 = x1 || rect1.left;
		y1 = rect1.y || rect1.top;
		x2 = rect2.x || rect2.left;
		y2 = rect2.y || rect2.top;
		maxX = x1 + rect1.width >= rect2.x + rect2.width ? rect1.x + rect1.width : x2 + rect2.width
		maxY = y1 + rect1.height >= y2 + rect2.height ? y1 + rect1.height : y2 + rect2.height;
		minX = x1 <= x2 ? x1 : x2
		minY = y1 <= y2 ? y1 : y2;

		if(maxX - minX <= (rect1.width + rect2.width / 2) && maxY - minY <= (rect1.height + rect2.height / 2)) {
			return true;
		} else {
			return false;
		}
	}
	render() {
		return(<div>
			<Game_Bg/>
			 <div className="vca_box_game">
			   <div className="vca_box_game_back">
			      <a href="javascript:window.history.go(-1)"><img src={"app/images/detail/back.png"} style={{width: '.2rem',height: '.41rem'}}/></a>
			  </div>
			  	<div className="vca_box_game_tit">
				  {
					    i18n.getLocal()=='cn'?
                        [<span className="fm-fr">化妆盒</span>,
					   	<p className="fm-st" style={{fontSize:".4rem"}}>1926</p>]:[<span className="fm-fr"><big>R</big><small>OSES VANITY CASE</small></span>,
					   	<p className="fm-st" style={{fontSize:".4rem"}}>1926</p>]
				  }				   
						   </div>

	      		 <div className="vca_box_game_sp">
	      		 		      <div className="vca_box_game_div" ref="box">
	      		 	     <div className="div1"></div>
                         <div className="div2"></div>
                         <div className="div3"></div>
	      		 </div>
	      		 		<div className="c-flower">
	      		 		<img src={"app/images/detail/demosp.png"} />
	      		 		 <div className="vca_box_game_box" ref="c_img">
			            <div className="flower-1 flower" data-index="1">
			            <img src={"app/images/rr3.png"}    />
			            </div>
			            <div className="flower-2 flower" data-index="2">
			            <img src={"app/images/mu.png"}    />
			            </div>
			            <div className="flower-3 flower" data-index="3">
			            <img src={"app/images/er3.png"}    />
			            </div>
	      		 		</div>
			      </div>
			      </div>
			        {
			      	 this.state.isFirst ?      <div><div className="vca_box_game_tit2">
					   {
						i18n.getLocal()=='cn'?
			            <span className="fm-ht">将装饰主义风格的自然花卉图案<br />置于正确位置</span>:<span className="fm-bl">Put the pattern in the right place</span>
					   }
			      </div>
			      	<div className="vca_box_game_suc">
					  {
						  i18n.getLocal()=='cn'?
			       <input className="bftn_gee fm-fr" type='button' value="完成" onClick={()=>{
						   let ss = this.complete();
						   gtag('event','CN_Lgallery_Rose_quiz_confirm')
			       }}></input>:<input className="bftn_gee fm-fr" type='button' value="Confirm" onClick={()=>{
					let ss = this.complete();
					gtag('event','EN_Lgallery_Rose_quiz_confirm')
			}}></input>
				}
			    </div></div>
			      :''
			      }

			      {
			      	 this.state.isError ?     <div><div className="vca_box_game_tit3">
					   {
						   i18n.getLocal()=='cn'?
			            <span className="fm-ht">很遗憾，解答错误请仔细观察，再次选择您的答案</span>:<span className="fm-ht">The answer is incorrect Please watch it carefully and try again</span>
					   }
			      </div>
			      	<div className="box_game_lose_btn">
					  {
						i18n.getLocal()=='cn'?
			            <a onClick={()=>{this.restart();gtag('event','CN_Lgallery_Rose_quiz_Restart')}}><input className="bftn_gee fm-fr" type="button" value="重来"></input></a>:<a onClick={()=>{this.restart();gtag('event','EN_Lgallery_Rose_quiz_Restart')}}><input className="bftn_gee fm-fr" type="button" value="Restart"></input></a>
					  } 
					</div></div>
			      :''
			      }
			 </div>
			    <BottomPopup ref="pop" />
			</div>)
	    }
}























/*********************************************************************/
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
				child.style.stroke = "rgba(255,255,255,0.4)";
			}
		}
	}
	render(){
		return(
			<svg ref={"box"} x="0px" y="0px" width="3.72rem" style={{
				display:'block',
				margin:'.5rem auto'
			}} viewBox="0 0 347.411 25.502">
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M0.767,23.147 c7.462,1.544,21.435,0.436,29.04-5.584"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M34.393,13.917 c8.339-4.827,23.121-4.947,32.014-4.226c10.162,0.824,18.126,4.119,6.317,6.866c-7.597,1.766-2.125,3.078,3.842,3.863"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M84.808,21.225 c2.306,0.154,13.906,0.605,23.074-0.377"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M113.198,20.281 c5.39-0.891,8.132-2.444,3.743-5.098c-11.811-7.141-1.923-8.514,2.196-9.613c2.274-0.606,13.079,0.21,25.954,0.37"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M149.375,5.967 c9.313-0.005,19.297-0.446,27.713-2.044"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M181.313,3.188 c19.887-3.143,36.125-1.233,24.063,5.953c-12.908,7.69-5.493,10.162-2.471,10.711c0.723,0.132,3.35-0.036,7.032-0.355"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M213.166,19.204 c12.192-1.138,31.354-3.221,36.702-2.648"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M254.484,18.461 c0.972,0.945,2.423,2.156,11.051,1.982c12.601-0.253,13.994-0.866,13.994-0.866"/>
			    <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M285.746,19.229c0,0,16.591-1.707,24.067-5.646"/>
				<path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M314.611,11.373 c11.029-4.305,21.004-2.525,32.032,7.857"/>
			</svg>
		)
	}
}
