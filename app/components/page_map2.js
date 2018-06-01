import React from "react";
import ReactDOM from "react-dom";

export default class PageMap2 extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="page_map">
                <div className="p_s_d_header">
                    <a href="javascript:window.history.go(-1)"><div className="p_s_d_h_left"><img src={"app/images/return.png"}/></div></a>
                    <div className="p_s_d_h_center">
                        <img src={"app/images/MEDIUM GALLERY.png"} style={{display:"block",width:"2.92rem",margin:"auto"}}/>
                          <p> 1910s-1930s </p>
                    </div>
                </div>
                <div className="p_s_d_h_content">
                    <img src={"app/images/map2_0.png"}/>
                </div>
                <div className="p_s_d_h_bottom">
                    <div>   
                        <span><img src={"app/images/icon_11.png"}/></span>
                        <span><img src={"app/images/icon_9.png"}/></span>
                        <span><img src={"app/images/icon_10.png"}/></span>
                    </div>
                </div>
            </div>
        )
    }
}