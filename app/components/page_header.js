import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
window.$ = $;
import jTimeline from "../lib/jTimelineCss";
import jMove from "../lib/jMove";
import audio from '../lib/music';
import  i18n from '../i18n/i18n';
import audioInfo from '../lib/audioInfo';
export default class PageMain extends React.Component {
    constructor(props) {
        super(props);
        let _this = this;
        this.isLoadState = 0;
        //预加载图片
        this.loadImage(
            [

                "app/images/zwSg.png",
                "app/images/zwMG.png",
                "app/images/zwLg.png",
                "app/images/cover1.png",
                "app/images/cover2.png",
                "app/images/logo_0.png",
                "app/images/mainPageBg.jpg",
                "app/images/mainPageStyle1.png",
                "app/images/mainPageStyle2.png",
                'app/images/page_small_detail.jpg',
                'app/images/longbgg_0.jpg',
                'app/images/smallgallery.jpg',
                'app/images/mediumgallery.jpg',
                'app/images/largegallerybg.png',
                'app/images/detail/detail_home.jpg',
                "app/images/detail/enjiemi.png",
                "app/images/detail/cnjiemi.png"
            ],
            function () {
                _this.isLoad = true;
                console.log("图片加载完成！"+_this.isLoadState);
                if (_this.isLoadState === 2) {
                    _this.nextPage();
                }
            }
        );
    }

    componentDidMount() {
        var timeset;
        let self = this;
        let coverImg = this.refs.coverImg; 
        self.isLoadState = 1;
        $('.chila').on('click',function(){
            gtag('event', 'KV_CN');
            $('.chila').css('backgroundColor','#939393')
            $('.english').css('backgroundColor','white')
            self.nextPage();
            i18n.changeLocal('cn');
            self.forceUpdate();
            self.refs.loadBox.show();
            
        })
        $('.english').on('click',function(){
            gtag('event', 'KV_EN');
            $('.chila').css('backgroundColor','white')
            $('.english').css('backgroundColor','#939393')
            self.nextPage();
            i18n.changeLocal('en');
            self.forceUpdate();
            self.refs.loadBox.show();
        })
        if (window.isHomePageLoad) {
            this.refs.mainPage1.style.display = "none";
            this.refs.mainPage2.style.display = "none";
            this.nextPage2();
            i18n.getLocal() == 'cn'?$('.smallgallerimg').attr('src','app/images/map/gray0.png'):$('.smallgallerimg').attr('src','app/images/map/enliang0.png');
            i18n.getLocal() == 'cn'?$('.mediagallerimg').attr('src','app/images/map/gray1.png'):$('.mediagallerimg').attr('src','app/images/map/enliang1.png');
            i18n.getLocal() == 'cn'?$('.largegallerimg').attr('src','app/images/map/gray2.png'):$('.largegallerimg').attr('src','app/images/map/enliang2.png');
            
        } else {
            let num = 3;
            let that = this;
            let timer = setInterval(function () {
                if (num <= 0) {
                    clearInterval(timer);
                    self.refs.mainPageTime.style.display = "none";
                    // 判断资源是否加载完成
                    if (self.isLoad) {
                        that.nextPage();
                    }
                    return;
                }
                ;
                self.refs.mainPageTime.innerHTML = num;
                num--;
            }, 1000000);
        }
    }

    nextPage = () => {
        let self = this;
        if (!self.isLoad) {
            
            self.isLoadState=2;
            return;      
            }
        self.refs.loadBox.close();
        $(self.refs.mainPage1).addClass("mainPageAnimation");
        setTimeout(() => {
            self.refs.mainPage1.style.display = "none";
        }, 500);
        //setTimeout(function () {
            $('.mainPage2Content').on('click',function(){
             //return;
            // self.refs.mainPage2.style.display = "none";
            // self.nextPage2();
            $(self.refs.mainPageStyle1).css({
                transition: "transform 2.0s,opacity 1s",
                transform: "translateX(-100px)",
                opacity: 0
            });
            setTimeout(function () {
                $(self.refs.mainPageStyle2).css({
                    transition: "transform 2.0s,opacity 1s",
                    transform: "translateX(100px)",
                    opacity: 0
                });
            }, 300);
            // return;
            // $(self.refs.mainPage2Content).animate({opacity: 0}, 1200, function () {
            // });
            // $(self.refs.mainPage2).animate({opacity: 0}, 2000, function () {
            //     self.refs.mainPage2.style.display = "none";
            // });
            $(self.refs.mainPage2).addClass('opacityxiugai');
            setTimeout(function () {
                self.refs.mainPage2.style.display = "none";
            }, 1200);
            // return;
            setTimeout(function () {
                self.nextPage2();
                self.div_tab();
                var i=0;
                self.timeset = setInterval(function(){
                    //如果切換到最後一張圖片則重新從第一張開始
                    console.log('我是i',i)
                    if(i==3){
                        $('.largemapblack').attr('src','app/images/map/mapgray2.png')
                        i18n.getLocal() == 'cn'?$('.smallgallerimg').attr('src','app/images/map/gray0.png'):$('.smallgallerimg').attr('src','app/images/map/enliang0.png');
                        i18n.getLocal() == 'cn'?$('.mediagallerimg').attr('src','app/images/map/gray1.png'):$('.mediagallerimg').attr('src','app/images/map/enliang1.png');
                        i18n.getLocal() == 'cn'?$('.largegallerimg').attr('src','app/images/map/gray2.png'):$('.largegallerimg').attr('src','app/images/map/enliang2.png');
                        return;
                    }
                    //每兩秒自動讀取下一張圖片
                    self.div_tab(i);
                    i++;
                },800);
                self.tabclick();
            }, 1000);
        })
        //}, 1000)
    }

