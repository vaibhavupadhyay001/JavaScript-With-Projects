import{cart} from '../../data/cart.js';
import{getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/dekiveryOptions.js';
import{formatCurrancy} from '../../utils/money.js';

let PaymentsummaryHTML;
export function rendorPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach((cartItem) => {
      const product= getProduct(cartItem.productid);
      productPriceCents+=product.priceCents*cartItem.quantity;

   const deliveryOption= getDeliveryOption(cartItem.deliveryOptionid);

   shippingPriceCents+=deliveryOption.priceCents

        
    });
    const totalBeforeTax=productPriceCents+shippingPriceCents;
    const AfterTax=totalBeforeTax*0.1;
    const totalBill=totalBeforeTax+AfterTax;

    PaymentsummaryHTML=`

          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrancy(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrancy(shippingPriceCents)}</div>
          </div>
          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrancy(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrancy(AfterTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrancy(totalBill)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;


    document.querySelector('.js-payment-summary').innerHTML=PaymentsummaryHTML;



}
