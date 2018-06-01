import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import AudioBox from "./AudioBox.js";
import Pagedownheader from "./page_down_header.js";
import PageVideo from "./page_video.js";
import Shade from "./Shade";
import HeadNav from "./HeadNav";
import  jTimeline from '../lib/jTimeline';
import i18n from '../i18n/i18n';
// 详情页面
export default class PageSmallDetail extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id || 0;
        this.state = {
            data: {},
            pageIndex: this.id
        };
        this.imgData = {
            "MG": {
                "headerimg": "app/images/MEDIUMGALLERY1.png",
                "bgimg": "app/images/mediumgallery.jpg",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "LG": {
                "headerimg": "app/images/en-title-lg.png",
                "bgimg": "app/images/largegallerybg.png",
                "cnheaderimg":"app/images/cn-title-lg.png"
            },
            'SG': {
                "headerimg": "app/images/SMALLGALLERY1.png",
                "bgimg": "app/images/smallgallery.jpg",
                "cnheaderimg":"app/images/cn-title-sg.png"
            }
        }
    this.name = this.props.match.params.name;
    }
    
    componentDidMount() {
         PageSmallDetail.staticProps.isLoad = true;
         PageSmallDetail.staticProps._this = this;
        this.getData(this.id);
        $(window).scrollTop(0);
        if (this.state.data.No == '1') {
            $(document).on('touchmove.j', function (e) {
                e.preventDefault();
            });
            //$(document.body).css('overflow','hidden');
        }

        /*******************/
        console.log("________",this);
        // let {data} = this.state;
        setTimeout(()=>{
            if(this.id == "24"){
                this.refs.viewmore.style.display="none"
            };
        },10);
        /*******************/  
    }

    componentWillUnmount() {
        $(document).off('touchmove.j');
    }

    // 上级页面Touch调用  解决iOS端无法自动播放
    static LoadAudiou() {
        //alert('1111')
        try {
            let time = setInterval(() => {
                if (PageSmallDetail.staticProps.isLoad) {
                    try {
                        PageSmallDetail.staticProps._this.refs.AudioBox &&
                        PageSmallDetail.staticProps._this.refs.AudioBox.play();
                    } catch (error) {
                    }
                    clearInterval(time);
                }
                ;
            }, 500);
        } catch (error) {
        }
    }

    static staticProps = {
        isLoad: false,
        _this: null
    }

    getData(index = 1) {
        let id = index;
        let datas = i18n.getJSONData("ApplicationData");//.ApplicationData;
        let tempArr = datas.filter((data) => {
            return data.No == id.toString();
        });
        if (tempArr.length <= 0) {
            alert("没有找到编号为" + id + "的作品!\n即将为您显示1号作品");
            this.getData(1);
        }
        else {
            this.setState({data: tempArr[0], pageIndex: id});
        }
    }

    handleclick = (No) => {
        // let isExt = $('.bigbox').data('isExt');
        // if(!isExt){
        //     var h = $('.bigbox').height(),
        //     h2 = $('.p_s_d_c_c_eight').height();
        //     $('.bigbox').data('height',h).css({'height':"auto"}).data('isExt',true);
        //     $('.p_s_d_c_c_eight').data('height',h2).css({'height':"auto"});
        //     jTimeline.fromTo($('#xiala'),0.01,{rotate:0},{rotate:180});
        //     {`${i18n.getLocal()=='cn' ? $('#btn_more').html('收起') :$('#btn_more').html('PACK UP')}`}
        //     return;
        // }
        // var h = $('.bigbox').data('height'),
        //     h2 = $('.p_s_d_c_c_eight').data('height');
        // {`${i18n.getLocal()=='cn' ? $('#btn_more').html('查看更多') :$('#btn_more').html('VIEWMORE')}`}
        // $('.bigbox').height(h);
        // $('.p_s_d_c_c_eight').height(h2);
        // jTimeline.fromTo($('#xiala'),0.01,{rotate:180},{rotate:0});
        // $('.bigbox').data('isExt',false);
        // p_s_d_c_c_eight_line5
        let viewmore = this.refs.viewmore;
        viewmore.style.display = "none";
        let contentBox = this.refs.contentBox;
        if ($(contentBox).hasClass("p_s_d_c_c_eight_line5")) {
            $(contentBox).removeClass("p_s_d_c_c_eight_line5")
        }
        if(No=='1'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1900_Varuna_detail_more"):gtag('event', "EN_1900_Varuna_detail_more")
        }else if(No=='2'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1900_Chatelaine_detail_more"):gtag('event', "EN_1900_Chatelaine_detail_more")
        }else if(No=='3'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1920_Bracelet_detail_more"):gtag('event', "EN_1920_Bracelet_detail_more")
        }else if(No=='4'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1930_Minaudiere_detail_more"):gtag('event', "EN_1930_Minaudiere_detail_more")
        }else if(No=='5'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1930_Cadenas_detail_more"):gtag('event', "EN_1930_Cadenas_detail_more")
        }else if(No=='6'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1930_Hawai_detail_more"):gtag('event', "EN_1930_Hawai_detail_more")
        }else if(No=='7'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1940_Lace_detail_more"):gtag('event', "EN_1940_Lace_detail_more")
        }else if(No=='8'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1940_Spirit_detail_more"):gtag('event', "EN_1940_Spirit_detail_more")
        }else if(No=='9'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1940_Spanish_detail_more"):gtag('event', "EN_1940_Spanish_detail_more")
        }else if(No=='10'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1950_Pair_detail_more"):gtag('event', "EN_1950_Pair_detail_more")
        }else if(No=='11'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1950_Poppy_detail_more"):gtag('event', "EN_1950_Poppy_detail_more")
        }else if(No=='12'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1960_Indian_detail_more"):gtag('event', "EN_1960_Indian_detail_more")
        }else if(No=='13'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1970_Rose_detail_more"):gtag('event', "EN_1970_Rose_detail_more")
        }else if(No=='14'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1970_Alhambra_detail_more"):gtag('event', "EN_1970_Alhambra_detail_more")
        }else if(No=='15'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1960_Bird_detail_more"):gtag('event', "EN_1960_Bird_detail_more")
        }else if(No=='16'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1970_Panka_detail_more"):gtag('event', "EN_1970_Panka_detail_more")
        }else if(No=='17'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Marqueterie_detail_more"):gtag('event', "EN_1980_Marqueterie_detail_more")
        }else if(No=='18'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Sublime_detail_more"):gtag('event', "EN_1980_Sublime_detail_more")
        }else if(No=='19'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Venice_detail_more"):gtag('event', "EN_1980_Venice_detail_more")
        }else if(No=='20'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_2000_Butterfly_detail_more"):gtag('event', "EN_2000_Butterfly_detail_more")
        }else if(No=='21'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Triangle_detail_more"):gtag('event', "EN_1980_Triangle_detail_more")
        }else if(No=='22'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_2000_Victoria_detail_more"):gtag('event', "EN_2000_Victoria_detail_more")
        }else if(No=='23'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_2000_Qiseau_detail_more"):gtag('event', "EN_2000_Qiseau_detail_more")
        }else if(No=='26'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Chrysanthemum_detail_Audio_more"):gtag('event', "EN_Lgallery_Chrysanthemum_detail_Audio_more")
        }else if(No=='33'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Fee_Ondine_detail_Audio_more"):gtag('event', "EN_Lgallery_Fee_Ondine_detail_Audio_more")
        }else if(No=='34'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Bird_detail_Audio_more"):gtag('event', "EN_Lgallery_Bird_detail_Audio_more")
        }else if(No=='35'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Necklace_detail_Audio_more"):gtag('event', "EN_Lgallery_Necklace_detail_Audio_more")
        }else if(No=='38'){
            i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Carpe_detail_Audio_more"):gtag('event', "EN_Lgallery_Carpe_detail_Audio_more")
        }

    }

    switchPageByIndex(type) {
        PageSmallDetail.LoadAudiou();
        let _this = this;
        let index = parseInt(this.state.pageIndex || 0);
        let datas = i18n.getJSONData("ApplicationData");//.ApplicationData;
        //    let tempArr = datas.filter((data)=>{
        //       return data.Location == "LG" && type === 0 ? parseInt(data.No) < index :parseInt(data.No) > index;
        //    });
        let tempData = filterData(datas, index, type);
        try {
            console.log("_____", tempData.No);
        } catch (error) {
        }
        if (tempData) {
            _this.getData(tempData.No);
            let url = (window.location.origin || (window.location.protocol + "//" + window.location.host)) + "/#/PageSmallDetail/" + tempData.No;
            console.log(url);
            history.replaceState("", "", url);
        } else {
            this.state.pageIndex = (type == 0) ? 40 : 0;
            this.switchPageByIndex(type);
        }
        function filterData(datas, index, type) {
            let tempData = {};
            if (type === 0) {
                for (let i = index; i >= 0; i--) {
                    let data = datas[i];
                    if (!data)continue;
                    if ((data.Location == "LG" && data.AudioUrl) && parseInt(data.No) < index)return data;
                }
            } else {
                for (let i = index; i < datas.length; i++) {
                    let data = datas[i];
                    if (!data)continue;
                    if ((data.Location == "LG" && data.AudioUrl) && parseInt(data.No) > index)return data;
                }
            }
            return false;
        }
    }
    audiohandclick(No,pause){
        if(pause){
            if(No=='24'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Collaret1_detail_Audio_open"):gtag('event', "EN_Lgallery_Collaret1_detail_Audio_open")
            }else if(No=='27'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Peony_detail_Audio_open"):gtag('event', "EN_Lgallery_Peony_detail_Audio_open")
            }else if(No=='29'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Sequins_detail_Audio_Open"):gtag('event', "EN_Lgallery_Sequins_detail_Audio_Open")
            }else if(No=='30'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_ZIP_detail_Audio_Open"):gtag('event', "EN_Lgallery_ZIP_detail_Audio_Open")
            }else if(No=='31'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Mystere_detail_Audio_Open"):gtag('event', "EN_Lgallery_Mystere_detail_Audio_Open")
            }else if(No=='32'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Collaret2_detail_Audio_open"):gtag('event', "EN_Lgallery_Collaret2_detail_Audio_open")
            }else if(No=='36'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Five_detail_Audio_Open"):gtag('event', "EN_Lgallery_Five_detail_Audio_Open")
            }else if(No=='37'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Dragon_detail_Audio_open"):gtag('event', "EN_Lgallery_Dragon_detail_Audio_open")
            }
        }else{
            if(No=='24'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Collaret1_detail_Audio_close"):gtag('event', "EN_Lgallery_Collaret1_detail_Audio_close")
            }else if(No=='27'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Peony_detail_Audio_close"):gtag('event', "EN_Lgallery_Peony_detail_Audio_close")
            }else if(No=='29'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Sequins_detail_Audio_close"):gtag('event', "EN_Lgallery_Sequins_detail_Audio_close")
            }else if(No=='30'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_ZIP_detail_Audio_close"):gtag('event', "EN_Lgallery_ZIP_detail_Audio_close")
            }else if(No=='31'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Mystere_detail_Audio_close"):gtag('event', "EN_Lgallery_Mystere_detail_Audio_close")
            }else if(No=='32'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Collaret2_detail_Audio_close"):gtag('event', "EN_Lgallery_Collaret2_detail_Audio_close")
            }else if(No=='36'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Five_detail_Audio_close"):gtag('event', "EN_Lgallery_Five_detail_Audio_close")
            }else if(No=='37'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Dragon_detail_Audio_close"):gtag('event', "EN_Lgallery_Dragon_detail_Audio_close")
            }
        }
        
    }
    searchHandclick(Location,Area,No){
        if(Location=='LG'){
            if(No=='33'){
               i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Fee_Ondine_detail_Search"):gtag('event', "EN_Lgallery_Fee_Ondine_detail_Search")
            }else if(No=='34'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Bird_detail_Search"):gtag('event', "EN_Lgallery_Bird_detail_Search")
             }else if(No=='35'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Necklace_detail_Search"):gtag('event', "EN_Lgallery_Necklace_detail_Search")
             }else if(No=='38'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Carpe_detail_Search"):gtag('event', "EN_Lgallery_Carpe_detail_Search")
             }else if(No=='39'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Lion_detail_Search"):gtag('event', "EN_Lgallery_Lion_detail_Search")
             }else if(No=='26'){
                i18n.getLocal()=='cn'?gtag('event', "CN_Lgallery_Chrysanthemum_detail_Search"):gtag('event', "EN_Lgallery_Chrysanthemum_detail_Search")
             }
        }else if(Location=='SG'||Location=='MG'){
            if(No=='1'){
                i18n.getLocal()=='cn'?gtag('event', "CN_1900_Varuna_detail_search"):gtag('event', "EN_1900_Varuna_detail_search")
             }else if(No=='2'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1900_Chatelaine_detail_search"):gtag('event', "CN_1900_Chatelaine_detail_search")
              }else if(No=='3'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1920_Bracelet_detail_search"):gtag('event', "EN_1920_Bracelet_detail_search")
              }else if(No=='4'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1930_Minaudiere_detail_search"):gtag('event', "EN_1930_Minaudiere_detail_search")
              }else if(No=='5'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1930_Cadenas_detail_search"):gtag('event', "EN_1930_Cadenas_detail_search")
              }else if(No=='6'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1930_Hawai_detail_search"):gtag('event', "EN_1930_Hawai_detail_search")
              }else if(No=='7'){
                i18n.getLocal()=='cn'?gtag('event', "CN_1940_Lace_detail_search"):gtag('event', "EN_1940_Lace_detail_search")
             }else if(No=='8'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1940_Spirit_detail_search"):gtag('event', "EN_1940_Spirit_detail_search")
              }else if(No=='9'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1940_Spanish_detail_search"):gtag('event', "EN_1940_Spanish_detail_search")
              }else if(No=='10'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1950_Pair_detail_search"):gtag('event', "EN_1950_Pair_detail_search")
              }else if(No=='11'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1950_Poppy_detail_search"):gtag('event', "EN_1950_Poppy_detail_search")
              }else if(No=='12'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1960_Indian_detail_search"):gtag('event', "EN_1960_Indian_detail_search")
              }else if(No=='13'){
                i18n.getLocal()=='cn'?gtag('event', "CN_1970_Rose_detail_search"):gtag('event', "EN_1970_Rose_detail_search")
             }else if(No=='14'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1970_Alhambra_detail_search"):gtag('event', "EN_1970_Alhambra_detail_search")
              }else if(No=='15'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1960_Bird_detail_search"):gtag('event', "EN_1960_Bird_detail_search")
              }else if(No=='16'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1970_Panka_detail_search"):gtag('event', "EN_1970_Panka_detail_search")
              }else if(No=='17'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1980_Marqueterie_detail_search"):gtag('event', "EN_1980_Marqueterie_detail_search")
              }else if(No=='18'){
                 i18n.getLocal()=='cn'?gtag('event', "CN_1980_Sublime_detail_search"):gtag('event', "EN_1980_Sublime_detail_search")
              }else if(No=='19'){
                i18n.getLocal()=='cn'?gtag('event', "CN_1980_Venice_detail_search"):gtag('event', "EN_1980_Venice_detail_search")
             }else if(No=='20'){
                i18n.getLocal()=='cn'?gtag('event', "CN_2000_Butterfly_detail_search"):gtag('event', "EN_2000_Butterfly_detail_search")
             }else if(No=='21'){
                i18n.getLocal()=='cn'?gtag('event', "CN_1980_Triangle_detail_search"):gtag('event', "EN_1980_Triangle_detail_search")
             }else if(No=='22'){
                i18n.getLocal()=='cn'?gtag('event', "CN_2000_Victoria_detail_search"):gtag('event', "EN_2000_Victoria_detail_search")
             }else if(No=='23'){
                i18n.getLocal()=='cn'?gtag('event', "CN_2000_Qiseau_detail_search"):gtag('event', "CN_2000_Qiseau_detail_search")
             }
            
        }
    }
    jiemihandclick(No){
        if(No=="24"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Collaret1_detail_quiz"):gtag('event', "EN_Lgallery_Collaret1_detail_quiz")                        
        }else if(No=="27"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Peony_detail_quiz"):gtag('event', "EN_Lgallery_Peony_detail_quiz")                        
        }else if(No=="29"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Sequins_detail_quiz"):gtag('event', "EN_Lgallery_Sequins_detail_quiz")                        
        }else if(No=="30"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_ZIP_detail_quiz"):gtag('event', "EN_Lgallery_ZIP_detail_quiz")                        
        }else if(No=="31"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Mystere_detail_quiz"):gtag('event', "EN_Lgallery_Mystere_detail_quiz")                        
        }else if(No=="32"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Collaret2_detail_quiz"):gtag('event', "EN_Lgallery_Collaret2_detail_quiz")                        
        }else if(No=="36"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Five_detail_quiz"):gtag('event', "EN_Lgallery_Five_detail_quiz")                        
        }else if(No=="37"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Dragon_detail_quiz"):gtag('event', "EN_Lgallery_Dragon_detail_quiz")                        
        }else if(No=="24"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Rose_detail_quiz"):gtag('event', "EN_Lgallery_Rose_detail_quiz")                        
        }else if(No=="28"){
            i18n.getLocal() == 'cn' ?gtag('event', "CN_Lgallery_Sequined_detail_quiz"):gtag('event', "EN_Lgallery_Sequined_detail_quiz")                        
        }
    }
    render() {
        let {data} = this.state;
        if (Object.keys(data) == 0) {
            return <div />;
        }
        let enheaderimg = this.imgData[this.state.data.Location].headerimg;
        let cnheaderimg = this.imgData[this.state.data.Location].cnheaderimg;
        return (
            <div>
                <div className="page_small_detail_bg gallery">
                    <HeadNav right={(()=>{
                        if(this.state.data.nomore=='1'){
                            return <a className="btn-search" onClick={(event)=>{
                                       let pause= this.refs.AudioBox.qihuanpause();
                                       console.log('切换',pause)
                                       this.audiohandclick(this.state.data.No,pause)
                                        try {
                                            if(pause){
                                                event.currentTarget.childNodes[0].src="app/images/icon/musci_1.png"
                                            }else{
                                                event.currentTarget.childNodes[0].src="app/images/icon/musci_0.png"
                                            }
                                            
                                        } catch (error) {
                                            
                                        }
                                        
                            }}>
                            <img  src={"app/images/icon/musci_0.png"}/>
                        </a>
                        }else{
                            return <a className="btn-search" href="#PageSearch" onClick={()=>{this.searchHandclick(this.state.data.Location,this.state.data.Area,this.state.data.No)}}>
                                <img src={"app/images/nobordericon.png"}/>
                            </a>
                        }
                    })()}>
                        {/* <div className="name">
                             <img src={i18n.getLocal()!='cn'?enheaderimg:cnheaderimg} style={this.state.data.Location == 'LG' ? {width: '4.64rem'} : {}}/>
                        </div>
                        {this.state.data.Location != 'LG' ? <div className="years">
                            <p>{`${this.state.data.Area.replace('年代', '')}${i18n.getLocal() == 'cn' ? '年代馆' : 's'}` }</p>
                        </div> : ""} */}
                    </HeadNav>
                    {/* <Pagedownheader/> */}
                    <div className="p_s_d_content aksertg">
                        <div className="p_s_d_c_center aksertb">

                            <div className="p_s_d_c_c_one aksertn">
                                {/* <img src={"app/images/Links/" + data.No + ".png"}
                                     style={data.detailimgsize=="true"?{width: (data.Width /85) + 'rem'}:{width: (data.Width / 100) + 'rem'}}/> */}
                                      <img src={"app/images/Links/" + data.No + ".png"}
                                     style={(()=>{
                                         let style = {};
                                         if(data.detailimgsize=="true"){
                                            style.width=(data.Width /90) + 'rem'
                                            if(data.large8=="laegetransform")
                                            {
                                                style.transform = 'scale(1.25)'
                                            }else if(data.medium12=="mediumtransform"){
                                                style.transform = 'scale(1.38)'
                                            }else{
                                                style.transform = 'scale(1.43)'
                                            }
                                         }else if(data.detailimgsizemore=="true"){
                                            style.width=(data.Width /80) + 'rem'
                                            if(data.large8=="laegetransform")
                                            {
                                                style.transform = 'scale(1.25)'
                                            }else if(data.medium12=="mediumtransform"){
                                                style.transform = 'scale(1.38)'
                                            }else{
                                                style.transform = 'scale(1.43)'
                                            }
                                         }else{
                                            style.width=(data.Width /100) + 'rem'
                                            if(data.large8=="laegetransform")
                                            {
                                                style.transform = 'scale(1.25)'
                                            }else if(data.medium12=="mediumtransform"){
                                                style.transform = 'scale(1.38)'
                                            }else{
                                                style.transform = 'scale(1.43)'
                                            }
                                         }
                                         return style;
                                     })() }/>
                            </div>
                            {/*<div className="p_s_d_c_c_two fm-st aksertm">*/}
                            <div dangerouslySetInnerHTML={{__html:data.Title}} 
                            className={`${i18n.getLocal() != 'cn' ? 'fm-fr' : 'fm-st'} p_s_d_c_c_two aksertm cnen`}>
                                
                            </div>
                            {
                                data.QuesType != "YearInput" &&
                                <div className="p_s_d_c_c_three akserta fm-st">
                                    {
                                        data.Year
                                    }
                                </div>
                            }

                            {/*<div className="p_s_d_c_c_four akserts ">*/}
                            <div dangerouslySetInnerHTML={{__html: data.Desc}}
                                 className={`${i18n.getLocal() != 'cn' ? 'fm-bl' : 'fm-ht'} p_s_d_c_c_four akserts cnen`}>
                            </div>

                            <div style={{
                                color: "white",
                                width: "6rem",
                                margin: "auto",
                                marginTop: ".1rem",
                                fontSize: ' .32rem',
                                textAlign: ' center',
                                letterSpacing: ' 0.015rem'
                            }}>
                                {`${i18n.getLocal() != 'cn' ? "" : data.Desc2}`}
                            </div>

                            <AudioBox style={{display:"none"}} ref="AudioBox" src={data.AudioUrl} Detail_content={data.Detail_content}
                                  onTapLeftBtn={() => this.switchPageByIndex(0)}
                                  onTapRightBtn={() => this.switchPageByIndex(1)}/>
                            <div>
                                {
                                    <React.Fragment>
                                    <div key="123" className="xian">
                                        <img src={data.Imgxian}/>
                                    </div>
                                    <div key="456" className="bigbox">
                                        <div ref="contentBox" dangerouslySetInnerHTML={{__html:data.Detail_content}}
                                                 className={`${i18n.getLocal() != 'cn' ? 'fm-bl' : 'fm-ht'} p_s_d_c_c_eight ${ data.nomore==1?'' :'p_s_d_c_c_eight_line5'} `}>
                                        </div>
                                    </div>
                                    {data.nomore==1?'':<span ref="viewmore" style={{
                                        position: 'relative', position: 'relative',
                                        width: '100%',
                                        height: '1rem',
                                        display: 'block',
                                        marginTop: '.3rem'
                                    }} onClick={()=>{this.handleclick(data.No)}}>
                                    <div className="fm-ht" id="btn_more" style={{
                                        color: '#fff',
                                        fontSize: ".28rem",
                                        top: "-0.05rem",
                                        margin: "auto"
                                    }}>{`${i18n.getLocal() != 'cn' ? 'VIEW MORE' : '查看更多'}`}</div>
                                    <img id="xiala" src={data.Imgxia}/></span>}
                                

                                </React.Fragment>
                                }

                            </div>

                            {data.QuesType && <div style={{paddingBottom:"2.5rem"}}>
                                <a href={"#DetailGame/" + data.No} onClick={()=>{this.jiemihandclick(data.No)
                                 }}>
                                    {i18n.getLocal() == 'cn' ? <div className="jiemiyemian1"></div>:<div className="jiemiyemian2"></div>
                                    
                                    // <img src={data.Imgjianmi2} className="jiemiyemian"/> :
                                    //     <img src={data.Imgjianmi} className="jiemiyemian"/>
                                }
                                </a>
                            </div>
                            
                            }
                        </div>
                        {/* <div className="dibu"style={{width:'100%',height:'1.5rem',backgroundColor:'block',opacity:'.7'}}></div> */}
                    </div>

                </div>
                <div style={{
                    position: "fixed",
                    top: "-18px",
                    left: "0",
                    backgroundImage: "url(" + this.imgData[this.state.data.Location].bgimg + ")",
                    backgroundSize: "100% 100%",
                    width: "100%",
                    height: "100%",
                    zIndex: "-99",
                    paddingBottom: '18px'
                }}>

                </div>
            </div>
        )
    }
}
