import React,{Component} from 'react'

import './home.css'

import Detail from '../detail'


//define default goods data
const goods = [
    {
        id:1,
        name:"Pizza",
        price:"9",
        img:require("../../assets/images/pizza.jpg"),
    }
]

export default class Home extends Component{

    constructor(){
        super()
        this.state = {
            popNum:0,
            popPrice:2.5,
            activeDetail:"",//if show detail
            car:[],//car list
        }
    }

    //show detail
    showDetail = (id)=>{
          if(id===this.state.activeDetail){
            this.setState({activeDetail:""})
          }else{
            this.setState({activeDetail:id})
          }
    }

    //add Car
    handlerAddCar = (order)=>{
        const {car} = this.state
        car.push(order)
        this.setState({
            car
        })
    }
    
    //list the order name
    showName = (c)=>{
        if(c.toppings.length>0){
            let str = c.orderSize
            c.toppings.map(t=>str+="+"+t.name)
            return str
        }else{
            return c.orderSize
        }
    }

    //calc the price
    calcPrice = (c)=>{
        if(c.toppings.length>0){
            let price = c.orderPrice
            c.toppings.map(t=>price+=t.price*t.num)
            return price
        }else{
            return c.orderPrice
        }
    }

    //get the second saturday of the month
    getSecondSaturday = ()=>{
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let newDate = new Date(year,month)

        let day = newDate.getDay()//the first day of the month is the day of the week
        switch(day){
            case 0:
            return year+"-"+(month+1)+"-"+14;
            case 1:
            return year+"-"+(month+1)+"-"+13;
            case 2:
            return year+"-"+(month+1)+"-"+12;
            case 3:
            return year+"-"+(month+1)+"-"+11;
            case 4:
            return year+"-"+(month+1)+"-"+10;
            case 5:
            return year+"-"+(month+1)+"-"+9;
            case 6:
            return year+"-"+(month+1)+"-"+8;
            default:
            break;
        }
    }

    //check this day 
    checkTheDay = ()=>{
        let theDay = new Date().getFullYear()+"-"+ (new Date().getMonth()+1)+ "-"+new Date().getDate();
        //let theDay = "2018-10-13"
        return theDay===this.getSecondSaturday();
    }

    //check order have large pizza and pop
    checkOrder = ()=>{
        const {car,popNum} = this.state
        let len = car.filter(c=>c.orderSize==="large").length;
        if(len>0&&popNum>0){
            return true;
        }else{
            return false;
        }
    }

    //cacl total price
    totalPrice = ()=>{
        const {car,popNum,popPrice} = this.state

        let total = 0;
        car.map(c=>{
            if(c.toppings.length>0){
                let price = c.orderPrice;
                c.toppings.map(t=>price+=t.price*t.num);
                total+= price
            }else{
                total+= c.orderPrice
            }
        })
        total += popNum*popPrice;
        if(this.checkTheDay()&&this.checkOrder()){
            total -= 2;
        }
        return total
    }

    //decrese pop
    decrese = (num)=>{
        if(num>0){
            this.setState({
                popNum:num-1
            })
        }
    }
    //increse pop
    increse = (num)=>{
        this.setState({
            popNum:num+1
        })
    }
    render(){
        const {activeDetail,car,popNum} = this.state
        return(
            <div className="home-container">
                    <div className="goods-list-header">
                         Pizza Menu
                    </div>
                    <div className="goods-list">
                             {
                                 goods.map(g=>(
                                     <div key={g.id}>    
                                        <div className="goods-item">
                                            <div className="goods-item-left">
                                            <img src={g.img} alt=""/>
                                            </div>
                                            <div className="goods-item-right">
                                            <p>{g.name}</p>
                                            {
                                                this.checkTheDay()?<p style={{color:"red"}}>
                                                    Congratulations! It's the second Saturday! You can have a combo for $12.5, including one large pizza and one pop. You can order only one combo for special price each order
                                                </p>:""
                                            }
                                            <p>${g.price}</p>
                                            <div style={{textAlign:'right'}}>
                                                <button className="btn-buy" onClick={()=>this.showDetail(g.id)}>Start</button>
                                            </div>
                                            </div>
                                        </div>
                                        <div style={activeDetail===g.id?{display:"block"}:{display:"none"}}>
                                             {
                                                 <Detail addCar={this.handlerAddCar}/>
                                             }
                                        </div>
                                    </div>
                                 )
                             )
                             }
                    </div>
                     <div className="shop-car">
                       <h3>My Shopping List</h3>
                          <table>
                          <thead>
                                       <tr>
                                       <th>Name</th>
                                       <th width="80%">Prop</th>
                                       <th>Price</th>
                                       </tr>
                                   </thead>
                               <tbody>
                                   {
                                       car.map(c=>(
                                        <tr key={c.id}>
                                            <td>{c.name}</td>
                                            <td width="80%">{this.showName(c)}</td>
                                            <td>${this.calcPrice(c)}</td>
                                        </tr>
                                       ))
                                   }
                               </tbody>
                          </table>
                        <div>
                            <div className="pop">
                               <p>Add Pop</p>
                               <img src={require("../../assets/images/milktea.jpg")} alt=""/>
                               <div style={{marginTop:10}}>
                                    <span onClick={()=>this.decrese(popNum)} className="decrease">-</span>
                                    <span className="num">{popNum}</span>
                                    <span onClick={()=>this.increse(popNum)} className="increase">+</span>
                               </div>
                            </div>
                             <p>Total Price:${this.totalPrice()}</p>
                             <div className="pay-btn-box">
                                 <button className="pay-btn" onClick={()=>this.props.history.push("/success")}>Checkout</button>
                             </div>
                        </div>
                     </div> 
             </div>
        )
    }
}