    nextPage2() {
        let self = this;
        
       
        try {
            if(window.isHomePageLoad){
                // $(".page_menu_bg").removeClass("page_menu_hide");
                $(this.refs.menuItem_1).addClass('menuItem')
                $(this.refs.menuItem_2).addClass('menuItem')
                $(this.refs.menuItem_4).addClass('menuItem')
            }else{
                 $(this.refs.menuItem_4).addClass("opacityShow");
                setTimeout(()=>{
                $(this.refs.menuItem_1).addClass("opacityShow");
                    $(this.refs.menuItem_2).addClass("opacityShow");
                    
                },350);
            }

            var line = jTimeline(),
                line2 = jTimeline();
        
            //云层动画 
            this.refs.yuncengxiugai.style.opacity = "1";
            var clound1 = $(self.refs.clound_1),
                clound2 = $(self.refs.clound_2),
                clound3 = $(self.refs.clound_3);
            jMove.css(clound2, {scaleX: "-1"});
            line.fromTo(clound1, 2, {o: 0}, {o: 1}).callback(function () {
                clound3.show();
                line2 = line2.play({repeat: 0});
            }).play({delay: 0.5});
            line2.fromTo(clound1, 10, {x: 0}, {x: '-16.39rem'}, 0, jTimeline.linear.easeNone)
                .fromTo(clound3, 10, {x: '16.39rem'}, {x: 0}, 0, jTimeline.linear.easeNone)
                .to(clound3, 10, {x: "-16.39rem"}, 10, jTimeline.linear.easeNone)
                .fromTo(clound1, 10, {x: "16.39rem"}, {x: 0}, 10, jTimeline.linear.easeNone);
        } catch (error) {
        }
        // 标记进入首页成功
        window.isHomePageLoad = true;
    }

    loadImage(img, callback) {
        let size = 0;
        let num = 0;
        if (typeof(img) === "object") {
            size = img.length;
            for (let i in img) {
                load(img[i]);
            }
        } else {
            size = 1;
            load(img);
        }
        function load(src) {
            let img = new Image();
            img.src = src;
            img.onload = function () {
                // delete img;
                num++;
                console.log("已加载：" + num + "/" + size);
                if (num >= size) {
                    typeof callback === "function" && callback();
                }
            }
            img.onerror = function () {
                console.log("图片加载失败", num);
                load(src);
                // num--;
            }
        }
    }

