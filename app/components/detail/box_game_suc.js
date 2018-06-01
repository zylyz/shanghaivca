import React from 'react';
import ReactDOM from 'react-dom';
import box_game from './box_game';
import { Link } from "react-router-dom";
import detail_sp from '../../css/detail_sp.css';
import $ from "jquery";


export default class Box_game_lose extends React.Component {

	componentDidMount() {
			      		  // $('.box_game_suc_save').on("click",function(){
			      		   //	setTimeout(function(){
             	      		//    $('.box_game_suc_p').html('<p>保存成功！</p>').show("slow");
			      		//  	},100);
	      		       //    });
	}
	render(){
		return(
			<div>
			       <div className="box_game_suc">
			               <div className="box_game_suc_back">
						   <a href="javascript:window.history.go(-3)"><img src={"app/images/detail/back.png"} style={{width: '.22rem',height: '.42rem'}} /></a>
			               </div>
			               <div className="box_game_suc_tit">
                                <span className="fm-fr"><big>R</big><small>OSES VANITY CASE</small></span>
                                <p className="fm-st" style={{fontSize:".4rem"}}>1926</p>
	      		           </div>
	      		           <div className="box_gema_suc_sp">
	      		                 <img src={"app/images/detail/sp.png"} style={{width: '4.85rem'}} />
	      		            </div>
	      		           <div className="box_game_suc_p">
	      		                <p>完成作品</p>
	      		                <span>镶嵌华美宝石,  妆点女子花容轻启这件蕴藏珍宝的化妆盒</span>
	      		           </div>
			       </div>
			</div>
		)
	}
}
