const suggest = document.querySelector(".suggestt");
const newest = document.querySelector(".newest");
const search = document.querySelector(".toolbar__search-input");
const detail = document.querySelector(".main__detail-wrap");
const cmt = document.querySelector(".cmt");
const searchShow = document.querySelector(".search__history-list");
const searchWrapper = document.querySelector(".toolbar__search");
const select = document.getElementById("hehe");
const selectt = document.getElementById("hihi");
const pagination_element = document.querySelector(".pagination");
let current_page = 1;
let rows = 12;


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page_type = urlParams.get('id');
const api_url = "https://6321833b82f8687273b34b69.mockapi.io/product/";
const api_urll = "https://6321833b82f8687273b34b69.mockapi.io/comment/"
async function getapi() {
    // Storing response
    const response = await fetch(api_url);
    // Storing data in form of JSON
    var arr = await response.json();
    var arrr = arr;
    var slice = arr.slice(0, 10);
    var slice1= arr.slice(0, 12);

    if (suggest)
    {
        suggest.innerHTML = GetsuggestProduct(slice)
    }
    if(newest) {
        newest.innerHTML = GetnewProduct(slice1);
        SetupPagination(arr, pagination_element, rows);
    }
    search.addEventListener("click" , () => {
        return searchWrapper.classList.add('show');
    })

    document.body.addEventListener('click', () => {
        return searchWrapper.classList.remove('show');
    }, true); 
    
    search.addEventListener("input", (e) => {
        filterItems = arr.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
        var split = filterItems.slice(0,5);
        console.log(e.target.value.toLowerCase());
        if (filterItems.length != 0) {
            searchShow.innerHTML = GetsearchProduct(split);
        }
        else {
            searchShow.innerHTML = '<div class="search__history-item">Không tìm thấy sản phẩm nào trùng khớp!!</div>';
        }
    });

    if (select)
    {
        select.addEventListener('change', () => {
            var a = select.value;
            console.log(a);
            switch(a) {
                case "1":
                    const sortAsc = arr.sort((a, b) => {
                        let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                    newest.innerHTML = GetnewProduct(sortAsc)
                break;
                case "2":
                    const sortDesc = arr.sort((a, b) => {
                        let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                    
                        if (fa > fb) {
                            return -1;
                        }
                        if (fa < fb) {
                            return 1;
                        }
                        return 0;
                    });
                    newest.innerHTML = GetnewProduct(sortDesc)
                break;
                case "3":
                    const sortCmt = arr.sort((a, b) => {
                        return b.numcmt - a.numcmt;
                    });
                    newest.innerHTML = GetnewProduct(sortCmt)
                break;
            }
        })
    }
    if (selectt)
    {
        selectt.addEventListener('change', () => {
            var a = selectt.value;
            
            switch(a) {
                case "1":
                    const groupByTrue= arr.filter(item => item.label == true);
                    newest.innerHTML = GetnewProduct(groupByTrue);
                    console.log(groupByTrue);
                break;
                case "5":
                    const groupByFalse = arrr.filter(item => item.label == false);
                    newest.innerHTML = GetnewProduct(groupByFalse);
                    console.log(groupByFalse);
                break;    
            }
        })
    }
    ////////////////////////////////
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];

btn.onclick = function () {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}
close_footer.onclick = function () {
    modal.style.display = "none";
}
order.onclick = function () {
    alert("Cảm ơn bạn đã thanh toán đơn hàng")
}
window.onclick = function (event) {
    if (event.target == modal) {
    modal.style.display = "none";
  }
}


// xóa cart
var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function (event) {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
}
// thay đổi số lượng
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

// Thêm vào giỏ
var add_cart = document.getElementsByClassName("btn-product");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  console.log(add);
  add.addEventListener("click", function (event) {
    var button = event.target;
    var product = button.parentElement;
    var img = product.getElementsByClassName("img-imgg")[0].src
    var title = product.getElementsByClassName("mainProduct__item-title")[0].innerText
    var price = product.getElementsByClassName("mainProduct__item-price")[0].innerText
    addItemToCart(title, price, img)
    // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
    modal.style.display = "block";
    
    updatecart()
  })
}

function addItemToCart(title, price, img) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cart_title = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
      return
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function (event) {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}
// update cart 
function updatecart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i]
    var price_item = cart_row.getElementsByClassName("cart-price")[0]
    var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
    var price = parseFloat(price_item.innerText)
    var quantity = quantity_item.value
      total = total + (price * quantity)
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total + '$'
}

}

