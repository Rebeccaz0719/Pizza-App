import React,{Component} from 'react';

import './detail.css';

import Size from '../../components/size';
import Toppings from '../../components/toppings';


export default class Detail extends Component{

    constructor(){
        super()
        this.state = {
            pizzaData : {
                id:1,
                name:"Pizza",
                type:"pizza",
                smallPrice:9,
                mediumPrice:11,
                largePrice:12,
                img:require("../../assets/images/pizza.jpg")
            },
            activeTab:"size",
            orderSize:"",
            orderPrice:"",
            toppings:[{
                id:1,
                name:"mushrooms",
                price:1,
                num:0,
                img:require('../../assets/images/mushrooms.png')
            },{
                id:2,
                name:"bell peppers",
                price:1,
                num:0,
                img:require('../../assets/images/bell.png')
            },{
                id:3,
                name:"feta cheese",
                price:1,
                num:0,
                img:require('../../assets/images/cheese.png')
            },{
                id:4,
                name:"chicken",
                price:1.5,
                num:0,
                img:require('../../assets/images/chicken.png')
            },{
                id:5,
                name:"meatballs",
                price:1.5,
                num:0,
                img:require('../../assets/images/meatballs.png')
            },{
                id:6,
                name:"pulled pork",
                price:1.5,
                num:0,
                img:require('../../assets/images/pullpork.png')
            }]
        }
    }

    //order size
    orderSize = (value,price)=>{
        this.setState({
            orderSize:value,
            orderPrice:price
        })
    }

    //select toppings
    selectToppings = (obj)=>{
        const {
            toppings
        } = this.state
            let index = toppings.findIndex(t => t.id === obj.id);
            if (index > -1) {
                Object.assign(toppings[index], obj);
                this.setState({
                    toppings
                })
            } 
    }

    //add Cart
    addCar = ()=>{
        if(this.state.orderSize===""){
            alert("Please select pizza size.")
        }else{
           let order = {
               id:this.state.pizzaData.id,
               name:this.state.pizzaData.name,
               orderSize:this.state.orderSize,
               orderPrice:this.state.orderPrice,
               toppings:this.state.toppings.filter(t=>t.num>0)
           }
           this.props.addCar(order)
        }
    }

    render(){
        const {pizzaData,activeTab,orderSize,toppings} = this.state
        return(
            <div className="detail-container">
                    <div className="detail-info">
                             {/* <div className="detail-info-left">
                                <img src={pizzaData.img} alt=""/>
                             </div>  */}
                             <div className="detail-info-right">
                                  <h3>{pizzaData.name}</h3>
                                  <div className="tabs">
                                      <div className={activeTab==="size"?"active-tab":""} onClick={()=>this.setState({activeTab:"size"})}>Select Size</div>
                                      <div className={activeTab==="toppings"?"active-tab":""} onClick={()=>this.setState({activeTab:"toppings"})}>Add Toppings</div>
                                  </div>
                                  <div className="size-check" style={activeTab==="size"?{display:'flex'}:{display:"none"}}>
                                    <Size size="small" orderSize={orderSize} price={pizzaData.smallPrice} handlerOrder={this.orderSize}/>
                                    <Size size="medium" orderSize={orderSize} price={pizzaData.mediumPrice} handlerOrder={this.orderSize}/>
                                    <Size size="large" orderSize={orderSize} price={pizzaData.largePrice} handlerOrder={this.orderSize}/>
                                  </div>
                                  <div className="toppings-check" style={activeTab==="toppings"?{display:'flex'}:{display:"none"}}>
                                     {
                                         toppings.map(t=>(
                                             <Toppings key={t.id} id={t.id} name={t.name} price={t.price} num={t.num} img={t.img} select={this.selectToppings}/>
                                         ))
                                     }
                                  </div>
                                <div className="add-car">
                                    <button className="add-car-btn" onClick={()=>this.addCar()}>Add To Cart</button>
                                </div>
                             </div> 
                    </div>
            </div>
        )
    }
}