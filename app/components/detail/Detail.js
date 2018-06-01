import React from 'react';
import ReactDOM from 'react-dom';
import detail_sp from '../../css/detail_sp.css';
import Detail_game from './detail_game';
import {Link} from 'react-router-dom';

export default class Detail_sp extends React.Component {

    render() {
        return (
            <div>
                <div className="vca_detail_backg">
                    <div className="vca_detail_back">
                        <a href="javascript:window.history.go(-1)">
                            <img src={"app/images/detail/back.png"} style={{width: '.22rem',height: '.42rem'}}/>
                        </a>
                    </div>
                    <div className="vca_detail_tit1">
                        <img src={"app/images/detail/samllll.png"} style={{width: '2.94rem', height: '.18rem'}} />
                        <h4><span>10 MUST SEE PIECES</span></h4>
                    </div>
                    <div className="vca_detail_search">
                        <a href="#PageSearch">
                            <img src={"app/images/icon/icon_9.png"} style={{width: '.47rem', height: '.49rem'}}/>
                        </a>
                    </div>
                    <div className="vca_detail_mbox">
                        <img src={"app/images/detail/sp.png"} style={{width: '3.11rem'}}/>
                    </div>
                    <div className="vca_detail_mbox_tit">
                        <img src={"app/images/meigui.png"} style={{width: '3.23rem',height: '.44rem'}}/>
                        <p className="fm-fr">1926</p>
                    </div>
                    <div className="vca_detail_mbox_detail fm-ht ">
                        <p>金, 玉, 珐琅, 红宝石, 蓝宝石, 祖母绿, 钻石 <br />Van Cleef & Arpels 梵克雅宝藏品</p>
                    </div>
                    <div className="vca_detail_xinz">
                        <img src={"app/images/xinz.png"} style={{width: '5.5rem'}}/>
                    </div>
                    <div className="vca_detail_mbox_detail2">
                        <p className="fm-ht">1920年代, 化妆盒是优雅淑女的随身配饰之一, 通常内含镜子、粉盒和邀舞卡等。这枚以花卉为主题的百宝匣嵌有淡紫色玉石,
                            饰以玫瑰切割钻石、绿宝石、红宝石、以及水滴型黄色蓝宝石组成的玫瑰图案, 展现了世家装饰艺术风格的自然美学。</p>
                    </div>
                    <Link to='/Detail_game'><img src={"app/images/detail/jiemi.png"}
                                                 className="vca_detail_jiemi"/></Link>
                </div>
            </div>
        )
    }
}