getapi();
window.onload = getapi()
async function getapii() {
    if(page_type)
    {
        // Storing response
    const responsee = await fetch(api_url + page_type);
    // Storing data in form of JSON
    var arr = await responsee.json();
    detail.innerHTML = detailProduct(arr);
    }
    
}

getapii();
window.onload = getapii()

async function getapiCmt() {
    if(cmt)
    {
    // Storing response
    const responseee = await fetch(api_urll);
    // Storing data in form of JSON
    var arr = await responseee.json();
    var slice = arr.slice(0, 5);
    cmt.innerHTML = GetcmtDetail(slice);
    }
}

getapiCmt();
window.onload = getapiCmt()
function suggestProduct(item){
    const random = Math.floor(Math.random() * 66) + 1 ;
    return `
    <div class="col l-2-4">
    <a href="/detail.html?id=${item.id}" class="suggest__item-wrap">
        <div class="suggest__item-img">
            <img src="/img/suggest/a ${random}.jpg" alt="">
        </div>
        <div class="suggest__item-title">
            ${item.title}
        </div>
        <div class="suggest__item-address">
            ${item.address}
        </div>
        <div class="suggest__item-label">
            <i class="fa-solid fa-tag" style="color: red;"></i>
            <span style="font-size: 0.75rem;">${item.label}</span>
        </div>
    </a>
</div>
`
}

function GetsuggestProduct(items){
    return items.map(item => suggestProduct(item)).join("");
}

function GetnewProduct(items){
    return items.map(item => newProduct(item)).join("");
}

function newProduct(item){
    const random = Math.floor(Math.random() * 66) + 1;
    const random1 = Math.floor(Math.random() * 9900) + 1;
    const random2 = Math.floor(Math.random() * 9900) + 1;
    return `
    <div class="col l-3">
        <div class="mainProduct__item-wrap">
            <a href="/detail.html?id=${item.id}">
                <div class="mainProduct__item-img">
                    <img class = "img-imgg" src="/img/suggest/a ${random}.jpg" alt="">
                </div>
                <div class="mainProduct__item-title">
                    ${item.title}
                </div>
                <div class="mainProduct__item-address">
                    ${item.address}
                </div>
            </a>
            <div class="mainProduct__item-price"> <i class="fa-solid fa-tag" style="color: #333"></i> ${item.price} $</div>
            <div class="mainProduct__item-comment">
                <div class="mainProduct__item-comment--avatar">
                    <img src="${item.avatar}" alt="">
                </div>
                <div class="mainProduct__item-comment--text">
                    <span>${item.namecmt}</span>
                    <p>${item.cmt}</p>
                </div>
            </div>
            <div class="mainProduct__item-bottom">
                <div class="mainProduct__item-bottom--left">
                    <div class="mainProduct__item-bottom--left1">
                        <i class="fa-solid fa-comment"></i>
                        <span>${random1}</span>
                    </div>
                    <div class="mainProduct__item-bottom--left1">
                        <i class="fa-solid fa-camera"></i>
                        <span>${random2}</span>
                    </div>
                </div>
                <div class="mainProduct__item-bottom--right">
                    <i class="fa-solid fa-bookmark"></i>
                    <span>Lưu</span>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-product">Thêm vào giỏ hàng</button>
    </div>
    `
}


