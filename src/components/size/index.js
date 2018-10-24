import React, {
    Component
} from 'react'

// set the scale of pizza images
import './size.css'
const getSizePix = (size) => {
    switch (size) {
        case "small":
            return 80;
        case "medium":
            return 100;
        case "large":
            return 120;
        default:
            return 80;
    }
}

//
export default class Size extends Component {
    
    order = (size,price)=>{
        this.props.handlerOrder(size,price)
    }

    render() {
        const {
            size,
            price,
            orderSize
        } = this.props

        const style = {
            width:getSizePix(size)+'px',
            height:getSizePix(size)+'px',
        }

        return (
            <div className="size-box"> 
                <img src={require('../../assets/images/pizza-small.png')} style={style}/>
                <p>{size}</p>
                <p>${price}</p>
                <div>
                    <button onClick={()=>this.order(size,price)} className={orderSize===size?"order-active":"order"}>Order</button>
                </div>
            </div>
        )
    }
}