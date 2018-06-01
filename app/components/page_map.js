import React from "react";
import ReactDOM from "react-dom";
import vca from "../lib/vca.js";
import i18n from '../i18n/i18n';
console.log('zyzyzyz',vca);
export default class PageMap extends React.Component{
    constructor(props){
        super(props);
      
        // 地图 大中小 数据
        // this.state={
        //     data:[
        //         {
        //             titleImg:"app/images/largeimg.png",
        //            // title2Img:"app/images/largetitlemap.png",
        //             contentImg:"app/images/lg0.png"
        //         },
        //         {
        //             titleImg:"app/images/SMALLGALLERY1.png",
        //             title2Text:" 1910s-1930s ",
        //             contentImg:"app/images/sg0.png"
        //         },
        //         {
        //             titleImg:"app/images/MEDIUMGALLERY1.png",
        //             title2Text:" 1940s-2010s ",
        //             contentImg:"app/images/mg0.png"
        //         }
        //     ],

        // };
        this.mapData = {
            "1920":{
                titleImg:"app/images/SMALLGALLERY1.png",
                contentImg:"app/images/cnsg0000.png",
                encontentImg:"app/images/ensg.png",
                "cnheaderimg":"app/images/cn-title-sg.png"
            },
            "1930":{
                titleImg:"app/images/SMALLGALLERY1.png",
                contentImg:"app/images/cnsg0000.png",
                encontentImg:"app/images/ensg.png",
                "cnheaderimg":"app/images/cn-title-sg.png"
            },
            "1900-1910":{
                titleImg:"app/images/SMALLGALLERY1.png",
                contentImg:"app/images/cnsg0000.png",
                encontentImg:"app/images/ensg.png",
                "cnheaderimg":"app/images/cn-title-sg.png"
            },
            "1940":{
                titleImg:"app/images/MEDIUMGALLERY1.png",
                contentImg:"app/images/cnmg.png",
                encontentImg:"app/images/enmg.png",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "1950":{
                titleImg:"app/images/MEDIUMGALLERY1.png",
                contentImg:"app/images/1950-mg.png",
                contentImg:"app/images/cnmg.png",
                encontentImg:"app/images/enmg.png",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "1960":{
                titleImg:"app/images/MEDIUMGALLERY1.png",
                contentImg:"app/images/1960-mg.png",
                contentImg:"app/images/enmg.png",
                encontentImg:"app/images/enmg.png",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "1970":{
                titleImg:"app/images/MEDIUMGALLERY1.png",
                contentImg:"app/images/1970--mg.png",
                contentImg:"app/images/cnmg.png",
                encontentImg:"app/images/enmg.png",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "1980-1990":{
                titleImg:"app/images/MEDIUMGALLERY1.png",
                contentImg:"app/images/1980-1990-mg.png",
                contentImg:"app/images/cnmg.png",
                encontentImg:"app/images/enmg.png",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "2000-2010":{
                titleImg:"app/images/MEDIUMGALLERY1.png",
                contentImg:"app/images/2000-2011--mg.png",
                contentImg:"app/images/cnmg.png",
                encontentImg:"app/images/enmg.png",
                "cnheaderimg":"app/images/1940-2010-cn.png"
            },
            "0000":{
                titleImg:"app/images/en-title-lg.png",
                contentImg:"app/images/cnlg.png",
                encontentImg:"app/images/enlg.png",
                "cnheaderimg":"app/images/cn-title-lg.png"
            }
        }
    }
    componentDidMount(){

    }
    render(){
        let index = parseInt(this.props.match.params.id || 1);
        // let data = this.mapData[index-1];
        console.log('propsssssss',this.props)
        let mapid = this.props.match.params.id;
        let titleImg = this.mapData[mapid].titleImg;
        let cnheaderimg = this.mapData[mapid].cnheaderimg;
        let encontentImg = this.mapData[mapid].encontentImg;
        let cncontentImg = this.mapData[mapid].contentImg;
        return(
            <div className={"page_map page_map"+mapid}>
                <div className="p_s_d_header">
                    <a href="javascript:window.history.go(-1)"><div className="p_s_d_h_left"><img src={"app/images/return.png"}/></div></a>
                    <div className="p_s_d_h_center">
                    {
                        this.props.match.params.type =="LG" 
                        ? <img src={i18n.getLocal()!='cn'?titleImg:cnheaderimg} style={{display:"block",width:"4.64rem",position:'absolute',left:'-0.32rem',top:".59rem"}}/>
                        :<img src={i18n.getLocal()!='cn'?titleImg:cnheaderimg} style={{display:"block",width:"3.212rem",margin:"auto",top:".59rem"}}/>
                    }
                    
                    <div>
                            

                        {mapid=='0000'?
                            "":<div>{i18n.getLocal()!='cn'?
                            <p className="fm-st" style={{fontSize:".38rem",top:".55rem",letterSpacing:"0"}}>{mapid+'s'}</p>
                            :<p className="fm-st" style={{fontSize:".38rem",top:".55rem",letterSpacing:"0"}}>{mapid+'年代馆'}</p>
                        }</div>
                        }
                    </div>
                    {/* {
                          data.title2Img?
                          <img src={data.title2Img} style={{display:"block",width:"3.64rem",margin:"auto",marginTop:".2rem"}}/>:
                          <p className="fm-st" style={{fontSize:'.38rem'}}>{data.title2Text}</p>
                    } */}
                    </div>
                </div>
                <div className="p_s_d_h_content">
                <img src={i18n.getLocal()!='cn'?encontentImg:cncontentImg}/>
                </div>
                <div className="p_s_d_h_bottom">
                    <div>
                        <span>
                          <a href="#">
                            <img src={"app/images/icon_11.png"}/>
                          </a>
                        </span>

                        <span>
                           <a href="#PageSearch">
                            <img src={"app/images/icon/icon_9.png"}/>
                           </a>
                        </span>

                        <span>
                            <a href ="javascript:window.history.go(-1)" >
                                <img src={"app/images/icon_10.png"}/>
                            </a>
                            
                            </span>
                    </div>
                </div>
            </div>
        )
    }
}
