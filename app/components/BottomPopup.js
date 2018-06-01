// 底部弹出层组件
import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import $ from "jquery";

export default class BottomPopup extends React.Component{
    constructor(props){
        super(props);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.tapBox = this.tapBox.bind(this);

        this.state={content:""};

        this.onLoad = null;
    }
    componentDidMount(){
        // window.pop = this;
        $(this.refs.box).on("touchMove",function(event){
            event.preventDefault();
        });

          typeof(this.onLoad) == "function"  &&  this.onLoad(this);

    }
    show(text,onLoad,onclose){
        this.onLoad = onLoad;
        this.onClose = onclose;
        this.refs.box.style.display = "block";
        this.setState({content:text});
        $(this.refs.box).addClass("BottomPopupShow");
    }
    close(){
         $(this.refs.box).removeClass("BottomPopupShow");
         setTimeout(()=>{
             this.refs.box.style.display = "none";
             if (this.onClose) {
                 this.onClose();
             }
         },300);
        typeof(this.onLoad) == "function" &&  this.onLoad(false);
        this.onLoad = null;
    }
    componentDidUpdate(){
       //执行回调
        typeof(this.onLoad) == "function" &&  this.onLoad(true);
     }
     componentWillUnmount(){
       //执行回调
        typeof(this.onLoad) == "function" &&  this.onLoad(false);
        this.onLoad = null;
     }
    tapBox(event){
       event.preventDefault();
    //    if(this.props.close == false)return;
       let target = event.target;
       if(target.dataset.type === "box"){
           this.close();
       };
    }
    render(){
        return(
            <div className="BottomPopup" data-type="box" ref="box" onClick={this.tapBox}>
                {
                    typeof this.state.content === "string"?
                    <div className="BottomPopupContent" dangerouslySetInnerHTML={{__html:this.state.content}}>

                    </div>:
                    <div className="BottomPopupContent">
                        {
                            this.state.content
                        }
                    </div>
                }
            </div>
        )
    }
}
