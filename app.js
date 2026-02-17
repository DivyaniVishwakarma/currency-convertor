const BASE_URL="https://api.frankfurter.app/latest?from=";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select ");

let toCurr=document.querySelector(".to select ");
const msg=document.querySelector(".msg ");



for (let select of dropdowns){
  for(currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    
    if(select.name ==="from" && currCode === "USD"){
        newOption.selected = "selected";
    }else if(select.name ==="to" && currCode === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
  }
  //changing flag..
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}
const updateExchangerate=async()=>{
         let amount=document.querySelector(".amount input");
     let amtVal=amount.value;
     if(amtVal ===""|| amtVal<1){
      alert("Amount must be greater than 0")
        amtVal=1;
        amount.value=1;   

     }
     
     const URL=`${BASE_URL}${fromCurr.value}&to=${toCurr.value}`;
     let response=await fetch(URL);
     let data=await response.json();
     let rate=data.rates[toCurr.value];
     let finalAmt=amtVal*rate;
     msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmt}${toCurr.value}`;
    
}
const updateFlag =(element)=>{ 
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img"); //accesing parent of select
    img.src=newSrc;
};


btn.addEventListener("click",(evt)=>{
     evt.preventDefault();                 //prevent default operation of form like reloading on clicking button etc.
    
     try{
     if(fromCurr.value !== toCurr.value ){
    updateExchangerate();
     }else{
      msg.innerText="Please select different Currencies to Convert";
     }
    }catch(error){
      msg.innerText="Oops! Something Went Wrong";
    }
});

    
window.addEventListener("load",()=>{
     updateExchangerate();
});
