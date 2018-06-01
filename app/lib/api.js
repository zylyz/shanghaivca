/*!
 **************************************************************
 *                                                            *  
 *   .=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-.       *  
 *    |                     ______                     |      *  
 *    |                  .-"      "-.                  |      *  
 *    |                 /            \                 |      *  
 *    |     _          |              |          _     |      *  
 *    |    ( \         |,  .-.  .-.  ,|         / )    |      *  
 *    |     > "=._     | )(__/  \__)( |     _.=" <     |      *  
 *    |    (_/"=._"=._ |/     /\     \| _.="_.="\_)    |      *  
 *    |           "=._"(_     ^^     _)"_.="           |      *  
 *    |               "=\__|IIIIII|__/="               |      *  
 *    |              _.="| \IIIIII/ |"=._              |      *  
 *    |    _     _.="_.="\          /"=._"=._     _    |      *  
 *    |   ( \_.="_.="     `--------`     "=._"=._/ )   |      *  
 *    |    > _.="                            "=._ <    |      *  
 *    |   (_/                                    \_)   |      *  
 *    |                                                |      *  
 *    '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='      *  
 *                                                            *  
 *           LASCIATE OGNI SPERANZA, VOI CH'ENTRATE           *  
 **************************************************************   
 ******************************************************************
 *  项目名称 : shanghaiVCA
 *  文件描述 :
 *  文件名称 : api.js
 *  版  本  : v1.0.0.0
 *  说  明  :  
 *  作  者  : night
 *  邮  箱  : 88962800@qq.com
 *  创建时间 : 2018:03-29 16:48 
 ******************************************************************
 Copyright © 2017-2018, All rights reserved.
 ******************************************************************
 */
import $ from 'jquery';
var api = (() => {
    let sendRequest = async (url,data={}) => {
        return $.post(url,data);
    }
    return {
        /**
         * 登录
         * @param returnUrl
         */
        login(returnUrl=location.href){
            window.location.href='/background/index.php?s=User/getAuthUrl&type=10&returnUrl=' + encodeURIComponent(returnUrl);

        },
        /**
         * 获取用户信息
         * @returns {Promise}
         */
         doGetUserInfo(){
            return  sendRequest('/background/index.php?s=User/doGetUserInfo');
        },
        /**
         * 获得验证码
         * @returns {Promise}
         */
        doGetCode(){
             return sendRequest('/background/index.php?s=User/doGetCode');
        },
        /**
         * 提交答题记录
         * @param question 【题目编号】
         * @param questionStatus 【答题状态：0答题错误，1答题正确】
         * @returns {Promise}
         */
        doQuestion(question,questionStatus){
            return sendRequest('/background/index.php?s=User/doQuestion',{question,questionStatus});
        }

    }
})();
export default api;