import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import $ from "jquery";
import i18n from '../i18n/i18n';


export default class ComponentNumber extends React.Component{
    static propTypes = {
        filePath:PropTypes.string,
        title: PropTypes.string,
        content:PropTypes.string,
        callback:PropTypes.func,
        keyWordList:PropTypes.array
    };
    // 默认属性
    static defaultProps = {
        type:"numer",
        keyWord:["0000"],
        title:"标题",
        content:"",
        fileType:"img",
        keyWordList:[]
    };
    constructor(props){
        super(props);
        this.tapBtn = this.tapBtn.bind(this);
        this.empty = this.empty.bind(this);
    }

    componentDidMount(){
       //如果是音频问题
       if(this.props.fileType === "audio" && this.refs.audio){
           this.refs.audio.play();
       }
    }

    tapBtn(event){
        event && event.preventDefault();

        this.vibration([50]);
        let target = event.target;
        if(target.tagName != "LI")return;
        let inputBox = this.refs.inputBox;
        let inputItem = $(inputBox).find('li:empty:first');
        if(inputItem.length<=0){
            this.empty();
            return;
        }

        let num = target.innerText;
        inputItem.text(num);

        let emptyItem = $(inputBox).find('li:empty');
        if(emptyItem.length <= 0){
            // 得到输入结果
            let inputItem = $(inputBox).find("li");
            let text = '';
            inputItem.each((index,item)=>{
                    text+=item.innerText;
            });
            // 对比结果
            // let success = text.trim() === this.props.keyWord.trim();
            let success = this.isCorrect(inputItem);
            if(success){
                this.empty();
            }else{
                $(inputBox).addClass("numberBox_inputBox_animation");
                this.vibration([200,200]);
                setTimeout(()=>{
                    $(inputBox).removeClass("numberBox_inputBox_animation");
                    this.empty();
                },200);
            }
            // 执行回调
            typeof this.props.callback === "function" && this.props.callback(success);


        }
    }
    //清空
    empty(){
        let inputItem = $(this.refs.inputBox).find("li");
        inputItem.each((index,item)=>{
             item.innerText = "";
        });
    }
    vibration(data){
        navigator.vibrate = navigator.vibrate
                || navigator.webkitVibrate
                || navigator.mozVibrate
                || navigator.msVibrate;

        if (navigator.vibrate) {
            // 支持
            navigator.vibrate(data);
        }
    }

    getHead(){
        if(this.props.filePath && this.props.fileType){
            switch (this.props.fileType) {
                case "img":
                    return <img src={this.props.filePath} />;
                    break;
                case "audio":
                    return (
                      <div className="audioBox_2">
                        <audio ref="audio" src={this.props.filePath}>
                            您的设备不支持音频播放
                        </audio>
                        <svg viewBox="0 0 24 24">
                            <path d="M20.507,12.851v5.215c0,1.048-0.847,1.894-1.892,1.894s-1.892-0.846-1.892-1.894v-5.215 c0-1.048,0.847-1.894,1.892-1.894c0.363,0,0.685,0.13,0.973,0.308C18.982,7.61,15.823,4.808,12,4.808 c-3.821,0-6.981,2.802-7.588,6.457c0.289-0.178,0.609-0.308,0.973-0.308c1.046,0,1.893,0.846,1.893,1.894v5.215 c0,1.048-0.847,1.894-1.893,1.894c-1.044,0-1.892-0.846-1.892-1.894v-5.215c0-0.115,0.046-0.214,0.065-0.325H3.514 c0-4.678,3.808-8.485,8.485-8.485c4.68,0,8.487,3.808,8.487,8.485h-0.044C20.462,12.636,20.507,12.736,20.507,12.851z"/>
                        </svg>
                      </div>
                    );
                    break;
                default:
                    return false;
                    break;
            }
        }

        return false;
    }
    // 获得随机数字
    getRandomArr(){
        var arr=[];
        for(var i=0;i<10;i++){
                arr[i]=i;
        }
        arr.sort(function(){ return 0.5 - Math.random()})
        return arr;
    }

