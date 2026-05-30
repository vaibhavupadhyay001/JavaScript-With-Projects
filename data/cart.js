export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart || !Array.isArray(cart)) {   // check if it's null or invalid
  cart = [
    {
      productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionid:'2'
    },
    {
      productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionid:'3'
    },
  ];
  localStorage.setItem('cart', JSON.stringify(cart)); 
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productid){
  let match;
  cart.forEach((cartItem) => {
    if(productid===cartItem.productid){
      match=cartItem;
    }
    
  });
  if(match){
    match.quantity+=1;
  }else{
    cart.push({
      productid:productid,
      quantity:1,
      deliveryOptionid:'1'
    });
    
  }
  saveToStorage();
}


export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productid!==productId){
      newCart.push(cartItem);
    }
  });
 cart=newCart;
  saveToStorage();  
}

export function updateDeliveryOption(productid,deliveryOptionId){
  let match;
  cart.forEach((cartItem)=>{
    if(productid===cartItem.productid){
      match=cartItem;
    }
  });
  match.deliveryOptionid=deliveryOptionId;
  saveToStorage();

}




 