    goLinke(url,key) {
        window.location = url;
        if(key !='no'){
            audio.src = `${audioInfo[i18n.getLocal()][key] || 'app/media/bgm.mp3'}`;
            audio.play();
        }

    }
    div_tab(tabName){
        var tabLinkArr=document.getElementsByName("tablink");
        var tabPicArr=document.getElementsByName("tabspan");
        console.log('xixi',tabLinkArr.length)
        for(let i=0;i<tabLinkArr.length;i++){
            if(i==tabName){
                i18n.getLocal() == 'cn'?tabLinkArr[i].src="app/images/map/gray"+[i]+".png":tabLinkArr[i].src="app/images/map/enliang"+[i]+".png";
                tabPicArr[i].src="app/images/map/mapliang"+[i]+".png";
            }else{
                i18n.getLocal() == 'cn'?tabLinkArr[i].src="app/images/map/wenziliang"+[i]+".png":tabLinkArr[i].src="app/images/map/enweiliang"+[i]+".png";
                tabPicArr[i].src="app/images/map/mapgray"+[i]+".png";
            }
        }
    }
    tabclick(){
        var that = this;
        var tabLinkArr=document.getElementsByName("tablink");
        var tabPicArr=document.getElementsByName("tabspan");
        for(let i=0;i<tabLinkArr.length;i++){ 
            console.log('hah',i)
            tabLinkArr[i].index=i;
            console.log('hahahahha',tabLinkArr[i].index)
            tabLinkArr[i].onclick=function(){
                clearInterval(that.timeset);
                for(let i=0;i<tabLinkArr.length;i++)  
                    {  
                        i18n.getLocal() == 'cn' ?tabLinkArr[i].src="app/images/map/wenziliang"+[i]+".png":tabLinkArr[i].src="app/images/map/enweiliang"+[i]+".png"
                        tabPicArr[i].src="app/images/map/mapgray"+[i]+".png"
                    } 
                    i18n.getLocal() == 'cn' ?this.src="app/images/map/gray"+[i]+".png":this.src="app/images/map/enliang"+[i]+".png";
                    tabPicArr[i].src="app/images/map/mapliang"+[i]+".png"
            }
            tabPicArr[i].onclick=function(){
                clearInterval(that.timeset);
                for(let i=0;i<tabLinkArr.length;i++)  
                    {  
                        i18n.getLocal() == 'cn' ?tabLinkArr[i].src="app/images/map/wenziliang"+[i]+".png":tabLinkArr[i].src="app/images/map/enweiliang"+[i]+".png"
                        tabPicArr[i].src="app/images/map/mapgray"+[i]+".png"
                    } 
                    tabLinkArr[i].src="app/images/map/gray"+[i]+".png";
                    i18n.getLocal() == 'cn' ?tabLinkArr[i].src="app/images/map/gray"+[i]+".png":tabLinkArr[i].src="app/images/map/enliang"+[i]+".png";
                    this.src="app/images/map/mapliang"+[i]+".png"
            }

        }
    }
    auto_tab_div(){
        
    }
    

