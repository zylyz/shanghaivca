import React from "react";
import ReactDOM from "react-dom";
export default class Rollscrolls extends React.Component{
    constructor(props){
       super(props);
    };
    handle(){
       this.props.img.display='block'
    }
    render(){
        var item =[
            {
              img: require('../images/1.png'),
              index:1,
              type:'checkbox',
              alt: 'images-1',
              value: 1
            },
            {
              img: require('../images/2.png'),
              index:2,
              type:'checkbox',
              alt: 'images-2',
              value: 2
            },
            {
              img: require('../images/3.png'),
              index:3,
              type:'checkbox',
              alt: 'images-3',
              value: 3
            },
            {
              img: require('../images/4.png'),
              index:4,
              type:'checkbox',
              alt: 'images-4',
              value: 4
            }
          ]
          console.log('item', item)
        return(
            <div className="gun ">
                <ul>
                    {
                        
                        item.map((item,index) =>
                            <li key={index} href="">
                                    <p  className="yuan" onClick={this.handle}> 
                                        <img src={'app/images/dui.png'} alt="1"/>
                                    </p>
                                 <img src={item.img} alt={item.alt}/>

                            </li>
                        )
                        
                    }
                </ul>

            </div>

            
        )
    }
}