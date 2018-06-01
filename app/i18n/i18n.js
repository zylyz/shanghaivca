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
 *  文件名称 : i18n.js
 *  版  本  : v1.0.0.0
 *  说  明  :  
 *  作  者  : night
 *  邮  箱  : 88962800@qq.com
 *  创建时间 : 2018:03-28 20:13 
 ******************************************************************
 Copyright © 2017-2018, All rights reserved.
 ******************************************************************
 */
import en from '../lib/English';
import cn from '../lib/vca';
var i18n = (() => {
    var _localKey = 'i18n_local',
        _resourceManager={},
        _jsonData={},
        _jsonUrl = {
            'cn':'app/lib/vca.js',
            'en':'app/lib/English.js',
        },
        _local = (window.localStorage && window.localStorage.getItem(_localKey))   || 'cn',
        /**
         * 设置语种
         * @param lg
         */
        setLocal = (lg = 'cn') => {
            _local = lg;
            window.localStorage && window.localStorage.setItem(_localKey, lg);
        },
        /**
         * 获取语种
         */
        getLocal=()=>_local,
        /**
         * 增加语言包
         * @param data
         */
        addLocalData=(...data)=>{
            data.forEach(o=>{
                o.forEach(s=>{
                    _resourceManager[s] = o[s];
                })

            });
        },
        addJsonData=(...data)=>{
            data.forEach(d=>{
                for(var o in d){
                    _jsonData[o] = d[o];
                }


            });
        },
        /**
         * 切换语种
         */
        changeLocal=(_local)=>{
        //   if(/en/.test(_local)){
        //       setLocal('cn');
        //       return;
        //   }
          setLocal(_local);
        },
        getJsonUrl=()=>_jsonUrl[_local] || _jsonUrl["cn"],
        getJSONData=(key)=>(_jsonData[_local] || _jsonData["cn"])[key],
        /**
         * 获取对应文字
         * @param key 文字ID
         * @param d 默认文字
         */
        text=(key,d)=>(_resourceManager[_local] && _resourceManager[_local][key]) || d ||'';
        return {setLocal,getJsonUrl,changeLocal,getLocal,addLocalData,text,getJSONData,addJsonData};

})();
i18n.addJsonData(en,cn);

export  default i18n;