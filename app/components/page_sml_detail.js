import React from 'react';
import ReactDOM from 'react-dom';
import Shade from "./Shade";
import HeadNav from "./HeadNav";
import Pagedownheader from './page_down_header';
import BgMusic from "./BgMusic";
import i18n from '../i18n/i18n';
import AudioBox from "./AudioBox";
import PageSmallDetail from "./page_small_detail";
import audio from '../lib/music';
import audiotwo from '../lib/musictwo';
import $ from 'jquery';
import  jTimeline from '../lib/jTimelineCss';
import audioInfo from '../lib/audioInfo';
// 列表页
export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.state = {data: []};
        this.maps = {
            "MG": 3,
            "LG": 1,
            "SG": {
                "1920":"app/images/sg0.png",
                "1930":"app/images/mg0.png",
                "1900-1910":"app/images/lg0.png"
            }
        }
        this.menuData ={
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
        this.imgData={
        	"MG":{
                "headerimg":"app/images/MEDIUMGALLERY1.png",
                "bgimg":"app/images/mediumgallery.jpg",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "LG":{
                "headerimg":"app/images/en-title-lg.png",
                "bgimg":"app/images/largegallerybg.png",
                "cnheaderimg":"app/images/cn-title-lg.png"
            },
        	'SG':{
                "headerimg":"app/images/SMALLGALLERY1.png",
                "bgimg":"app/images/smallgallery.jpg",
                "cnheaderimg":"app/images/cn-title-sg.png"
            }
        }

        this.name = this.props.match.params.name;
        this.hand_tipRef =ele=>{
            this.hand_tip = ele;
        }
        this.isFirst = localStorage.getItem("entry") || false ;
        this.tipAni = this.tipAni.bind(this);
        localStorage.setItem("entry",true);

    }
    getAudio(area){
        var local = i18n.getLocal();

        return audioInfo[local][area];

    }
    getIndex(){
        let yearArr = this.menuData[this.name];
        let index = yearArr.findIndex((item)=>{return item == this.mapyear});
        index++;
        this.select(yearArr[index]); 
    }
    getnextgallery(){
        console.log('最后年代到了',this.mapyear)
        if(this.mapyear==="1930"){
            // this.refs.getnextgallery.href = "#/Demo/MG";
            // window.location.href = "#/Demo/MG"
            location.replace("#/Demo/MG")
            window.location.reload();
        }else{
            location.replace("#/Demo/LG")
            // window.location.href = "#/Demo/LG"
            window.location.reload();
            // this.refs.getnextgallery.href = "#/Demo/LG";
        }
    }
    static staticProps = {
        scrollTop:0,
        year:null,
        name:"",
        timeline:''
    }

    componentDidMount() {
        let name = this.props.match.params.name;
        this.name = name;
        // this.ageMap={
        //   'SG':1910,
        //     'MG':1940,
        //     'LG':1920
        // };
        this.ageMap={
            'SG':"1900-1910",
            'MG':"1940",
            'LG':"0000"
        };
        let datas = i18n.getJSONData("ApplicationData");//.ApplicationData;
        let tempArr = datas.filter((data) => {
            return data.Location == name;
        });
        // this.props.menuData = this.cache = tempArr;
        var menuData = this.cache = tempArr;
        try {
            setTimeout(()=>{
                // $(window).scrollTop(Demo.staticProps.scrollTop);
                // animate({scrollTop: '0px'}, 800)
                $('html,body').animate({scrollTop:(Demo.staticProps.scrollTop)+"px"},400)
            },0);
        } catch (error) {
            
        }

        if(name!='LG'){
            this.setState({data: [],year:this.ageMap[name]});
            // this.select(this.ageMap[name]);

            let year = Demo.staticProps.name==name ? (Demo.staticProps.year || this.ageMap[name]):this.ageMap[name];
            this.select(year);

        }else{
            this.setState({data: tempArr,year:this.ageMap[name]});
        }

        //this.tipAni();
    }
    tipAni(){
        let hand = this.refs.hand_tip;
        let b = this.refs.test;
         hand = $('#hand');
        if(Demo.staticProps.timeline ){
            Demo.staticProps.timeline.kill && Demo.staticProps.timeline.kill();
        }
        var line= jTimeline();
        Demo.staticProps.timeline=line.fromTo(hand,0.2,{x:'-.6rem',y:'-.6rem',o:0},{x:0,y:0,o:1})
            .to(hand,0.1,{o:0})
            .to(hand,0.1,{o:1}).play({repleat:3});


    }
    select(year) {
        // year = parseInt(year);

        // var d = this.cache.filter((data)=>{
        //     let y = data.Year;
        //     if(/\D/.test(y)){
        //         y = /(\d+)/.exec(y)[0];
        //     }
        //     var t =Math.max(y,1910);
        //     console.log("Hello ,",t);
        //     return t>=year && t<year+10;
        // })
        // if(year==1930){
        //     event.target.style.display="none";
        // }
        this.mapyear = year;
        let audiosrc = this.getAudio(year) || "app/media/bgm.mp3";
        audio.src = audiosrc;
        audio.play();
        var d = this.cache.filter((data)=>{
                let y = data.Area || "";
                return y.replace("年代","") == year.replace("年代","");;
        });    

        this.setState({data: d,year:year});
        Demo.staticProps.year = year;
    }   
    componentWillUnmount(){
        try {
            Demo.staticProps.scrollTop = $(window).scrollTop();
            Demo.staticProps.name = this.name;
        } catch (error) {
            
        }
        if(Demo.staticProps.timeline ){
            Demo.staticProps.timeline.kill && Demo.staticProps.timeline.kill();
        }
        if(audio.src && !audio.paused){
            audio.pause();
        }
    }
    itemhandclick(year,Location,No){
        if(Location=='LG'){
            if(No=='24'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Collaret1"):gtag('event', "EN_Lgallery_Collaret1")
            }else if(No=='25'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Rose"):gtag('event', "EN_Lgallery_Rose")
            }else if(No=='26'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Chrysanthemum"):gtag('event', "EN_Lgallery_Chrysanthemum")
            }else if(No=='27'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Peony"):gtag('event', "EN_Lgallery_Peony")
            }else if(No=='28'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Sequined"):gtag('event', "EN_Lgallery_Sequined")
            }else if(No=='29'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Sequins"):gtag('event', "EN_Lgallery_Sequins")
            }else if(No=='30'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_ZIP"):gtag('event', "EN_Lgallery_ZIP")
            }else if(No=='31'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Rose"):gtag('event', "EN_Lgallery_Rose")
            }else if(No=='32'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Collaret2"):gtag('event', "EN_Lgallery_Collaret2")
            }else if(No=='33'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Fee_Ondine"):gtag('event', "EN_Lgallery_Fee_Ondine")
            }else if(No=='34'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Bird"):gtag('event', "EN_Lgallery_Bird")
            }else if(No=='35'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Necklace"):gtag('event', "EN_Lgallery_Necklace")
            }else if(No=='36'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Five"):gtag('event', "EN_Lgallery_Five")
            }else if(No=='37'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Dragon"):gtag('event', "EN_Lgallery_Dragon")
            }else if(No=='38'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Carpe"):gtag('event', "EN_Lgallery_Carpe")
            }else if(No=='39'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_Lgallery_Lion"):gtag('event', "EN_Lgallery_Lion")
            }
            
        }else if(Location=='SG'||Location=='MG'){
            if(No=='1'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1900_Varuna"):gtag('event', "EN_1900_Varuna")
            }else if(No=='2'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1900_Chatelaine"):gtag('event', "EN_1900_Chatelaine")
            }else if(No=='3'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1920_Bracelet"):gtag('event', "EN_1920_Bracelet")
            }else if(No=='4'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1930_Minaudiere"):gtag('event', "EN_1930_Minaudiere")
            }else if(No=='5'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1930_Cadenas"):gtag('event', "EN_1930_Cadenas")
            }else if(No=='6'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1930_Hawai"):gtag('event', "EN_1930_Hawai")
            }else if(No=='7'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1940_Lace"):gtag('event', "EN_1940_Lace")
            }else if(No=='8'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1940_Spirit"):gtag('event', "EN_1940_Spirit")
            }else if(No=='9'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1940_Spanish"):gtag('event', "EN_1940_Spanish")
            }else if(No=='10'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1950_Pair"):gtag('event', "EN_1950_Pair")
            }else if(No=='11'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1950_Poppy"):gtag('event', "EN_1950_Poppy")
            }else if(No=='12'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1960_Indian"):gtag('event', "EN_1960_Indian")
            }else if(No=='13'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1970_Rose"):gtag('event', "EN_1970_Rose")
            }else if(No=='14'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1970_Alhambra"):gtag('event', "EN_1970_Alhambra")
            }else if(No=='15'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1960_Bird"):gtag('event', "EN_1960_Bird")
            }else if(No=='16'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1970_Panka"):gtag('event', "CN_1970_Panka")
            }else if(No=='17'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Marqueterie"):gtag('event', "EN_1980_Marqueterie")
            }else if(No=='18'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Sublime"):gtag('event', "EN_1980_Sublime")
            }else if(No=='19'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Venice"):gtag('event', "EN_1980_Venice")
            }else if(No=='20'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_2000_Butterfly"):gtag('event', "EN_2000_Butterfly")
            }else if(No=='21'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_1980_Triangle"):gtag('event', "EN_1980_Triangle")
            }else if(No=='22'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_2000_Victoria"):gtag('event', "EN_2000_Victoria")
            }else if(No=='23'){
                i18n.getLocal() == 'cn'?gtag('event', "CN_2000_Oiseau"):gtag('event', "EN_2000_Oiseau")
            }
        }
    }
    render() {
        var index = 0;
        let  _this = this;
        let enheaderimg = this.imgData[this.name].headerimg;
        let cnheaderimg = this.imgData[this.name].cnheaderimg;
        if (!this.state.data.length)return <div/>
        return (
            <div>
            <div className="gallery">
                <HeadNav list={true} right={false}>
                    {this.state.data[0].Location!='LG'?<div className="name"> <img src={i18n.getLocal()!='cn'?enheaderimg:cnheaderimg}/></div>:<div className="name"> <img style={{width:"4.64rem"}} src={i18n.getLocal()!='cn'?enheaderimg:cnheaderimg}/></div>}
                    {this.state.data[0].Location!='LG'?<div className="years"><p>{`${this.state.year}${i18n.getLocal()=='cn' ? '年代馆' :'s'}` }</p></div>:""}
                    {this.state.data[0].Location!='LG'?    <BgMusic music="app/media/bgm.mp3" year={this.state.year} openback={()=>{
                        
                        this.state.year=this.state.year.split('-')[0];
                        i18n.getLocal() == 'cn'?gtag('event', "CN_"+this.state.year+"_audio_open"):gtag('event', "EN_"+this.state.year+"_audio_open")                        
                        
                    }} closeback={()=>{
                        this.state.year=this.state.year.split('-')[0];
                        i18n.getLocal() == 'cn'?gtag('event', "CN_"+this.state.year+"_audio_close"):gtag('event', "EN_"+this.state.year+"_audio_close")                        
                        
                    }}/> :''}


                </HeadNav>
                {
                    this.name !='LG' ? <Pagedownheader data={this.cache } cyear={this.state.year}  type={this.name}  onSelect={this.select}/> :''
                }
                {
                  this.state.data.length>1?
                  <div className="scroll_y" style={{width: "100%", height: "100%", paddingBottom: "1.5rem", overflow: "hidden",marginTop: '.2rem'}}>
                  {
                      this.state.data[0] &&
                      <div className="year-desc">
                          {

                              /*<p className="fm-ht">{this.state.data[0].Zcontent}</p>*/
                              <p dangerouslySetInnerHTML={{__html:this.state.data[0].Zcontent}} className={`${i18n.getLocal()!='cn'  ? 'fm-bl' :'fm-ht'}`}></p>
                          }
                      </div>
                  }{
                      this.state.data[0].Location!='LG'?
                     '':<div className="fm-ht" style={{color:'white',marginTop: '.6rem'}}>
                     {  
                            i18n.getLocal()=='cn'?
                            <p style={{fontSize: ".28rem"}}>轻点 <img src={'app/images/icon/yaoshi.png'} style={{width: '.4rem'}} className="yaoshiicon"/> 图案，解密臻品</p>:<p style={{fontSize: ".3rem"}}>Click it (with <img src={'app/images/icon/yaoshi.png'} style={{width: '.4rem'}} className="yaoshiicon"/> icon) to explore more of the exhibit</p>   
                     }
                    </div>}
                  <div className="recommend">

                      <span className="line"></span>
                      <span className={`${i18n.getLocal()!='cn'  ? 'fm-bl' :'fm-ht'} text` }>{i18n.getLocal()=='cn'? this.state.data[0].list_recommend :'RECOMMENDATIONS'} </span>
                      <span className="line" ></span>
                  </div>
                  <div className="product_list">
                      {
                          this.state.data.map(function (data,i) {
                              return (
                                  <div className="item" onClick={()=>{_this.itemhandclick(data.Area,data.Location,data.No)}}>
                                      {/* <div className="mgax"> */}
                                      <a onClick={(event)=>{
                                          $(event.target).parent().parent().find(".key").addClass("numberBox_inputBox_animation");
                                        //   $('.key').addClass('numberBox_inputBox_animation');
                                          setTimeout(()=>{
                                               window.location = "#PageSmallDetail/" + data.No;
                                                // AudioBox.playMusic("app/media/bgm.mp3");
                                                //PageSmallDetail.LoadAudiou();
                                                audiotwo.src = data.AudioUrl;
                                                audiotwo.play();
                                          },200);
                                      }}>
                                          <div className="thumail" style={{position:'relative'}}>
                                              {i==0 && !_this.isFirst ? <img id="hand" className="hand_ani" src="app/images/hand.png" style={{position:'absolute',left:'48%',top:'48%',zIndex:2,width:'.6rem'}}></img>:''}

                                              <img src={"app/images/Links/" + data.No + ".png"} style={data.imgsizes=='true'?{width:(data.Width /90+'rem')}:{width:(data.Width / 115+'rem')}}/>
                                              
                                          </div>
                                          <div className={`${i18n.getLocal()!='cn'  ? 'fm-fr' :'fm-st'} title-wrape`}>
                                              <div className="title">
                                              <span className="cnen fm-st"  dangerouslySetInnerHTML={{__html:data.Title}}></span>
                                                  <span>
                                                      {
                                                          data.Imgyaoshi &&
                                                          <div className="key">
                                                              <img src={data.Imgyaoshi}/></div>
                                                      }
                                                  </span></div>
                                          </div>
                                          {
                                              data.QuesType!="YearInput" && 
                                              <div className="fm-st year">{data.Year}</div>
                                          }
                                          <div className={`${i18n.getLocal()!='cn'  ? 'fm-bl' :'fm-st'}`} dangerouslySetInnerHTML={{__html:data.Desc}} style={{fontSize:".32rem",color:"white",width:"80%",lineHeight:'.4rem',textAlign:"center",margin:"auto",marginTop:".15rem"}}>
                                          </div>
                                          <div className="fm-st" style={{fontSize:".28rem",color:"white",width:"80%",textAlign:"center",margin:"auto",marginTop:".15rem"}}>
                                                {`${i18n.getLocal()!='cn'  ? "" :data.Desc2}`}
                                            </div>
                                      </a>
                                     {/* </div > */}
                                  </div>
                              )
                          })
                      }
                       {
                           !(this.mapyear == '1930'||this.mapyear == "2000-2010")?
                           <a onClick={()=>{this.getIndex();
                            let mapyears = this.mapyear;
                            mapyears=mapyears.split('-')[0];
                            i18n.getLocal() == 'cn'?gtag('event','CN_'+mapyears+'_Next'):gtag('event','EN_'+mapyears+'_Next');
                            }}>
                            {this.name=="LG"?"":<span className={i18n.getLocal() == 'cn'?"btnsss":"btnsss fm-fr"}>{i18n.getLocal() == 'cn' ? '进入下一年代'  :'Proceed to the next era'}</span>}
                           </a>:
                           <a ref="getnextgallery" onClick={()=>{this.getnextgallery()}}> 
                               <span className={i18n.getLocal() == 'cn'?"btnsss":"btnsss fm-fr"}>
                                    {i18n.getLocal() == 'cn' ? '进入下一陈列廊'  :'Proceed to the next gallery'}
                               </span>
                            </a>
                       } 
                  </div>
              </div>:
              <div className="scroll_y" style={{width: "100%", height: "100%", paddingBottom: "5rem", overflow: "hidden"}}>
              {
                  this.state.data[0] &&
                  <div className="year-desc">
                      {

                          /*<p className="fm-ht">{this.state.data[0].Zcontent}</p>*/
                          <p dangerouslySetInnerHTML={{__html:this.state.data[0].Zcontent}} className={`${i18n.getLocal()!='cn'  ? 'fm-bl' :'fm-ht'}`}></p>
                      }
                  </div>
              }
              <div className="recommend">

                  <span className="line"></span>
                  <span className={`${i18n.getLocal()!='cn'  ? 'fm-bl' :'fm-ht'} text` }>{i18n.getLocal()=='cn'? this.state.data[0].list_recommend :'RECOMMENDATIONS'} </span>
                  <span className="line" ></span>
              </div>
              <div className="product_list">
                  {
                      this.state.data.map(function (data) {
                          return (
                              <div className="item" onClick={()=>{_this.itemhandclick(data.Area,data.No)}} >
                                  {/* <div className="mgax"> */}
                                  <a onClick={()=>{
                                     window.location = "#PageSmallDetail/" + data.No;
                                      // AudioBox.playMusic("app/media/bgm.mp3");
                                      //PageSmallDetail.LoadAudiou();
                                  }}>
                                      <div className="thumai">
                                          <img src={"app/images/Links/" + data.No + ".png"} style={{width:(data.Width / 115 +'rem')}}/>
                                      </div>
                                      <div className={`${i18n.getLocal()!='cn'  ? 'fm-fr' :'fm-st'} title-wrape`}>
                                            <div className="title">
                                                <span className="cnen fm-st"  dangerouslySetInnerHTML={{__html:data.Title}}></span>
                                                <span>
                                                   {
                                                      data.Imgyaoshi &&
                                                      <div className="key">
                                                      <img src={data.Imgyaoshi}/>
                                                      </div>
                                                   }
                                                </span>
                                            </div>
                                      </div>
                                      {
                                          data.QuesType!="YearInput" && 
                                          <div className="fm-st year">{data.Year}</div>
                                      }
                                    <div className={`${i18n.getLocal()!='cn'  ? 'fm-bl' :'fm-st'}`} dangerouslySetInnerHTML={{__html:data.Desc}} style={{fontSize:".32rem",color:"white",width:"80%",lineHeight:'.4rem',textAlign:"center",margin:"auto",marginTop:".15rem"}}>

                                    </div>
                                    <div className="fm-st" style={{fontSize:".28rem",color:"white",width:"80%",textAlign:"center",margin:"auto",marginTop:".15rem"}}>
                                        {`${i18n.getLocal()!='cn'  ? "" :'梵克雅宝典藏'}`}
                                    </div>
                                  </a>
                                 {/* </div > */}
                              </div>

                          )
                      })

                  }
                {
                           !(this.mapyear == '1930'||this.mapyear == "2000-2010")?
                            <a onClick={()=>{this.getIndex();
                                let mapyears = this.mapyear;
                                mapyears=mapyears.split('-')[0];
                                i18n.getLocal() == 'cn'?gtag('event','CN_'+mapyears+'_Next'):gtag('event','EN_'+mapyears+'_Next');
                                }}>
                            {this.name=="LG"?"":<span className={i18n.getLocal() == 'cn'?"btnsss":"btnsss fm-fr"}>{i18n.getLocal() == 'cn' ? '进入下一年代'  :'Proceed to the next era'}</span>}
                           </a>:
                           <a ref="getnextgallery" onClick={()=>{this.getnextgallery()}}>
                                <span className={i18n.getLocal() == 'cn'?"btnsss":"btnsss fm-fr"}>
                                        {i18n.getLocal() == 'cn' ? '进入下一陈列廊'  :'Proceed to the next gallery'}
                                </span>
                           </a>
                       }
              </div>
          </div>
                }
                {
                   this.state.data[0].Location!='LG'?<Shade  type={this.state.data[0].Location} mapId={this.maps[this.name]} mapsyear={this.mapyear} />:
                   <Shade type={this.state.data[0].Location} mapId={this.maps[this.name]} mapsyear={this.mapyear} props = {this.states}/>
                }
            </div>
            <div style={{position:"fixed",top:"-18px",left:"0",backgroundImage:"url("+this.imgData[this.name].bgimg+")",backgroundSize:"100% 100%",width:"100%",height:"100%",zIndex:"-99", paddingBottom: '18px'}}>

            </div>

            </div>
        )
    }
}