import React,{Component} from 'react';

import './toppings.css';

export default class Toppings extends Component{

    decrese = ()=>{
      const {select,id,num} = this.props
      if(num>0){
            select({
                id:id,
                num:num-1,
            })
      }else{
        select({
            id:id,
            num:0,
        })
      }
    }

    increse = ()=>{
        const {select,id,num} = this.props
              select({
                  id:id,
                  num:num+1,
              })
    }

    render(){
        const {name,price,num,img} = this.props
        return (
            <div className="toppings-box">
                <p>{name}</p>
                <div className="toppings-img">
                    <img src={img} alt=""/>
                </div>
                <p>${price}</p>
                <div>
                    <span onClick={()=>this.decrese(num)} className="decrese">-</span>
                    <span className="num">{num}</span>
                    <span onClick={()=>this.increse(num)} className="increse">+</span>
                </div>
            </div>
        )
    }
}