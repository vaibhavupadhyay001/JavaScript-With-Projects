import {cart,removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import{products,getProduct} from '../../data/products.js';
import {formatCurrancy} from '../../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import{deliveryOptions,getDeliveryOption} from '../../data/dekiveryOptions.js';
import {rendorPaymentSummary} from './PaymentSummary.js';



export function rendorOrderSummary(){

  let summaryHTML='';

cart.forEach((cartItem)=>{
    const productid=cartItem.productid;
    let matchingproducts=getProduct(productid);

     const deliveryOptionId=cartItem.deliveryOptionid;
     const deliveryOption=getDeliveryOption(deliveryOptionId);


    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd,  MMMM D');


    
    summaryHTML+=`<div class="cart-item-container 
      js-cart-item-container-${matchingproducts.id}">
            <div class="delivery-date">
              Delivery date:${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproducts.name}
                </div>
                <div class="product-price"> 
                $${formatCurrancy(matchingproducts.priceCents)}               
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingproducts.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingproducts,cartItem)}
              </div>
            </div>
          </div>`

});

document.querySelector('.js-order-summary').innerHTML=summaryHTML;



function deliveryOptionHTML(matchingproducts,cartItem){
  let HTML='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');

    const dateString=deliveryDate.format('dddd,  MMMM D');
    const priceString=deliveryOption.priceCents===0 ? 'FREE' : `$${formatCurrancy(deliveryOption.priceCents)} -`;
    
    const ischecked=deliveryOption.id===cartItem.deliveryOptionid;

    HTML+=` 
    <div class="delivery-option js-delivery-option" data-product-id=${matchingproducts.id} 
    data-delivery-option-id=${deliveryOption.id} >
                  <input type="radio" ${ischecked ? 'Checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproducts.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${dateString};
                      
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`

  });
  return HTML;
}





 

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      

      removeFromCart(productId); // in cart.js basically it removes the stored product from cart option.

      let container=document.querySelector(`.js-cart-item-container-${productId}`);
      
      container.remove(); // used to delete the products with ids

      rendorPaymentSummary();
        });   

});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=element.dataset;
    updateDeliveryOption(productId,deliveryOptionId);
    rendorOrderSummary();
    rendorPaymentSummary();
  })
})

}