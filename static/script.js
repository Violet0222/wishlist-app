const addWish = () => {
    let wishInput = document.getElementById("wish-input").value;
    let li = document.createElement("li")
    li.textContent = wishInput;
    document.getElementById("wishlist").appendChild(li);
    document.getElementById("wish-input").value = "";

}