import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import $ from "jquery";
import ComponentNumber from "./ComponentNumber";
import BottomPopup from "./BottomPopup";
import Detail_game from "./detail/detail_game";
import i18n from '../i18n/i18n';
import api from '../lib/api';
import Game_Bg from "./Game_Bg";
import Roll_chose from "./Roll_chose";
import HeadNav from "./HeadNav";
import PageSmallDetail from "./page_small_detail";
import AudioBox from "./AudioBox.js";
import audiotwo from '../lib/musictwo';


// 问答页面
export default class PageQuestionAnswering extends React.Component {
    constructor(props) {
        super(props);
        this.num = 0;
        this.state = {
            data: {}
        };

        var arr = [];
        try {
            if(this.props)this.init(this.props.match.params.id);
        } catch (error) {
        }

        this.popContent = this.initPopContent();
        /*测试答题记录数据*****************/
        if(!this.isweixin()){
            this.questionList = JSON.parse(localStorage.questionList || "{}");
        }


    }
    isweixin() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    }
    init(id){
        /*测试答题记录数据*****************/
        if(!this.isweixin()){
            this.pageID = id;
            this.questionList = JSON.parse(localStorage.questionList || "{}");
        }else{
        this.pageID = id;
        var userinfos = api.doGetUserInfo();
        userinfos.then((datas)=>{
            this.questionList2 = datas.data.questionList;
            this.questionList2Key = [];

            for(let i in this.questionList2){
                if(this.questionList2[i] == 1){
                    let keyName = i.replace("question","");
                    this.questionList2Key.push(keyName);
                }
            }

            if(this.isInit){
                try {
                    // let id = this.props.match.params.id;
                    let s = this.questionList2Key.includes(id.toString())
                    if(s){
                       this.result(true,id);         
                    }else{
                        this.refs.DetailGame.resizssss(10);
                    }
                } catch (error) {
                    
                }
            }
        });
    }
    }

    componentDidMount() {
        this.isInit = true;
        let id = this.props.match.params.id;
        let datas = i18n.getJSONData("ApplicationData");//.ApplicationData;
        let tempArr = datas.filter((data) => {
            return data.No == id.toString();
        });
        if (tempArr) {
            this.setState({data: tempArr[0]});
        }

        

        $(window).scrollTop(0);

        //检查这道题是否已经回答过
        try {
            
            if(this.isweixin()){
                let s = this.questionList2Key.includes(id.toString());
                if(s){
                   this.result(true,id);         
                }
            }else{
                let s = this.questionList[id];
                if(s){
                this.result(true,id);         
                }
            }
        } catch (error) {
            
        }
        
    }
    componentWillUnmount(){
        // 测试 答题记录 写入缓存
        if(!this.isweixin()){
            var obj = this.questionList;
            var str = JSON.stringify(obj);
            //存入
            localStorage.questionList = str;
        }
        
    }
    async submitQues(no, status) {
        no = no || this.state.data["No"];
        console.log(this.state.data["No"]);

        try {
            var r = await api.doQuestion(no, status);
            console.log(r);
        } catch (ex) {
            console.log('submit error' + ex);
        }
    }

    onError(no) {
        this.submitQues(no, 0);
    }

    onRight(no) {
        this.submitQues(no, 1);
    }
     async onComplete (){
         try {
             var r = await  api.doGetCode();
            //  console.log('累',r)
             if(r.errorcode == 0){
                 return r.data.code;
             }
             return false;
         } catch (ex) {
             return false
         }

    }
    /**
     *     测试  初始化回答问题结果弹窗
     *     PopSuccess           正确
     *     PopFail              错误
     *     PopFirstCompletion   首次集齐
     *     PopCompletion        集齐
     * */
    // 点击知道了
    knowhandclick(){
        let isCn = i18n.getLocal()=='cn';
        if(this.pageID=='24'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Collaret1_quiz_Yes"):gtag('event', "EN_Lgallery_Collaret1_quiz_Yes")
        }else if(this.pageID=='28'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Sequined_quiz_Yes"):gtag('event', "EN_Lgallery_Sequined_quiz_Yes")
        }else if(this.pageID=='36'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Five_quiz_Yes"):gtag('event', "EN_Lgallery_Five_quiz_Yes")
        }else if(this.pageID=='37'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Dragon_quiz_Yes"):gtag('event', "EN_Lgallery_Dragon_quiz_Yes")
        }else if(this.pageID=='27'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Peony_quiz_Yes"):gtag('event', "EN_Lgallery_Peony_quiz_Yes")
        }else if(this.pageID=='29'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Sequins_quiz_Yes"):gtag('event', "EN_Lgallery_Sequins_quiz_Yes")
        }else if(this.pageID=='30'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_ZIP_quiz_Yes"):gtag('event', "EN_Lgallery_ZIP_quiz_Yes")
        }else if(this.pageID=='31'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Mystere_quiz_Yes"):gtag('event', "EN_Lgallery_Mystere_quiz_Yes")
        }else if(this.pageID=='32'){
            window.history.go(-2);
            isCn?gtag('event', "CN_Lgallery_Collare2_quiz_Yes"):gtag('event', "EN_Lgallery_Collare2_quiz_Yes")
        }else if(this.pageID=='25'){
            if(location.hash == '#/Box_game'){
                window.history.go(-3);
            }else{
                window.history.go(-2);
            }
            isCn?gtag('event', "CN_Lgallery_Rose_quiz_Yes"):gtag('event', "EN_Lgallery_Rose_quiz_Yes")
        }
    }
    tryagainclick(){
        let isCn = i18n.getLocal()=='cn';
        if(this.pageID=='24'){
            isCn?gtag('event', "CN_Lgallery_Collaret1_quiz_Try"):gtag('event', "EN_Lgallery_Collaret1_quiz_Try")
        }else if(this.pageID=='28'){
            isCn?gtag('event', "CN_Lgallery_Sequined_quiz_Try"):gtag('event', "EN_Lgallery_Sequined_quiz_Try")
        }else if(this.pageID=='36'){
            isCn?gtag('event', "CN_Lgallery_Five_quiz_Try"):gtag('event', "EN_Lgallery_Five_quiz_Try")
        }else if(this.pageID=='37'){
            isCn?gtag('event', "CN_Lgallery_Dragon_quiz_Try"):gtag('event', "EN_Lgallery_Dragon_quiz_Try")
        }else if(this.pageID=='27'){
            isCn?gtag('event', "CN_Lgallery_Peony_quiz_Try"):gtag('event', "EN_Lgallery_Peony_quiz_Try")
        }else if(this.pageID=='29'){
            isCn?gtag('event', "CN_Lgallery_Sequins_quiz_Try"):gtag('event', "EN_Lgallery_Sequins_quiz_Try")
        }else if(this.pageID=='30'){
            isCn?gtag('event', "CN_Lgallery_ZIP_quiz_Try"):gtag('event', "EN_Lgallery_ZIP_quiz_Try")
        }else if(this.pageID=='31'){
            isCn?gtag('event', "CN_Lgallery_Mystere_quiz_Try"):gtag('event', "EN_Lgallery_Mystere_quiz_Try")
        }else if(this.pageID=='32'){
            isCn?gtag('event', "CN_Lgallery_Collare2_quiz_Try"):gtag('event', "EN_Lgallery_Collare2_quiz_Try")
        }
    }
    goback(){
        let isCn = i18n.getLocal()=='cn';
        if(this.pageID=='24'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Collaret1_quiz_Back"):gtag('event', "EN_Lgallery_Collaret1_quiz_Back")
        }else if(this.pageID=='28'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Sequined_quiz_Back"):gtag('event', "EN_Lgallery_Sequined_quiz_Back")
        }else if(this.pageID=='36'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Five_quiz_Back"):gtag('event', "EN_Lgallery_Five_quiz_Back")
        }else if(this.pageID=='37'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Dragon_quiz_Back"):gtag('event', "EN_Lgallery_Dragon_quiz_Back")
        }else if(this.pageID=='27'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Peony_quiz_Back"):gtag('event', "EN_Lgallery_Peony_quiz_Back")
        }else if(this.pageID=='29'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Sequins_quiz_Back"):gtag('event', "EN_Lgallery_Sequins_quiz_Back")
        }else if(this.pageID=='30'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_ZIP_quiz_Back"):gtag('event', "EN_Lgallery_ZIP_quiz_Back")
        }else if(this.pageID=='31'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Mystere_quiz_Back"):gtag('event', "EN_Lgallery_Mystere_quiz_Back")
        }else if(this.pageID=='32'){
            window.history.go(-1);
            isCn?gtag('event', "CN_Lgallery_Collare2_quiz_Back"):gtag('event', "EN_Lgallery_Collare2_quiz_Back")
        }
    }
    initPopContent(){
        let isCn = i18n.getLocal()=='cn';

        let PopSuccess = (props)=>(
            isCn?
            <div className="answerResultsPop">
                <p>恭喜您，解答正确!</p>
                <p>已成功解答{props.num || 1}/10</p>
                <SpeedPath num={props.num || 1}/>
                <p>继续循着世家的足迹</p>
                <p>
                    在此展馆探索
                    <img src="app/images/icon/yaoshi.png"
                            style={{margin: "0 1rem", width: ".4rem", margin: "0 3px", verticalAlign: "bottom"}}/>
                    符号的其他谜题
                </p>
                <br/>
                <button onClick={() => {
                    this.knowhandclick()
                }}>知道了
                </button>
            </div>:
            <div className="answerResultsPop fm-bl">
                <p>Congratulations！</p>
                <p>you have completed{props.num || 1}/10</p>
                <SpeedPath num={props.num || 1}/>
                <p>Continue to explore other pieces with<img src="app/images/icon/yaoshi.png"
                            style={{margin: "0 1rem", width: ".4rem", margin: "0 3px", verticalAlign: "bottom"}}/>
                            this icon
                </p>
                <br/>
                <button onClick={() => {
                this.knowhandclick()
                }} className="fm-fr">Yes
                </button>
            </div>
        );

        let PopFail = (props)=>(
            isCn?
            <div className="answerResultsPop" >
                    <p>很遗憾，解答错误</p>
                    <p>请仔细观察，再次选择您的答案</p>
                    <br/>
                    <button onClick={() => {
                        this.tryagainclick();
                        this.refs.pop.close();
                    }}>再试试
                    </button>
                    <button onClick={()=>{
                        this.goback();
                        setTimeout(()=>{
                            try {
                                var str =window.location.hash;
                                str = str.match(/#\/(\S*)\//)[1]; 
                            if(str=="PageSmallDetail"){
                                audiotwo.src =AudioBox.timeaudio.src;
                                audiotwo.currentTime=AudioBox.timeaudio.autoPlayTime
                                audiotwo.play();
                                } 
                            } catch (error) {
                                
                            }
                           
                        },100)
                    }}>返回
                    </button>

            </div>:
            <div className="answerResultsPop fm-bl" >
                    <p>The answer is incorrect</p>
                    <p>Please watch it carefully and try again</p>
                    <br/>
                    <button onClick={() => {
                        this.tryagainclick();
                        this.refs.pop.close();
                    }} className="fm-fr">Try again
                    </button>
                    <button onClick={()=> {
                        this.goback();
                        // PageSmallDetail.LoadAudiou();
                    }} className="fm-fr">Back
                    </button>

            </div>
        );

        let PopFirstCompletion = (props)=>(
            isCn?
            <div className="answerResultsPop" style={{
                margin: '.7rem auto'
            }}>
                <p>CONGRATULATIONS</p>
                <p>恭喜您已成功解密10件世家臻品，</p>
                <p>截图并保存此页面，前往礼品兑换处，</p>
                <p>可领取礼品一份。</p>
                <p>*有效验证码：{props.code}</p>
                <img style={{
                    width: '5.05rem',
                    display: 'block',
                    margin: "0 auto"
                }} src="app/images/icon_0047.png"/>
                <button onClick={() => {
                    gtag('event', "CN_Lgallery_quiz_Congratulations_Back")
                    window.history.go(-2);
                }}>返回
                </button>

            </div>:
            <div className="answerResultsPop fm-bl" style={{
                margin: '.7rem auto'
            }}>
                <p>CONGRATULATIONS</p>
                <p>you have succeeded in unlocking all masterpieces!</p>
                <p>Save the screenshots and go to the gift </p>
                <p>redemption area to redeem a gift.</p>
                <p>Effective code：{props.code}</p>
                <img style={{
                    width: '5.05rem',
                    display: 'block',
                    margin: "0 auto"
                }} src="app/images/icon_0047.png"/>
                <button onClick={() => {
                    gtag('event', "EN_Lgallery_quiz_Congratulations_Back")
                    window.history.go(-2);
                }} className="fm-fr">Back
                </button>
            </div>
        );

        let PopCompletion = (props)=>(
            isCn?
            <div className="answerResultsPop fm-bl" style={{
                margin: '.7rem auto'
            }}>
                <p>CONGRATULATIONS</p>
                <p>恭喜您已成功解密{props.num || 10}件世家臻品，</p>
                <p>感谢您的参与！</p>
                <p>继续探索更多作品，</p>
                <p>细赏梵克雅宝雅艺之美</p>
                <button onClick={() => {
                    window.history.go(-1);
                }}>返回
                </button>
            </div>:
            <div className="answerResultsPop fm-bl" style={{
                margin: '.7rem auto'
            }}>
                <p>CONGRATULATIONS</p>
                <p>Thank you for your participation,you have</p>
                <p>succeeded in unlocking all masterpieces. </p>
                <p>Continue to explore more of Van Cleef & Arpels High Jewelry creations.</p>
                <button onClick={() => {
                    window.history.go(-1);
                }} className="fm-fr">Back
                </button>
            </div>
        );

        return {PopSuccess,PopFail,PopFirstCompletion,PopCompletion};
    }

    //结果 测试  success
    resultWx =async (success,id,callBack) => {
        let questionID = id || this.state.data.No;
        // console.log('opopopo',this.questionList2Key)
        // if(!this.questionList2Key){
        //     alert('请登录');
        //     return;
        // }
        let ssss = this.questionList2Key.includes(questionID.toString());
        
        console.log('asdasdasdasdasdas',ssss)

        let popName = "";  //弹窗名称
        let parameter={};  //弹窗参数
        let callback = null; //弹窗回调
        // let Pops = this.popContent["PopCompletion"];
        // this.refs.pop.show(<Pops {...parameter} />);     
        // return;
         
        // let questionID = id || this.state.data.No;
        if(!questionID)return;
        /*********************************/
            // 测试数据  答题进度
        /*********************************/
        if (success) {
            if(ssss){

            }else{
                // num+=1;
                this.questionList2Key.push(questionID.toString());
            }
            let num = this.questionList2Key.length; //获得答题记录进度
            if (num < 10) {
                // 回答正确弹出层
                popName = "PopSuccess";
                parameter.num = num;
                this.onRight(questionID);
            } else {
                    this.onRight(questionID);
                    var code = await this.onComplete();
                    if(code){
                        // 全部集齐弹出层 
                        popName = "PopFirstCompletion";
                        parameter.code = code;
                    }else{
                        popName = "PopCompletion";
                    }
        }
        } else {
            // 回答错误弹出层
            popName = "PopFail";
            // this.onError(questionID);
        }
        // 开启弹窗
        let Pop = this.popContent[popName];
        if(this.refs.pop){
            if(this.refs.DetailGame) this.refs.DetailGame.pauseTimeline();
            this.refs.pop.show(<Pop {...parameter} />,callback,()=>{
                if(this.refs.DetailGame)
                this.refs.DetailGame.playTimeline();
            });
        }else{
            typeof(callBack) == "function" && callBack(<Pop {...parameter} />);
        }
    }
     //结果 测试  success
    noresultwx = (success,id,callBack) => {
        let popName = "";  //弹窗名称
        let parameter={};  //弹窗参数
        let callback = null; //弹窗回调

        // let Pops = this.popContent["PopCompletion"];
        // this.refs.pop.show(<Pops {...parameter} />);     
        // return;
         
        let questionID = id || this.state.data.No;
        if(!questionID)return;
        /*********************************/
            // 测试数据  答题进度
        /*********************************/
        if (success) {
            this.questionList[questionID] = 1; // 存入记录
            let num = Object.keys(this.questionList).length; //获得答题记录进度
            // num++;
            if (num < 10) {
                // 回答正确弹出层
                popName = "PopSuccess";
                parameter.num = num;
                // this.onRight();
            } else {
                    // 全部集齐弹出层
                     popName = "PopCompletion";
                 
        }
        } else {
            // 回答错误弹出层
            popName = "PopFail";
        }

        // 开启弹窗
        let Pop = this.popContent[popName];
        if(this.refs.pop){
            if(this.refs.DetailGame) this.refs.DetailGame.pauseTimeline();
            this.refs.pop.show(<Pop {...parameter} />,callback,()=>{
                if(this.refs.DetailGame)
                this.refs.DetailGame.playTimeline();
            });
        }else{
            typeof(callBack) == "function" && callBack(<Pop {...parameter} />);
        }
        var obj = this.questionList;
        var str = JSON.stringify(obj);
        //存入
        localStorage.questionList = str;
    }
    result= (success,id,callBack)=>{
        if(this.isweixin()){
            this.resultWx(success,id,callBack);
        }else{
            this.noresultwx(success,id,callBack)  
        }
    }
    // 根据问答题类型显示相应组件
    getPageByType() {
        let data = this.state.data;
        let type = data.QuesType;
        let No = data.No;
        let question = data.Question;
        let child = <Game_Bg/>
        if (!question && !type)return false;
        /*
         type:
         NormalChoice   正常的选择
         YearInput      数字输入
         SelectCard     卡片选择
         PicGame        拖动拼图
         */
        switch (type) {
            case "NormalChoice":
                return <ComponentNumber
                    type="radio"
                    fileType="img"
                    filePath={"app/images/Links/" + data.No + ".png"}
                    keyWord={question.Rightanswer} //问题答案
                    keyWordList={question.Answer}
                    title={data.Title}
                    title2={data.Year}
                    content={question.Ques}
                    callback={this.result}>{child}</ComponentNumber>
                break;
            case "YearInput":
                return <ComponentNumber
                    type="numer"
                    fileType="img"
                    filePath={"app/images/Links/" + data.No + ".png"}
                    keyWord={question.Rightanswer} //问题答案
                    size={4} //输入框长度
                    keyWordList={question.Answer}
                    title={data.Title}
                    content={question.Ques}
                    callback={this.result} //组件回调
                >{child}</ComponentNumber>
                break;
            case "SelectCard":
                return <Roll_chose
                        img={"app/images/Links/" + data.No + ".png"}
                        title={data.Title}
                        title2={data.Year}
                        id = {data.No}
                        content={question.Ques}
                        dataList={question.Answer} //选项列表
                        NodataList={question.NoAnswer} //选项列表
                        keyWord={question.Rightanswer} //问题答案
                        callback={this.result} //组件回调
                        ids = {data.No}
                >{child}</Roll_chose>


                break;
            //  case "SelectCard":
            //  return <Roll_scroll
            //            img={"app/images/Links/"+data.No+".png"}
            // 		   title={data.Title}
            // 		   title2={data.Year}
            // 		   content={question.Ques}
            // 		   dataList={question.Answer}
            // 		    />
            //  break;
            case "PicGame":
                return <Detail_game
                    img={"app/images/Links/" + data.No + ".png"}
                    ref="DetailGame"
                    title={data.Title}
                    title2={data.Year}
                >{child}</Detail_game>
                break;
            default:
                return <h1>
                    暂时无法查看该页面
                </h1>
                break;
        }
    }


    render() {
        return (
        <React.Fragment>
            <div className="public">
                {/* <div className="vca_detail_back" style={{zIndex: 99}}>
                 <a href="javascript:window.history.go(-1)">
                 <img src={"app/images/detail/back.png"} style={{width: '.24rem', height: '.42rem'}}/>
                 </a>
                 </div> */}
                <HeadNav right={false} position={true} />
                {

                }

            </div>

            {this.getPageByType()}
            <BottomPopup ref="pop"/>

        </React.Fragment>

        )
    }
}
// 回答问题进度图
class SpeedPath extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.init();
    }
    init(){
        let box = this.refs.box;
        let childs = box.childNodes;
        let num = this.props.num || 0;
        for (let i = 0; i < childs.length; i++) {
            let child = childs[i];
            if (i < num) {
                child.style.stroke = "rgb(255,255,255)";
            }
            else {
                child.style.stroke = "rgba(255,255,255,0.4)";
            }
        }
    }
    componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this.init();
    }
    render() {
        return (
            <svg ref={"box"} x="0px" y="0px" width="3.72rem" style={{
                display: 'block',
                margin: '.5rem auto'
            }} viewBox="0 0 347.411 25.502">
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M0.767,23.147
					c7.462,1.544,21.435,0.436,29.04-5.584"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M34.393,13.917
					c8.339-4.827,23.121-4.947,32.014-4.226c10.162,0.824,18.126,4.119,6.317,6.866c-7.597,1.766-2.125,3.078,3.842,3.863"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M84.808,21.225
					c2.306,0.154,13.906,0.605,23.074-0.377"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M113.198,20.281
					c5.39-0.891,8.132-2.444,3.743-5.098c-11.811-7.141-1.923-8.514,2.196-9.613c2.274-0.606,13.079,0.21,25.954,0.37"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M149.375,5.967
					c9.313-0.005,19.297-0.446,27.713-2.044"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M181.313,3.188
					c19.887-3.143,36.125-1.233,24.063,5.953c-12.908,7.69-5.493,10.162-2.471,10.711c0.723,0.132,3.35-0.036,7.032-0.355"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M213.166,19.204
					c12.192-1.138,31.354-3.221,36.702-2.648"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M254.484,18.461
					c0.972,0.945,2.423,2.156,11.051,1.982c12.601-0.253,13.994-0.866,13.994-0.866"/>
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10"
                      d="M285.746,19.229c0,0,16.591-1.707,24.067-5.646"
                />
                <path fill="none" stroke="#00F700" stroke-width="3.456" stroke-miterlimit="10" d="M314.611,11.373
					c11.029-4.305,21.004-2.525,32.032,7.857"/>
            </svg>
        )
    }
}