    // 根据组件类型返回相应视图
    getTypeComponent(){
        switch (this.props.type) {
            case "numer":
                // let size = this.props.keyWord.length;
                let size = this.props.size || 4;
                return[
                    <ul key="001" className="numberBox_inputBox fm-qb" ref="inputBox">
                     {
                         Array.apply("", Array(size)).map(()=><li></li>)
                     }
                    </ul>,
                    <ul key="002" className="numberBox_inputBox fm-qb numberBox_inputBox_min" onClick={this.tapBtn}>
                        {
                            this.getRandomArr().map((i,index)=>(
                                <li key={index}>{i}</li>
                            ))
                        }
                    </ul>
                ]
                break;
            case "radio":
                 return(
                    <ul className={i18n.getLocal()=='cn'?"numberBox_radioBox":"fm-bl numberBox_radioBox"} onClick={this.tapRadio}>
                        {
                            this.props.keyWordList.map((item,index)=>(
                                <li key={index} data-index={index+1} dangerouslySetInnerHTML={{__html:item}}></li>
                            ))
                        }
                    </ul>
                 )
            default:
                break;
        }
        return false;
    }
    tapRadio=(event)=>{
        event && event.preventDefault();
        let target = event.target;
        if(target.tagName != "LI")return;

        $(target).addClass("active").siblings().removeClass("active");

        // 判断是否正确
        let text = target.innerText;
        // let success = text.trim() === this.props.keyWord.trim();

        // 测试
        let success = this.isCorrect(target);

        if(success){

        }else{
            $(target).addClass("numberBox_inputBox_animation");
            this.vibration([200,200]);
            setTimeout(()=>{
                $(target).removeClass("numberBox_inputBox_animation");
            },200);
        }
        // 执行回调
        typeof this.props.callback === "function" && this.props.callback(success);
    }
    //判断是否是正确答案
    isCorrect(target){
        if(!target)return false;
        // let keyWordList = this.props.keyWordList; // 可选答案列表
        // keyWordList = typeof(keyWordList) === "string"?[keyWordList]:keyWordList;

        let keyWord = this.props.keyWord; // 正确列表
        keyWord = typeof(keyWord) === "object"?keyWord:[keyWord];
        for(let i in keyWord){
            let s = keyWord[i];
            let k="";
            if(this.props.type == "numer"){
                target.each((index,item)=>{
                    k+=item.innerText;
                });
                if(typeof(s) === "number" && this.props.keyWordList){
                    s = this.props.keyWordList[s-1];
                }
            }else if(this.props.type == "radio"){
                k = typeof(s) === "string"?target.innerText:target.dataset.index;
            }else{
                return false;
            }
            // console.log(keyWord+"\n"+k+"____"+s+"="+(k == s));
            if(k == s)return true;;
        }

        return false;
    }
    render(){
        return(
        <React.Fragment>

            <div className="numberBox" ref="numberBox">

                {
                    this.props.children
                }
                {/*<div style={{position:'absolute',left:0,top:0}}>*/}
                <p dangerouslySetInnerHTML={{__html:this.props.title}} className={`${i18n.getLocal()!='cn'  ? 'fm-fr' :'fm-st'} numberBox_title`}>

                    {/* {this.props.title2 && <span>{this.props.title2}</span>} */}
                    
                </p>
                {this.props.title2 && <span className="fm-st" style={{color:"white",fontSize:".35rem"}}>{this.props.title2}</span>}
                {
                    this.getHead()
                }
                <p className="cnen fm-bl"style={{
                    margin:'.2rem .5rem'
                }} dangerouslySetInnerHTML={{__html:this.props.content}}></p>
                {
                    this.getTypeComponent()
                }

                {/*</div>*/}
            </div>

        </React.Fragment>

        )
    }
}
