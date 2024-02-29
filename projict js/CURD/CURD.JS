// ///////////////////////////////////////////////CURD/////////////////////////////////////////////////////////////////


// مميزات البرنامج
// اضافة منتج
// قراءة و عرض المنتج
// حذف المنتج
// البحث عن المنتجات بالاسم و التصنيف
// حفظ المنتجات بشكل دائم في local storage
// قادر على حساب ضريبة المنتج و مصاريف الاعلانات و ايجاد السعر النهائي
//  لن يتم اضافة البيانات الا اذا كانت صحيحة



// خطوات المشروع

const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const adss = document.getElementById('adss');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submet = document.getElementById('submet');

let mood = "create"
let tmp;


// 1- func = get Total

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +adss.value) - +discount.value
        total.innerHTML = result
        total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = "crimson";
    }
}

let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = [];
}




submet.onclick = function () {
    let NewProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        adss: adss.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    //6- count

    if (title.value != '' && price.value != '' && category.value != '' && NewProduct.count < 100) {
        if (mood === "create") {
            if (NewProduct.count > 1) {
                for (let i = 0; i < NewProduct.count; i++) {

                    dataProduct.push(NewProduct);
                }
            } else {
                dataProduct.push(NewProduct);
            }
        } else {
            dataProduct[tmp] = NewProduct;
            mood = "create"
            submet.innerHTML = "create"
            count.style.display = "block"
        }
        clearData();
    } else {

    }



    // 3- save localStorge
    localStorage.setItem('product', JSON.stringify(dataProduct))
    console.log(dataProduct);

    showData();
}

// 4- clear inputs

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    adss.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.value = '';
    count.value = '';
    category.value = '';
}


// 5- read

function showData() {

    let taple = ''

    for (let i = 0; i < dataProduct.length; i++) {

        taple += `
        
        <tr>
               <td>${i + 1}</td>
               <td>${dataProduct[i].title}</td>
               <td>${dataProduct[i].price}</td>
               <td>${dataProduct[i].taxes}</td>
               <td>${dataProduct[i].adss}</td>
               <td>${dataProduct[i].discount}</td>
               <td>${dataProduct[i].total}</td>
               <td>${dataProduct[i].category}</td>
               <td><button onclick="updateData (${i})" id="UPDATE">UPDATE</button></td>
               <td><button onclick="deleteData (${i}) " id="DELETE">DELETE</button></td>
        </tr>

        `;

        getTotal()
    }

    document.getElementById('tbody').innerHTML = taple

    let deleteALL = document.getElementById("deleteALL");
    if (dataProduct.length > 0) {
        deleteALL.innerHTML =
            `
        <button onclick ="deleteAll ()">delete All (${dataProduct.length})</button>

        `
    } else {
        deleteALL.innerHTML = '';
    }
}
showData();

// 7- DELETE 

function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0)
    showData();
}


// 8- update

function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    adss.value = dataProduct[i].adss;
    discount.value = dataProduct[i].discount;
    count.style.display = "none"
    category.value = dataProduct[i].category;
    submet.innerHTML = "update"
    mood = 'update'
    tmp = i;

    scroll({
        top: 0,
        behavior: "smooth"
    })

    getTotal()
}

// 9- search

let searchMood = 'title';

function getSearchMood(id) {

    let search = document.getElementById('search')

    if (id == 'searchtitle') {
        searchMood = 'title';

    } else {
        searchMood = 'category';

    }
    search.placeholder = ' Search By ' + searchMood

    search.focus()
    search.value = ''
    showData();
}

function searchData(value) {
    let taple = '';

    for (let i = 0; i < dataProduct.length; i++) {

        if (searchMood == 'title') {

            if (dataProduct[i].title.includes(value.toLowerCase())) {
                taple += `
        
                    <tr>
                           <td>${i}</td>
                           <td>${dataProduct[i].title}</td>
                           <td>${dataProduct[i].price}</td>
                           <td>${dataProduct[i].taxes}</td>
                           <td>${dataProduct[i].adss}</td>
                           <td>${dataProduct[i].discount}</td>
                           <td>${dataProduct[i].total}</td>
                           <td>${dataProduct[i].category}</td>
                           <td><button onclick="updateData (${i})" id="UPDATE">UPDATE</button></td>
                           <td><button onclick="deleteData (${i}) " id="DELETE">DELETE</button></td>
                    </tr>
            
                    `;
            }

        } else {

            if (dataProduct[i].category.includes(value.toLowerCase())) {
                taple += `
        
                    <tr>
                           <td>${i}</td>
                           <td>${dataProduct[i].title}</td>
                           <td>${dataProduct[i].price}</td>
                           <td>${dataProduct[i].taxes}</td>
                           <td>${dataProduct[i].adss}</td>
                           <td>${dataProduct[i].discount}</td>
                           <td>${dataProduct[i].total}</td>
                           <td>${dataProduct[i].category}</td>
                           <td><button onclick="updateData (${i})" id="UPDATE">UPDATE</button></td>
                           <td><button onclick="deleteData (${i}) " id="DELETE">DELETE</button></td>
                    </tr>
            
                    `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = taple
}

const showPopupBtn = document.getElementById("showPopup");
const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopup");

showPopupBtn.addEventListener("click", () => {
    popup.style.display = "block";
});

closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