    render() {
        return (
            <div className="mainPageBox">
                <div className="mainPage" ref={"mainPage3"}
                     style={{backgroundImage: "url(app/images/wublack.png)", backgroundSize: "100% 100%"}}>
                    <div className="mainPageContent">
                        <div className="page_menu_bg">
                            <span ref={"menuItem_1"} style={{display:"block",marginTop:"1rem",opacity:"0"}}>
                                <span className="mapspan" style={{width:"5.5rem",height:"3.5rem",display:"block",margin:"auto",position:"relative"}}>
                                    <img onClick={() => {this.goLinke('#Demo/SG','1900-1910');i18n.getLocal() == 'cn' ?gtag('event', 'CN_LANDING_PAGE_MapS'):gtag('event', 'EN_LANDING_PAGE_MapS')}} name="tabspan" style={{width:"1.25rem",position:"absolute",right:".6rem"}} src={'app/images/map/mapgray0.png'}/>
                                    <img onClick={() => {this.goLinke('#Demo/MG','1940');i18n.getLocal() == 'cn' ?gtag('event', 'CN_LANDING_PAGE_MapM'):gtag('event', 'EN_LANDING_PAGE_MapM')}} name="tabspan" style={{width:"5.5rem",position:"absolute",bottom:'.08rem',left:"0"}} src={'app/images/map/mapgray1.png'}/>
                                    <img className="largemapblack" onClick={() => {this.goLinke('#Demo/LG','no');i18n.getLocal() == 'cn' ?gtag('event', 'CN_LANDING_PAGE_MapL'):gtag('event', 'EN_LANDING_PAGE_MapL')}} name="tabspan" style={{width:"3.65rem",position:"absolute",left:".6rem"}} src={'app/images/map/mapgray2.png'}/>
                                </span>
                            </span>
                            <span ref={"menuItem_2"} className="mapmain" style={{display:"block",marginTop:".75rem",opacity:"0"}}>
                                <img className="smallgallerimg" onClick={() => {this.goLinke('#Demo/SG','1900-1910');i18n.getLocal() == 'cn' ?gtag('event', 'CN_LANDING_PAGE_Sgallery'):gtag('event', 'EN_LANDING_PAGE_Sgallery')}} src={i18n.getLocal() == 'cn' ?"app/images/map/wenziliang0.png":"app/images/map/enweiliang0.png"} name="tablink" style={{width:"2.9rem",display:"block",margin:"auto"}}/>
                                <img className="mediagallerimg" onClick={() => {this.goLinke('#Demo/MG','1940');i18n.getLocal() == 'cn' ?gtag('event', 'CN_LANDING_PAGE_Mgallery'):gtag('event', 'EN_LANDING_PAGE_Mgallery')}} src={i18n.getLocal() == 'cn' ?"app/images/map/wenziliang1.png":"app/images/map/enweiliang1.png"} name="tablink" style={{width:"3.19rem",display:"block",margin:"auto",marginTop:".7rem",zIndex:999}}/>
                                {i18n.getLocal() == 'cn' ?<img className="largegallerimg" onClick={() => {this.goLinke('#Demo/LG','no');gtag('event', 'CN_LANDING_PAGE_Lgallery')}} src={"app/images/map/wenziliang2.png"} name="tablink" style={{width:"4.68rem",display:"block",margin:"auto",marginTop:".7rem",zIndex:999}}/>:<img className="largegallerimg" onClick={() => {this.goLinke('#Demo/LG','no');gtag('event', 'EN_LANDING_PAGE_Lgallery')}} src={"app/images/map/enweiliang2.png"} name="tablink" style={{width:"3.68rem",display:"block",margin:"auto",marginTop:".7rem",zIndex:999}}/>}
                            </span>
                            <img ref={"menuItem_4"} src={"app/images/wuyun.jpg"} style={{position:"absolute",top:"0",left:"0",width:"100%",zIndex:-99,opacity:"0"}}/>
                        </div>
                        <div className="yunceng" ref="yuncengxiugai" style={{opacity:"0",transition:'1.5s',zIndex:-10}}>
                            <div ref="clound_1" className="clound">
                            </div>
                            <div ref="clound_3" style={{display: 'none', position: 'absolute', left: '0', top: 0}}>
                                <div ref="clound_2" className="clound">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <img className="mainPageLogo" src="app/images/logo_0.png"/> */}


                <div className="mainPage" ref={"mainPage2"} style={{backgroundImage: "url(app/images/wublack.png)"}}>
                    <div className="mainPageContent mainPage2Content" ref="mainPage2Content">
                        <div style={{width:"5.55rem",height:'9.5rem',position:"absolute",top:"1rem",left:".975rem"}}>
                            
                            {i18n.getLocal() !='en' ?<img src={"app/images/TITLE-new.png"}style={{height:"100%"}}/>:<div style={{width:"100%",height:"100%"}}>
                                <img src="app/images/entitletop.png" style={{width:"5.48rem"}}/>
                                <img src="app/images/entitlebottom.png" style={{width:"4.48rem",display:"block",margin:"auto",marginTop:"1.5rem"}}/>
                            </div>}
                        </div>
                    </div>

                    <img className="bgImg imgright" ref={"mainPageStyle2"}
                         src="app/images/mainPageStyle2.png"/>

                    <img className="bgImg imgleft" ref={"mainPageStyle1"} src="app/images/mainPageStyle1.png"/>

                </div>

                <div className="mainPage" ref={"mainPage1"} style={{zIndex: '5000'}}>
                    <div className="mainPageContent">
                        <div ref={"mainPageTime"} className="mainPageTime" style={{display: 'none'}}></div>
                        <LoadBox ref="loadBox"/>
                        <div className="coverBox">
                         <img src="app/images/cover1.png" style={{display:'block',position:'absolute',width:'6.85rem',left:'.35rem',top:'.25rem',boxSizing:"border-box"}}/>
                            <div style={{position:'absolute',bottom:'.35rem',width:'100%',left:'0'}}>
                            
                            <img src="app/images/cover2.png" style={{position:'absolute',bottom:'.35rem',width:'7.5rem',left:0}}/>
                            <span className="fm-st chila" style={{position: 'absolute',left: '.8rem',display: 'block',bottom: 0,width: '2.5rem',height: '.55rem',border: '1px solid gray',lineHeight: '.55rem',borderRadius: '.4rem',fontSize:".35rem"}}>中文</span>
                            <span className="fm-st english" style={{position: 'absolute',right: '.8rem',display: 'block',bottom: 0,width: '2.5rem',height: '.55rem',border: '1px solid gray',lineHeight: '.55rem',borderRadius: '.4rem',fontSize:".35rem"}}>ENGLISH</span>

                            </div>
                           
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
// 加载框
class LoadBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            showText: "",
        };
    }

    show(text) {
        $(this.refs.box).addClass("mainPageLoadBoxShow");
    }

    close() {
        $(this.refs.box).removeClass("mainPageLoadBoxShow");
    }

    render() {
        return (
            <div className="mainPageLoadBox" ref="box">
                <div className="HaveAnimation">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p>静候细赏<br/>雅艺之美</p>
            </div>)
    }
}
;