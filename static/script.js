// const addWish = () => {
//     let wishInput = document.getElementById("wish-input").value;
//     let li = document.createElement("li")
//     li.textContent = wishInput;
//     document.getElementById("wishlist").appendChild(li);
//     document.getElementById("wish-input").value = "";
//
// }

function EditItem (itemId){
   let title = document.getElementById("title-" + itemId);
   let description = document.getElementById("desc-" + itemId);
   let url = document.getElementById("url-" + itemId);
   let price = document.getElementById("price-" + itemId);

   // Convert to editable fields
    title.innerHTML = `<input type="text" id="input-title-${itemId}" value="${title.innerText}">`;
    description.innerHTML = `<input type="text" id="input-desc-${itemId}" value="${desc.innerText.replace('- ', '')}">`;
    price.innerHTML = `<input type="number" step="0.01" id="input-price-${itemId}" value="${price.innerText.replace('💰 ', '').replace(' CHF', '')}">`;
    url.outerHTML = `<input type="url" id="input-url-${itemId}" value="${url.href}">`;

}



