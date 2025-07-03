function deitalsProduct(x) {

    localStorage.setItem("name-product", x.parentElement.children[1].children[0].children[0].textContent);
    localStorage.setItem("price-product", x.parentElement.children[1].children[1].textContent);
    localStorage.setItem("price-sale", x.parentElement.children[1].children[2].textContent);
    localStorage.setItem("img-product", x.children[0].src);
}

function loadDeital() {
    document.getElementById("deital-img").setAttribute("src", localStorage.getItem("img-product"));
    document.getElementById("deital-name").innerHTML = localStorage.getItem("name-product");
    document.getElementById("deital-price").innerHTML = localStorage.getItem("price-product");
    document.getElementById("deital-sale").innerHTML = localStorage.getItem("price-sale");
}
var carts = [];
function existingItem(nameProduct, priceProduct) {
    var existingItemIndex = carts.findIndex(product => product.name === nameProduct && product.price === priceProduct);
    return existingItemIndex;

}
function addToCart(btn) {
    var nameProduct = btn.parentElement.children[0].textContent;
    var priceProduct = btn.parentElement.children[3].textContent;
    var imgProduct = btn.parentElement.parentElement.children[1].children[0].children[0].children[0].src;
    var quantityProduct = 1;
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (cart != null) {
        carts = cart;
    } else {
        carts = [];
    }
    var existingItemIndex = existingItem(nameProduct, priceProduct);
    if (existingItemIndex !== -1) {
        carts[existingItemIndex].quantity += quantityProduct;
        alert("Sản phẩm đã có trong giỏ hàng, đã tăng thêm số lượng!");
    } else {
        var product = { name: nameProduct, price: priceProduct, img: imgProduct, quantity: quantityProduct };
        carts.push(product);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
    }
    localStorage.setItem("cart", JSON.stringify(carts));

}
var quantityProduct = 1;

function addToCart2(btn) {
    var nameProduct = btn.parentElement.children[0].textContent;
    var priceProduct = btn.parentElement.children[2].textContent;
    var imgProduct = btn.parentElement.parentElement.children[0].children[0].src;
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart != null) {
        carts = cart;
    } else {
        carts = [];
    }
    var existingItemIndex = existingItem(nameProduct, priceProduct);
    if (existingItemIndex !== -1) {
        carts[existingItemIndex].quantity += quantityProduct;
        alert("Sản phẩm đã có trong giỏ hàng, đã tăng thêm số lượng!");
    } else {
        var product = { name: nameProduct, price: priceProduct, img: imgProduct, quantity: quantityProduct };
        carts.push(product);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
    }
    localStorage.setItem("cart", JSON.stringify(carts));

}

function loadCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var str = "";
    if (cart) {
        var cartList = document.querySelector(".cartList");
        for (let i = 0; i < cart.length; i++) {
            str += `<tr>
                <td><img  src="${cart[i].img}" alt="" style="width: 100px;height: 100px;" ></td>
                <td><a href="./details_product.html" class="name-product" >${cart[i].name}</a></td>
                <td><input onchange="total()" type="number" min="1" class="qty-input" value="${cart[i].quantity}" ></td>
                <td class="price" >${cart[i].price}<span style="text-decoration: underline;" >đ</span></td>
                <td class="total-price"><span   style="text-decoration: underline;" >đ</span></td>
                <td><i onclick="remove(this)" class="fa-regular fa-trash-can"></i></td>
              </tr>` ;
        }

        cartList.innerHTML = str;
        // Loại bỏ dòng này: localStorage.setItem("cartList", JSON.stringify(cartList));
        total();
        totalsProduct();
    }
}
function total() {
    var tr = document.querySelectorAll(".cartList tr");
    for (let i = 0; i < tr.length; i++) {
        var valueInput = tr[i].querySelector("input").value;
        var price = tr[i].querySelector(".price").textContent;
        price = price.substring(price.length - 1, 0);
        var priceFormat = price.replace(/\./g, "");
        priceFormat = parseFloat(priceFormat);
        var totalProduct = Number(valueInput * priceFormat);
        var totalFormat = totalProduct.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        tr[i].querySelector('.total-price').innerHTML = totalFormat;
        totalsProduct();
    }

}
function totalsProduct() {
    var cartList = document.querySelectorAll(".cartList tr");
    var totals = 0;
    var totalElement = document.querySelector(".price-total"); // Đảm bảo chọn đúng phần tử
    console.log(totalElement.textContent);
    for (let i = 0; i < cartList.length; i++) {
        var total = cartList[i].querySelector(".total-price").textContent;
        total = total.replace(/\./g, "");
        total = total.substring(0, total.length - 1); // Cần điều chỉnh nếu có ký tự 'đ' ở cuối
        totals += Number(total);
        console.log(total);
    }
    var totalsFormat = totals.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    console.log(totalElement.textContent = totalsFormat);
    return totalElement = totalsFormat;
}
function remove(btn) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var row = btn.parentElement.parentElement;
    var index = Array.prototype.indexOf.call(row.parentNode.children, row);
    if (index > -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    row.parentNode.removeChild(row);
    totalsProduct();
}
function presentlyBtn(div) {
    // Chỉ tác động đến div được truyền vào
    var btnNow = div.querySelector('.product__buy-now-btn');
    var img = div.querySelector('.product__detals-img');
    if (btnNow && img) {
        btnNow.style.display = 'block';
        img.style.opacity = '0.8';
    }
}
function hideBtn(div) {
    // Chỉ tác động đến div được truyền vào
    var btnNow = div.querySelector('.product__buy-now-btn');
    var img = div.querySelector('.product__detals-img');
    if (btnNow && img) {
        btnNow.style.display = 'none';
        img.style.opacity = '1';
    }
}
// Slider
var currentIndex = 0; // Đặt tên biến rõ ràng hơn
var arrImgs = ['./assets/img/1.webp',
    './assets/img/2.webp', './assets/img/3.webp', // Sửa đuôi .jpg
];

function updateSlider() {
    var imageMain = document.querySelector('.change__image');
    if (imageMain) {
        imageMain.src = arrImgs[currentIndex];
    }
}

changeSlider = function () {
    currentIndex = (currentIndex + 1) % arrImgs.length;
    updateSlider();
}
setInterval(changeSlider, 8000);

function nextSlider() {
    currentIndex = (currentIndex + 1) % arrImgs.length;
    updateSlider();
}
function prevSlider() {
    currentIndex = (currentIndex - 1 + arrImgs.length) % arrImgs.length;
    updateSlider();
}

// FLash sale
var endTime = localStorage.getItem("endTime");

if (!endTime) {
    endTime = new Date().getTime() + 18000;
    localStorage.setItem("endTime", endTime);
}

var countdown = setInterval(function () {
    var flashSale = document.querySelector(".flash__sale-container");
    var now = new Date().getTime();
    var timeLeft = endTime - now;
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";
    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "Hết thời gian!";
        flashSale.style.display = "none";
    } else {
        flashSale.style.display = "block";
    }
}, 1000);