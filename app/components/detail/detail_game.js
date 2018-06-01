import React from 'react';
import ReactDOM from 'react-dom';
import detail_sp from '../../css/detail_sp.css';
import Detail_sp from './Detail';
import { Link } from "react-router-dom";
import $ from "jquery";
import jTimeline from '../../lib/jTimeline';
import jCanvas from '../../lib/jCanvas';
import i18n from '../../i18n/i18n';

export default class Detail_game extends React.Component{
	constructor(props, context, updater){
       super(props, context, updater);
        this.isX;
	}
	timelineCache;
	pauseTimeline() {
		this.timelineCache && this.timelineCache.pause();
	}
	playTimeline() {
		this.timelineCache && this.timelineCache.play();
	}
	componentWillUnmount(){
		this.isX = true;
	}
	componentDidMount(){
            //   let _this = this;
	        //     var  w=164;
            //   var  h=164;
	        //     var stage = jCanvas.stage();
            //     $(stage._element).appendTo($(this.refs.c_canvas));
            //     stage.resize(w,h);
            //     $(stage._element).width('1.5rem').height('1.5rem').css({'text-align':'center'});
            //     var  arc = jCanvas.circle();
            //     arc.cx(w/2);
            //     arc.cy(h/2);
            //     arc.r(w/2 - 4);
            //     arc.sAngle(-Math.PI/2);
            //     arc.eAngle(Math.PI/4*3*2);
            //     arc.stroke('#fff');
            //     arc.strokeWidth(4);
            //     stage.append(arc);

            	// var line = jTimeline();
            	// var that = this;
             	// line = line.to(arc,10,{sAngle:Math.PI/4*3*2}).callback(function(){
             	// arc.remove();
             	//  	//$(that.refs.c_second).remove();
             	//  	//$('.djs').hide();
			    //   if(that.updater.isMounted(that)){
                //   window.location="#Box_game";
             	//   }else{
				// 	console.log("组件已卸载");
				//   }
             	// }).play();
				 this.showresizssss();
            //  	line.on('progress',function(time){

			// 		if(that.updater.isMounted(that)){
			// 			time  = 10-Math.floor(time);
			// 			that.refs.second.innerText=time;
			// 		}
            // });
	}
	showresizssss(){
		let _this = this;
	            var  w=164;
              var  h=164;
	            var stage = jCanvas.stage();
                $(stage._element).appendTo($(this.refs.c_canvas));
                stage.resize(w,h);
                $(stage._element).width('1.5rem').height('1.5rem').css({'text-align':'center'});
                var  arc = jCanvas.circle();
                arc.cx(w/2);
                arc.cy(h/2);
                arc.r(w/2 - 4);
                arc.sAngle(-Math.PI/2);
                arc.eAngle(Math.PI/4*3*2);
                arc.stroke('#fff');
                arc.strokeWidth(4);
                stage.append(arc);
		var line = jTimeline();
				var that = this;
             	line = line.to(arc,10,{sAngle:Math.PI/4*3*2}).callback(function(){
             	arc.remove();
			      if(that.updater.isMounted(that)){
                  window.location="#Box_game";
             	  }else{
					console.log("组件已卸载");
				  }
				  that.timelineCache = null;
				 }).play();
		this.timelineCache = line;
		line.on('progress',function(time){
			if(that.updater.isMounted(that)){
				time  = 10-Math.floor(time);
				that.refs.second.innerText=time;
			}
	});
	}
	closeresize(){
		
	}
	render(){
		return(<div>
                {
                    this.props.children
                }
			<div className="vca_detail_game">

			{/* <div className="vca_datail_game_back">
			   <a href="javascript:window.history.go(-1)"><img src={"app/images/detail/back.png"} style={{width: '.22rem',height: '.42rem'}}/></a>
			</div> */}
			<div className="vca_detail_game_tit">
			{
				i18n.getLocal()=='cn'? 
				[<span className="fm-fr">化妆盒</span>,
			<p className="fm-st" style={{fontSize:".4rem"}}>1926</p>]:[<span className="fm-fr"><big>R</big><small>OSES VANITY CASE</small></span>,
                <p className="fm-st" style={{fontSize:".4rem"}}>1926</p>]
			}
			 </div>
			<div className="vca_detail_game_sp">
			    <img src={"app/images/detail/sp.png"} />
			</div>
			  <div ref="c_canvas"  className="vca_detail_game_time">
			       <div  ref='c_second' style={{ width: '1.5rem',position: 'absolute',left: 0,marginLeft: '-.75rem',display:'flex',alignItems: 'center',justifyContent: 'center',flexDirection: 'column',height:'1.5rem',left:'50%',top: 'auto'}}>
				   {
									i18n.getLocal()=='cn' &&
									<span className={'djs fm-ht'}>{/*倒计时*/}</span>
							  }
						   <span ref="second"  className="second fm-qb"></span>
			       </div>
			  </div>
			  <div className="vca_detail_game_detail">
			  {

				  i18n.getLocal()=='cn'?
			     <span className="fm-ht">细赏精致华丽的化妆盒</span>:<span className="fm-ht">Observe this Roses vanity case carefully
				 </span>

			  }
			  </div>
			  {  
				   i18n.getLocal()=='cn'?
			     <Link to='/Box_game'><input type="button" className="btn_gee fm-fr" value='开始' onClick={()=>{gtag('event', "CN_Lgallery_Rose_quiz_Star")}}></input></Link>:<Link to='/Box_game'><input type="button" className="btn_gee fm-fr" value='Start' onClick={()=>{gtag('event', "EN_Lgallery_Rose_quiz_Star")}}></input></Link>
			  }
		  </div>
		</div>
		   )
	  }
	}
