import React from "react";
import ReactDOM from "react-dom";
export default class Pagemenu extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        return(
            <div className="page_menu_bg">
                <div>
                    <img src={"./app/images/logo_0.png"}/>
                </div>
                <div>
                    <p>SMALL GALLERY</p>
                    <p><span></span>1910s-1930s<span></span></p>
                </div>
                <div>
                    <p>MEDIUM GALLERY</p>
                    <p><span></span>1940s-2010s<span></span></p>
                </div>
                <div>
                    <p>LARGE GALLERY</p>
                    <p><span></span>10 MUST SEE PIECES<span></span></p>
                </div>
                <div className="watch_detail">
                    <div>
                        <img src={"./app/images/i.png"}/>
                    </div>
                </div>
                <div className="change_language">
                    <div>
                        <img src={"./app/images/en.png"}/>
                    </div>
                </div>
            </div>
        )
    }
}