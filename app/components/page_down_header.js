import React from "react";
import $ from "jquery";
import i18n from '../i18n/i18n';
export default class Pagedownheader extends React.Component {
    constructor(props) {
        super(props);
        this.cache = this.props.data;
        this.years = {};
        //this.initData();
        this.imgData = {
            "MG": 'app/images/mdbk.png',
            "LG": 'app/images/lagersmallbk.png',
            'SG': 'app/images/smallimg.png'
        };
        this.imgData2={
            "MG": 'app/images/1940-2010-cnbk.png',
            "LG": 'app/images/lagersmallbk.png',
            'SG': 'app/images/cn-title-sgbk.png'
        };

        // 
        this.yearsArr = [];
        this.arrowClick =this.arrowClick.bind(this);
    }
    menuData ={
        SG:[
            '1900-1910',
            '1920',
            '1930',
        ],
        MG:[
            '1940',
            '1950',
            '1960',
            '1970',
            '1980-1990',
            '2000-2010'

        ]
    }
    componentDidMount() {
        //rightclick();
        // scroll();
        let _this = this;
        $(window).scrollTop(0);
        _this.nav.hide();
        $(window).on('scroll.pagedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (_this.timeid) {
                clearTimeout(_this.timeid);
            }
            var p = $(window).scrollTop();
            _this.timeid = setTimeout(() => {
                // console.log(p + "--" + _this.nav.isShow())
                if (p > 20 && !_this.nav.isShow()) {
                    _this.nav.show();
                    return;
                }
                if (p < 10 && _this.nav.isShow()) {
                    _this.nav.hide();
                }
            }, 1);
        })
    }

    componentDidUpdate() {
        $(window).scrollTop(0);
    }

    componentWillUnmount() {
        $(window).off('scroll.pagedown');
    }

    initData() {
        var _this = this;
        // this.cache.forEach(function (o) {
        //     let y = o.Year;
        //     if (/\D/.test(y)) {
        //         y = /(\d+)/.exec(y)[0];
        //     }
        //     let a = 1900 + Math.floor(y % 1900 / 10) * 10;
        //     a = Math.max(1910, a);
        //     _this.years[a] = a;
        // })
        this.cache.forEach(function (o) {
                let y = o.Area;
                if (/\D/.test(y)) {
                    y = y.replace("年代","");
                }
                _this.years[y] = y;
            })
    }

    nav = (() => {
        let [_isShow, _isShrink] = [false, true];
        let _this = this;
        return {
            show(){
                let $page_down_head= $(_this.refs.page_down_head);
                // console.log($page_down_head.length);
                $page_down_head.css({
                    'overflow': 'auto',
                    'opacity': 1,
                     'webkitTransition': 'opacity 1.5s',
                    'display': "block"
                });
                $page_down_head.css({"z-index": 999}).css('overflow', 'hidden');
                _isShow = true;
            },
            hide(){
                let $page_down_head= $(_this.refs.page_down_head);
                $page_down_head.css({'overflow': 'auto', 'opacity': '0', 'display': 'none'});
                $page_down_head.find('.p_s_d_header').css({"z-index": 999});
                _isShow = false;
                this.shrink();
            },
            /**
             * 收缩
             */
            shrink(){
                let $page_down_head= $(_this.refs.page_down_head);
                $page_down_head.find('.p_s_d_h_right').css({transform: 'rotate(180deg)'})
                $('.p_s_d_h_right img').css({top:"0.5rem"});
                $page_down_head.css({height: "1.5rem"});
                $page_down_head.find('.item').css({opacity: 0, transition: 'opacity 0.5s'});
                _this.refs.first_year.innerText = _this.props.cyear;
                _isShrink = true;
            },
            /**
             * 展开
             */
            spread(){
                
                let $page_down_head= $(_this.refs.page_down_head);
                // _this.refs.first_year.innerText = Object.keys(_this.years)[0];
                _this.refs.first_year.innerText = _this.menuData[_this.props.type][0];
                $('.p_s_d_h_right').css({transform: 'rotate(360deg)'})
                $('.p_s_d_h_right img').css({top:"0"})
                $('.page_down_head').css({height: "auto"});
                $page_down_head.find('.item').css({opacity: 1, transition: 'opacity 2s'});
                _isShrink = false;
            },
            isShow: () => _isShow,
            isShrink: () => _isShrink
        }
    })()

    componentWillReceiveProps(nextProps){
        this.refs.first_year.innerText = nextProps.cyear;
    }

    handleClick(year,cyear) {
        // year = parseInt(year);
        
        // var d = this.cache.filter((data)=>{
        //     let y = data.Year;
        //     if(/\D/.test(y)){
        //         y = /(\d+)/.exec(y)[0];
        //     }
        //     var t =Math.max(y,1910);
        //     return t>=year && t<year+10;
        // })
        //
        // // this.props.onSelect(d)
        // if(this.props.cyear==year){
            if(!this.nav.isShrink()){
                this.props.onSelect(year);
                this.nav.spread();
            }else{
                this.nav.shrink();
            }
            year = year.split("-")[0];
            i18n.getLocal() == 'cn'?gtag('event', 'CN_'+cyear+'_Topbar_'+year+''):gtag('event', 'EN_'+cyear+'_Topbar_'+year+'')
            
        // }else{
        //     this.props.onSelect(year);
        // }
        // this.nav.hide();
    }

    query() {
        window.location = "#/PageSearch";
    }

    arrowClick() {
        if (this.nav.isShrink()) {
            this.nav.spread();
            return;
        }
        this.nav.shrink();
    }

    render() {
        var _this = this;
        return (
            <div ref="page_down_head" className="page_down_head" onClick={()=>this.arrowClick()}>

                <div className="nav-box">
                    <div ref="p_s_d_h_right"  className="p_s_d_h_right"
                         style={{transform: 'rotate(180deg)', width: ".88rem", height: ".83rem"}}>
                        <img src={"./app/images/jiantou.png"} style={{position:"relative",top:"0.5rem"}}/>
                    </div>
        <div className="gallery-name">
        {
            
            i18n.getLocal() != 'cn' ?
            <img src={this.imgData[this.props.type]}/>:<img src={this.imgData2[this.props.type]}/>
            }
            </div>
                    <div className="nav-list">
                        {
                            this.menuData[this.props.type].map(function (o, i) {
                                if (true) {
                                    if (i == 0) {
                                        return (
                                        <div className="nav-item">
                                            <a className="fm-st" onClick={() => _this.handleClick(o,_this.props.cyear)}><span ref="first_year">{o}</span>{i18n.getLocal() != 'cn' ? 's' :'年代馆'}</a>
                                        </div>)
                                    }
                                    return (
                                        <div className="nav-item item">
                                            <div className="nav-line"></div>
                                            <a className="fm-st" onClick={() => _this.handleClick(o,_this.props.cyear)}>{o}{i18n.getLocal() != 'cn' ? 's' :'年代馆'}</a>
                                        </div>)
                                }
                            })

                        }
                        <div className="nav-item item">
                            <div className="nav-line"></div>
                            <div className="fm-st" style={{paddingBottom:'.30rem'}}>

                                {i18n.getLocal() != 'cn' ?
                                    <a onClick={() => {this.query();
                                        gtag('event','EN_'+this.props.cyear+'_Topbar_Search')}}>Search <img src={"./app/images/blackerjiicon.png"}
                                                                                        style={{
                                                                                            position: 'relative',
                                                                                            top: ".08rem",
                                                                                            width: '.5rem',
                                                                                            height: '.5rem'
                                                                                        }}/></a> :
                                    <a onClick={() => {this.query();
                                        gtag('event','CN_'+this.props.cyear+'_Topbar_Search')}}>快速一览 <img src={"./app/images/blackerjiicon.png"} style={{
                                        position: 'relative',
                                        top: ".08rem",
                                        width: '.5rem',
                                        height: '.5rem'
                                    }}/></a>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}