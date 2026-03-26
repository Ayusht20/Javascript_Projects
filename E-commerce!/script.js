 const list=document.querySelector(".navlist");
 const ham=document.querySelector(".fa-bars");
 const cart_container=document.querySelector(".cart-items");
 const add_cart=document.querySelectorAll(".add-cart");
 const cart=document.querySelector(".cart");
 const msg=document.querySelector(".message");
 const cart_btn=document.querySelector("#shop");
 const cart_total=document.querySelector("#cart-total");
 const checkout=document.querySelector("#checkout");
 let cartItems=JSON.parse(localStorage.getItem("cartItems"))||[];
 updateUI();
 let messageBox=()=>
 {
   msg.style.display="block";
   setTimeout(()=>
   {
      msg.style.display="none";
   },1000)
 }

 ham.addEventListener("click",()=>
 {
    ham.classList.toggle("fa-x");
    list.classList.toggle("navlist-active");
 })
// add_cart.forEach(button=> {
//    button.addEventListener("click",()=>
//    {
//       let product=this.parentElement;
//       let title=product.querySelector(".title").textContent;
//       let price=parseInt(product.querySelector(".amount").textContent);
//       addToCart(title,price);
//    })
// })
let cards=document.querySelectorAll(".card");
cards.forEach(card=>
   card.querySelector("button").addEventListener("click",()=>
   {
      // let product=this.card;
      messageBox();
      let title=card.querySelector(".title").textContent;
      let price=parseInt(card.querySelector(".amount").textContent);
      addToCart(title,price);

   }));
let addToCart=(title,price)=>
{
   let existingItem =cartItems.find(item=>item.title===title);
   if(existingItem)
   {
      existingItem.quantity+=1;
   }
   else
   {
      cartItems.push({title,price,quantity:1});
   }
   updateUI();
}
let updateUI=()=>
{
   cart_container.innerHTML="";
   let total=0;
   cartItems.forEach(item=>
      {
         total+=item.price*item.quantity;
         let li =document.createElement("li");
         li.innerHTML =`${item.title} (x${item.quantity}) - ${item.price * item.quantity}rs
         <button class="remove-item" data-title="${item.title}">X</button>`;
         cart_container.appendChild(li);
         console.log(li);
      });
      let liCount;
      liCount=cartItems.length;
      document.documentElement.style.setProperty("--before-cont",`"${liCount}"`);
      cart_total.textContent =total;
      
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      // cart.style.display =cartItems.length>0 ? "block" : "none";
      document.querySelectorAll(".remove-item").forEach(btn=>
         {
            btn.addEventListener("click",()=>
            {
               removeCart(btn.dataset.title);
            });
         });
}
let active=true;
cart_btn.addEventListener("click",()=>
{
   if(active)
   {
      cart.style.display="block";
      active=false;
   }
   else
   {
      cart.style.display="none";
      active=true;
   }
   // cart.style.display.toggle="block";

})
let removeCart=(title)=>
{
   cartItems=cartItems.filter(item=>item.title!==title);
   localStorage.setItem("cartItems",JSON.stringify(cartItems));
   updateUI(); 
}

