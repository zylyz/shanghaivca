import React from 'react';
import ReactDOM from 'react-dom';
import detail_sp from '../../css/detail_sp.css';
import Detail_game from './detail_game';
import {Link} from 'react-router-dom';

export default class Detail_sp extends React.Component{
	      render(){
	      	return(
	      		<div>
	      		 <div className="vca_detail_backg">
	      		    <div className="vca_detail_back">
                        <a href="javascript:window.history.go(-1)">
                            <img src={"app/images/detail/back.png"} style={{width: '.3rem'}} />
                        </a>	
	      		    </div>
	      		    <div className="vca_detail_tit1">
	      		         <span><small>一</small>   LARGE GALLERY   <small>一</small></span>
	      		         <h4><span>10 MUST SEE PIECES</span></h4>
	      		    </div>
	      		    <div className="vca_detail_search">
								<a href="#PageSearch">
	      		      <img src={"app/images/icon/icon_9.png"} style={{width: '.6rem'}} />
	      		    </a>
								</div>
	      		    <div className="vca_detail_mbox">
	      		       <img src={"app/images/hua6.png"} style={{width: '3rem'}} />
	      		    </div>
	                <div className="vca_detail_mbox_tit">
	                      {/* <img src={"app/images/meigui.png"} style={{width: '4rem'}}/> */}
	                   <p>1926</p>
	                </div>
	      		    <div className="vca_detail_mbox_detail">
	      		      <p>金玉, 珐琅, 红宝石, 蓝宝石, 祖母绿, 钻石 <br />Van Cleef & Arpels 梵克雅宝藏品</p>
	      		    </div>
	      		    <div className="vca_detail_xinz">
	      		      <img src={"app/images/xinz.png"} style={{width: '5.5rem'}} />
	      		    </div>
	      		    <div className="vca_detail_mbox_detail2">
	      		       <p>1920年代, 化妆盒是优雅淑女的随身配饰之一, 通常内含镜子、粉盒和邀舞卡等。这枚以花卉为主题的百宝匣嵌有淡紫色玉石, 饰以玫瑰切割钻石、绿宝石、红宝石、以及水滴型黄色蓝宝石组成的玫瑰图案, 展现了世家装饰艺术风格的自然美学。</p>
	      		    </div>
	      		    <Link to='/Detail_game3'><img src={"app/images/detail/jiemi.png"} style={{width: '7rem',margin: "auto",
    display:" block",
    paddingBottom: ".4rem",
    marginTop: ".8rem"}} /></Link>
	      		  </div>
	      		</div>
	      	)
	 }
}

