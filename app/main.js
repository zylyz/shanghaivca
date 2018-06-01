import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Redirect, withRouter,HashRouter}  from 'react-router-dom';
import PageMain from "./components/page_header.js";
import PageIntroduce from "./components/page_introduce.js";
import Rolls from "./components/Roll.js";
import Rollchoose from "./components/Roll_chose.js";
import PageMap from "./components/page_map.js";
import PageMap2 from "./components/page_map2.js";
import PageMap3 from "./components/page_map3.js";
import Pagesmallgallery from "./components/page_smallgallery.js";
import Pagemmallgallery from "./components/page_mmallgallery.js";
import PageSmallDetail from "./components/page_small_detail.js";
import { createHashHistory } from 'history';
import Detail_sp from './components/detail/Detail';
import Detail_game from './components/detail/detail_game';
import ComponentNumber from "./components/ComponentNumber";
import Box_game from './components/detail/box_game';
import Box_game_suc from './components/detail/box_game_suc';

// 临时展示页面
import TempDetail from "./components/detail/temp_Detail";
import TempDetail2 from "./components/detail/temp_Detail2";
import  $ from 'jquery';
// 组件测试
import BottomPopup from "./components/BottomPopup";

// 搜索页面
import PageSearch from "./components/page_search";
import PageQuestionAnswering from "./components/page_QuestionAnswering";
// 临时展示页面 答题2
import PageQuestionAnsweringTemp from "./components/page_QuestionAnswering_temp";
//demo数据请求
import Demo from "./components/page_sml_detail";
import audiotwo from './lib/musictwo';
import AudioBox from "./components/AudioBox.js";
import api from './lib/api';
ReactDOM.render(
	<HashRouter>
	    <div>
            <Route path="/" exact component={()=>(
				<div>
					<PageMain/>
				</div>
            )} />
            <Route path="/PageIntroduce" component={PageIntroduce}/>
            <Route path="/Rolls" component={Rolls}/>
            <Route path="/Rollchoose" component={Rollchoose}/>
            <Route path="/PageMap/:id/:type" component={PageMap}/>
            <Route path="/PageMap2" component={PageMap2}/>
            <Route path="/PageMap3" component={PageMap3}/>
            <Route path="/Pagesmallgallery" component={Pagesmallgallery} />
			<Route path="/Pagemmallgallery" component={Pagemmallgallery} />
            <Route path="/PageSmallDetail/:id" component={PageSmallDetail}/>
            <Route path="/Demo/:name" component={Demo}/>
			
			<Route path="/Box_game" component={Box_game} />
			<Route path="/Box_game_suc" component={Box_game_suc} />
			<Route path="/Detail_sp" component={Detail_sp} />
			<Route path="/Detail_game" component={Detail_game} />
			<Route path="/TempDetail" component={TempDetail} />
			<Route path="/TempDetail2" component={TempDetail2} />

			<Route path="/PageSearch" component={PageSearch} />

			<Route path="/Detail_game2" component={PageQuestionAnsweringTemp} />
            
			{/* 游戏界面3  */}
			<Route path="/DetailGame/:id" component={PageQuestionAnswering} />

	     </div>
	 </HashRouter>,
	document.getElementById("app-container")
)

function isweixin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		api.doGetUserInfo().then(function(r){
			if(r&& r.errorcode==0 && r.data && r.data.openid){
		
			}else{
				api.login();
			}
		});
	}};
	isweixin()
	
// api.login();
// 横屏提示
var initWidth= window.innerWidth || document.documentElement.clientWidth,initHeight=window.innerHeight || document.documentElement.clientHeight,
	tryTimes = 0;
// require(["app/images/HorizontalScreenHint.png"], function (l) {
var lastorientation = null, orientationtimer;
window.addEventListener('orientationchange', function (e) {
	var cw = window.innerWidth || document.documentElement.clientWidth;
	var ch = window.innerHeight || document.documentElement.clientHeight;
	var ori = cw < ch;
	this.console.log('llllll',lastorientation == ori);
	if(ori){
		document.getElementById("HorizontalScreenHint").style.display="block";
	}else{
		document.getElementById("HorizontalScreenHint").style.display="none";
	}
}, false);



// })

var hashs = '/Demo,/PageSmallDetail,/DetailGame';
var arrhash = hashs.split(',');
$(document).on('touchmove',function(e){
	var hash = location.hash;
	for(let i =0;i<arrhash.length;i++){
		if(new RegExp(arrhash[i]).test(hash)){
			return;
		}
	}
	e.preventDefault();
});