function DisplayList (items, rows_per_page, page)
{
    page--;
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);
    return paginatedItems.map(item => newProduct(item)).join("");
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('a');
    var linkText = document.createTextNode(page);
    button.appendChild(linkText);

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
        newest.innerHTML = DisplayList(items, rows, current_page);
		let current_btn = document.querySelector('.pagination a.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

function detailProduct(item) {
    const random = (Math.random() * (10 - 0) + 0).toFixed(1)
    return `
    <img src="/img/suggest/a ${item.id}.jpg" alt="" style="width: 42%;height: auto">
    <div class="detail__info">
        <div class="info__city">
            <span>Hà Nội » </span>
            <span>Quận Hai Bà Trưng » </span>
            <span>Khu vực Hồ Bảy mẫu</span>
        </div>
        <div class="info__name">
            ${item.title}
        </div>
        <div class="info__tag">
            <span>Café/Desert,</span>
            <span>Đài Loan,</span>
            <span>Cặp đôi</span>
        </div>
        <div class="info__score">
            <div class="score__item--circle">${random}</div>
            <div class="score__item">${random} <span>Vị trí</span></div>
            <div class="score__item">${random} <span>Chất lượng</div>
            <div class="score__item">${random} <span>Phục vụ</div>
            <div class="score__item">${random} <span>Giá cả</div>
            <div class="score__item">${random} <span>Không gian</div>
            <div class="score__item score__item--cmt">${item.numcmt} <span>Bình luận</div>
        </div>
        <div class="info__address">
            <span><i class="fa-solid fa-location-arrow"></i>${item.address} <i class="fa-solid fa-map"></i> Quận Hai Bà Trưng, Hà Nội</span>
        </div>
        <div class="info__time">
            <i class="fa-regular fa-clock"></i>
            <span>Chưa mở cửa</span>
            ${item.time} <i class="fa-solid fa-circle-exclamation"></i>
        </div>
        <div class="info__price">
            <i class="fa-solid fa-tag"></i>
            ${item.price} $
        </div>
    </div>
    `
}

function CmtdetailProduct(item) {
    const random = (Math.random() * (10 - 0) + 0).toFixed(1)
    return `
    <div class="col l-9">
        <div class="comment-wrap">
            <div class="comment-top">
                <div class="comment-top__left--wrap">
                    <div class="comment-top__img">
                        <img src="${item.avatar}" alt="" >
                    </div>
                    <div class="comment-top__name">
                        <div class="comment-top__main-name">
                        ${item.name}
                        </div>
                        <div class="comment-top__time">
                            via Android <i class="fa-brands fa-android"></i>
                            <span>22/12/2021 18:24</span>
                        </div>
                    </div>
                </div>
                <div class="comment-top__score">
                    ${random}
                </div>
            </div>
            <div class="comment__reaction">${item.react}</div>
            <div class="comment__detail">
            ${item.content}
            </div>
            <div class="comment__select">
                <div class="comment__select-item">
                    <i class="fa-solid fa-heart"></i>
                    Thích
                </div>
                <div class="comment__select-item">
                    <i class="fa-solid fa-comment"></i>
                    Thảo luận
                </div>
                <div class="comment__select-item">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Báo lỗi
                </div>
            </div>
            <div class="comment__rep">
                <div class="comment__rep-avatar">
                    <img src="${item.avatar2}" alt="">
                </div>
                <div class="comment__rep-info">
                    <div class="comment__rep-text">
                    ${item.name2}
                        <span>
                        ${item.content2}
                        </span>
                    </div>
                    <div class="comment__rep-time">
                        28/12/2021 11:59:25
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function GetcmtDetail(items){
    return items.map(item => CmtdetailProduct(item)).join("");
}

function searchProduct(item) {
    const random = Math.floor(Math.random() * 66) + 1;
    return `
    <div class="search__history-item">
        <a href="/detail.html?id=${item.id}" class="search__history-wrap">
            <div class="" style="display: flex;">
                <div class="search__history-img">
                    <img src="/img/suggest/a ${random}.jpg" alt="">
                </div>
                <div class="search__history-content">
                    <div class="history__content-title">
                        ${item.title}
                    </div>
                    <div class="history__content-address">
                        ${item.address}
                    </div>
                </div>
            </div>
            <div class="search__history-right">
                Đang mở
                <div class="search__history-ball"></div>
            </div>
        </a>
    </div>
    `
}

function GetsearchProduct(items){
    return items.map(item => searchProduct(item)).join("");
}


