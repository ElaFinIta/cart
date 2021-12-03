import React, { useReducer } from 'react';
import './Product.css';

function getTotal(cart) {
    const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
    // convert to a string according to the numerical conventions that match the browser’s locale. Use undefined as the first argument to toLocaleString to use the system locale rather than specifying a locale:
    return total.toLocaleString(undefined, currencyOptions)
}
// options minimumFractionDigits and maximumFractionDigits to give a consistent number of decimal places.
const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}
const products = [
    {
      emoji: '🍦',
      name: 'ice cream',
      price: 5
    },
    {
      emoji: '🍩',
      name: 'donuts',
      price: 2.5,
    },
    {
      emoji: '🍉',
      name: 'watermelon',
      price: 4
    }
  ];
  
// SPLICE:
// const months = ['Jan', 'March', 'April', 'June'];
//months.splice(1, 0, 'Feb');  // insert 'Feb' at index 1. replace nothing.
// months.splice(4, 1, 'May');  // insert 'May' at index 4, delete 1 element at index 4
// splice(start, deleteCount, item1, item2, itemN)
function cartReducer(state, action) {
    // do not directly mutate the state in the reducer functions. Instead, make a copy before splicing out the object.
    switch(action.type) {
        case 'add':
            return [...state, action.product];
        case 'remove':
            const productIndex = state.findIndex(item => item.name === action.product.name);
            if (productIndex < 0 )  {
                return state;
            }
            const update  = [...state];
            // update is an array of products:
            // ['ice cream', 'donuts', 'watermelon', 'watermelon']
            // action.name is "donuts", "ice cream"...
            update.splice(productIndex, 1);
            return update;
        default:
            return state;
    }
    
}
  
function totalReducer(state, action) {
    if (action.type === 'add') {
        return state+ action.price;
    }
    return state - action.price;
}

export default function Product() {
    const [cart, setCart] = useReducer(cartReducer, []);
    const [total, setTotal] = useReducer(totalReducer, 0);

    const add = (product) => {
        setCart({ product, type: 'add' });
    }

    function remove(product) {
        setCart({ product, type: 'remove' });
    }

  return(
    <div className="wrapper">
        <div>
            Shopping Cart: {cart.length} total items.
        </div>
        <div>Total: {getTotal(cart)}</div>
        <div>
            {products.map(product => (
                <div key={product.name}>
                    <div className="product">
                        <span role="img" aria-label={product.name}>{product.emoji}</span>
                    </div>
                    <button onClick={() => add(product)}>Add</button> 
                    <button onClick={() => remove(product)}>Remove</button>
                </div>
            ))}
        </div>
    </div>
  )
}