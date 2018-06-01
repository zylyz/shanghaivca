import React from "react";
import ReactDOM from "react-dom";
import Roll_scroll from '../css/Roll_scroll.css';
import $ from 'jquery'
import jMove from "../lib/jMove";
export default class Rollscroll extends React.Component{
    constructor(props){
       super(props);
       this.state={
           currentAnswer:null
       }
       this.isCar = ["28","30","36"];  //卡片类型

    };
    componentDidMount(){
        var minHeight=1204;
        var w = window.innerWidth || document.documentElement.offsetWidth || document.body.offsetWidth;
        var h = window.innerHeight || document.documentElement.offsetHeight || document.body.offsetHeight;
        var ah = Math.max(850,750/(w/h));
        if(ah<minHeight){
              var s = (ah -850) /(minHeight-850);
              var obj =$(this.refs.container) ;
              jMove.css(obj,{'transform-origin':'50% 0'});
             jMove.css(obj,{scale:s});
        }
    }
    handle(index){
      this.setState({currentAnswer:index});
      typeof this.props.onChange == "function" && this.props.onChange(index);
    }
    getImgSrc(src){
        let srcs = src;
        try {
            let s = srcs.split(".");
            let fName = s[0];
            let fType = s[1];
            // console.log(fName+"_2."+fType);
            return fName+"_3."+fType;
        } catch (error) {
            return src;
        }
       
    }
    render(){
          let item = this.props.dataList;
          let No = this.props.ids;
        //   console.log('zzzzzz',No);
        //   console.log("_________________________",this.isCar.indexOf(No));
        return(
            
            <div className="gun">
                <ul ref="container">
                    {
                        this.isCar.indexOf(No)!=-1? item.map((item,index) =>
                        <li key={index}  onClick={()=>this.handle(index)} className="li">
                                <span  className="yuan" > 
                                   {this.state.currentAnswer== index ? 
                                         <img src={'app/images/dui.png'} alt="1"/> :''
                                    }
                                    {/* <img  src={item.game_src} alt={item.alt}/> */}
                                </span>
                                {/* <img  style={this.state.currentAnswer != index ?  tt.map((tt,index) => 
                                       <li key={index} onClick={()=>this.handle(index)} className="li" >
                                           <img   src={tt.game_srcs} alt={tt.alt}/>
                                       </li> */}
                                {/* ): {opacity:.7} } src={item.game_src} alt={item.alt}/> */}
                                <img className="jamess"  data-src={item.game_src} src={this.state.currentAnswer == index?this.getImgSrc(item.game_src):item.game_src} />
                        </li> 
                    ) : item.map((item,index) =>
                    <li key={index}  onClick={()=>this.handle(index)} className="lis" style={{marginTop:'.23rem'}}>
                            <span  className="yuan" > 
                               {this.state.currentAnswer== index ? 
                                     <img src={'app/images/dui.png'} alt="1"/> :''
                                }
                                {/* <img  src={item.game_src} alt={item.alt}/> */}
                            </span>
                            <span className="spans"><img    src={item.game_src} alt={item.alt}/></span>
                            
                    </li>
                ) 
                    }
                </ul>
           
            </div>

            
        )
    }
}