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
 *  文件名称 : Game_Bg.js
 *  版  本  : v1.0.0.0
 *  说  明  :  
 *  作  者  : night
 *  邮  箱  : 88962800@qq.com
 *  创建时间 : 2018:04-03 16:23 
 ******************************************************************
 Copyright © 2017-2018, All rights reserved.
 ******************************************************************
 */
import  React from 'react';
import jTimeline from '../lib/jTimelineCss';
export default class Game_Bg extends React.Component {
    constructor(ps) {
        super(ps);
    }

    static methods = {
        degtorad:Math.PI / 180,
        /**
         * 官方求四元数方法
         * @param {Object} alphaGame_Bg.
         * @param {Object} beta
         * @param {Object} gamma
         */
        getQuaternion: (alpha, beta, gamma) => { //官方求四元数方法
            var _x = beta ? beta * Game_Bg.methods.degtorad : 0; // beta value
            var _y = gamma ? gamma * Game_Bg.methods.degtorad : 0; // gamma value
            var _z = alpha ? alpha * Game_Bg.methods.degtorad : 0; // alpha value
            var cX = Math.cos(_x / 2);
            var cY = Math.cos(_y / 2);
            var cZ = Math.cos(_z / 2);
            var sX = Math.sin(_x / 2);
            var sY = Math.sin(_y / 2);
            var sZ = Math.sin(_z / 2);
            var w = cX * cY * cZ - sX * sY * sZ;
            var x = sX * cY * cZ - cX * sY * sZ;
            var y = cX * sY * cZ + sX * cY * sZ;
            var z = cX * cY * sZ + sX * sY * cZ;
            return [w, x, y, z];
        },
        /**
         * 我的四元数转旋转轴和旋转角度方法
         * @param {Object} _wGame_Bg.
         * @param {Object} _x
         * @param {Object} _y
         * @param {Object} _z
         */
        getAcQuaternion: (_w, _x, _y, _z) => { //我的四元数转旋转轴和旋转角度方法
            var rotate = 2 * Math.acos(_w) /Game_Bg. methods.degtorad;
            var x = _x / Math.sin(Game_Bg.methods.degtorad * rotate / 2) || 0;
            var y = _y / Math.sin(Game_Bg.methods.degtorad * rotate / 2) || 0;
            var z = _z / Math.sin(Game_Bg.methods.degtorad * rotate / 2) || 0;
            return {
                x: x,
                y: y,
                z: z,
                rotate: rotate
            };
        }
    }

    componentDidMount() {
        let [tid, con, bg] = [0, true, $(this.refs.game_bg)];
        window.ondeviceorientation = function (e) {
            if (!tid) {
                tid = new Date().getTime();
            }
            if (!con) {
                return;
            }
            con = false;
            let arry = Game_Bg.methods.getQuaternion(e.alpha, e.beta, e.gamma);
            arry = Game_Bg.methods.getAcQuaternion(...arry);
            var line = jTimeline();

            var dis = arry.y / 2;
            dis = Math.max(arry.z /2,dis);
            var time = Math.abs(Math.max(dis / 20));
            time = Math.max(time, 0.0001);
            line.to(bg, time, {
                x: -( arry.y/2),
                y:-(arry.z/2)
            }, 0, jTimeline.linear.easNone)
                .callback(function () {
                    con = true;
                }).play();
        }
    }

    componentWillUnmount() {
        window.ondeviceorientation = () => {
            //document.title = "clear"
        };
    }

    render() {
        return (
            <div className="j_game_bg"
                 style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', 'overflow': 'hidden',zIndex:-1}}>
                <img ref="game_bg" src="/app/images/game_bg.png" className="game_bg" style={{
                    width: '12.28rem',
                    height: '15.30rem',
                    position: 'absolute',
                    left: "-1.2rem",
                    top: '-.41rem'
                }}></img>
            </div>


        )
    }
}