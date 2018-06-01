import React from "react";
import ReactDOM from "react-dom";
import Roll_chose from '../css/Roll.css';
import i18n from '../i18n/i18n';

export default class Shade extends React.Component{
    constructor(props){
       super(props);
    };
    componentDidMount(){
        window.isHomePageLoad = true;
    }
    handleSubmit(e) {
    //     e && e.preventDefault();
    //     this.setState({
    //         name: this.refs.name.value
    //     });
    //     console.log('name', this.setState.name)
    }
    getMapYear(){
        let years =  this.props.mapsyear;
        let y = years.split("-");
        return y[0];
    }
    render(){
        return(
            <div className="footers">
               <form onSubmit={this.handleSubmit}>
                    <a ref="mainkv" href ="#" onClick={()=>{
                        i18n.getLocal()=='cn'?gtag('event',`CN_${this.getMapYear()}_footerbar_Home`):gtag('event',`EN_${this.getMapYear()}_footerbar_Home`)}}>
                        <img src={i18n.getLocal()=='cn'?'app/images/homeeej.png':'app/images/enh.png'} className={i18n.getLocal()=='cn'?"g4":"ggg"}alt="5"/>
                    </a>
                    {/* <a href="#PageSearch">
                        <span type="submit"  value="搜索"><img src={'app/images/icon/icon_9.png'} className="g5"alt="5"/></span>
                    </a> */}
                    {/* <a  href ={"#PageMap/"+(this.props.mapyear || '1920') +"/" + this.props.type} >
                        <img src={'app/images/icon/errrj.png'} className="g6"alt="5"/>
                    </a> */}
                    <a  href="#PageSearch" onClick={()=>{i18n.getLocal()=='cn'?gtag('event',`CN_${this.getMapYear()}_footerbar_Search`):gtag('event',`EN_${this.getMapYear()}_footerbar_Search`)}}>
                        <img src={i18n.getLocal()=='cn'?'app/images/errrj.png':'app/images/ens.png'} className="g6"alt="5"/>
                    </a>
               </form>
           </div>  
        )
    }
}