// 1. პროდუქტების სრული ბაზა
const products = [
    { id: 1, title: "ძრავის ზეთი (5W-30)", price: 85.00, brand: "Toyota", category: "ზეთი", image: "https://rpm.ge/wp-content/uploads/2024/06/SHELL-HELIX-HX8-5W30-1L-%E1%83%AB%E1%83%A0%E1%83%90%E1%83%95%E1%83%98%E1%83%A1-%E1%83%96%E1%83%94%E1%83%97%E1%83%98-600x600.jpg" },
    { id: 2, title: "აკუმულატორი 75Ah", price: 215.00, brand: "BMW", category: "აკუმულატორი", image: "https://amboli.ge/upload/Products/76363/00_00009606.jpg?w=800" },
    { id: 3, title: "მუხრუჭის ხუნდები (Front)", price: 110.00, brand: "Toyota", category: "სავალი ნაწილი", image: "https://toyota-tbilisi.com/media/genuine.jpg" },
    { id: 4, title: "აალების სანთლები (NGK)", price: 60.00, brand: "BMW", category: "ძრავი", image: "https://autobani.com/wp-content/uploads/2022/12/ngk-jpg.webp" },
    { id: 5, title: "ჰაერის ფილტრი", price: 35.00, brand: "Mercedes", category: "ფილტრი", image: "https://shop.gmtuning.ge/320-medium_default/-76mm.jpg" },
    { id: 6, title: "LED ფარების კომპლექტი", price: 450.00, brand: "Mercedes", category: "ნათურები", image: "https://img.joomcdn.net/80b70743f13201bcec643df6e6aaac5f0da450c7_original.jpeg" },
    { id: 7, title: "გადაცემათა კოლოფის ზეთი", price: 140.00, brand: "BMW", category: "ზეთი", image: "https://k-motors.ge/upload/products/adler-atf-9-0-f-1l-1.jpg" },
    { id: 8, title: "ანტიფრიზი", price: 45.00, brand: "BMW", category: "პერიფერია", image: "https://amboli.ge/upload/Products/71050/Custom/00_00010647.jpg?w=800" },
    { id: 9, title: "ზეთის ტუმბო", price: 180.00, brand: "Subaru", category: "ძრავი", image: "https://static.my.ge/myparts/photos/thumbs/0201/12821243_1.jpg?v=0" },
    { id: 10, title: "ტურბინა", price: 1200.00, brand: "Subaru", category: "ძრავი", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5VUyDn53i_Jf2JP6SPSKBfUrYDwDhbNm4xw&s" },
    { id: 11, title: "საწვავის ფილტრი", price: 55.00, brand: "Mercedes", category: "ფილტრი", image: "https://energymotors.ge/image/cache/catalog/FILTRON/High-Quality-Auto-Parts-Fuel-Filters-for-Benz-0000901551-550x550w.jpg" },
    { id: 12, title: "სტარტერი", price: 260.00, brand: "Hyundai", category: "ძრავი", image: "https://back.vakomotors.ge/uploads/photos/products/54990.png?v=1772910291" },
    { id: 13, title: "აალების სანთლები", price: 70.00, brand: "Hyundai", category: "ძრავი", image: "https://static.my.ge/myparts/photos/thumbs/0116/12423764_1.jpg?v=0" },
    { id: 14, title: "თერმოსტატი", price: 65.00, brand: "Toyota", category: "ძრავი", image: "https://static.my.ge/myparts/photos/thumbs/1028/12773823_1.jpg?v=1" },
    { id: 15, title: "წყლის რადიატორი", price: 210.00, brand: "Toyota", category: "ძრავი", image: "https://static.my.ge/myparts/photos/thumbs/1224/11958639_1.jpg?v=4" },
    { id: 16, title: "ამორტიზატორი", price: 190.00, brand: "Hyundai", category: "სავალი ნაწილი", image: "https://offroadhobby.ge/wp-content/uploads/2025/01/Untitled-1-600x600.jpg" },
    { id: 17, title: "Subaru Forester კარები (2012-2016)", price: 350.00, brand: "Subaru", category: "პერიფერია", image: "https://bparts-eu.s3-eu-west-1.amazonaws.com/images/438209/big/qttnbhvlcyqa0o0xq5lxj5zata38a1zs.jpg" },
    { id: 18, title: "Subaru Forester ძრავის ხუფი", price: 400.00, brand: "Subaru", category: "პერიფერია", image: "https://static.my.ge/myparts/photos/thumbs/0211/12639594_1.jpg?v=0" },
    { id: 19, title: "Subaru Impreza ძრავის 2.5L", price: 2500.00, brand: "Subaru", category: "ძრავი", image: "https://i.ebayimg.com/images/g/eBIAAOSwU9Rna0xY/s-l1200.png" },
    { id: 20, title: "საბურავი - ყველა სეზონი", price: 150.00, brand: "Toyota", category: "საბურავი", image: "https://www.pngarts.com/files/4/Car-Tire-PNG-Image-Background.png" },
    { id: 21, title: "საბურავი - ზამთარი", price: 165.00, brand: "Toyota", category: "საბურავი", image: "https://www.pngarts.com/files/4/Car-Tire-PNG-Image-Background.png" },
    { id: 22, title: "BMW 330 - ბამპერი", price: 320.00, brand: "BMW", category: "პერიფერია", image: "https://fix4car.ru/wp-content/uploads/2024/07/bamper.png" },
    { id: 23, title: "BMW 428 - დისკი", price: 800.00, brand: "BMW", category: "პერიფერია", image: "https://i.pinimg.com/originals/c0/a7/0d/c0a70d05ae988617bbea6b5af923b18c.png" },
    { id: 24, title: "MERCEDES - საჭე", price: 600.00, brand: "Mercedes", category: "პერიფერია", image: "https://png.pngtree.com/png-vector/20250529/ourmid/pngtree-a-black-leather-mercedes-benz-steering-wheel-featuring-silver-accents-and-png-image_16367485.png" },
    { id: 25, title: "TOYOTA - წინა ბამპერი", price: 280.00, brand: "Toyota", category: "პერიფერია", image: "https://png.pngtree.com/png-vector/20251108/ourmid/pngtree-sleek-gray-car-bumper-automotive-replacement-part-png-image_17923491.webp" },
    { id: 26, title: "TESLA - უკანა კარი", price: 450.00, brand: "Tesla", category: "პერიფერია", image: "https://ingenext.ca/cdn/shop/files/thumbnail_1000006943-Photoroom_93124af8-0239-4004-8199-cdc0df7cb4ac.png?v=1760971162" },
    { id: 27, title: "HYUNDAI - წინა კარი", price: 380.00, brand: "Hyundai", category: "პერიფერია", image: "https://www.thepartfinder.ae/assets/theme/pf-main/images/banner/parts/car-door.png" },
    { id: 28, title: "HYUNDAI - კარის სახელური", price: 45.00, brand: "Hyundai", category: "პერიფერია", image: "https://png.pngtree.com/png-vector/20241102/ourmid/pngtree-car-door-knob-vehicle-door-car-detail-png-image_14245626.png" },
    { id: 29, title: "MERCEDES - ხუფი (გარსაცმი)", price: 310.00, brand: "Mercedes", category: "პერიფერია", image: "https://www.thepartfinder.ae/assets/theme/pf-main/images/banner/parts/hood-bonnets.png" },
    { id: 30, title: "Subaru Crosstrek უკანა ბამპერი", price: 290.00, brand: "Subaru", category: "პერიფერია", image: "https://static.my.ge/myparts/photos/thumbs/0907/12555181_1.jpg?v=5" },
    { id: 31, title: "საბურავი - ზაფხული", price: 140.00, brand: "Toyota", category: "საბურავი", image: "https://www.pngarts.com/files/4/Car-Tire-PNG-Image-Background.png" }
];

// კალათის მასივი (იტვირთება LocalStorage-დან, ან იქმნება ცარიელი)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// სელექტორების ძებნა ტექსტის მიხედვით
let brandSelect, categorySelect;
document.querySelectorAll('.filter-group').forEach(group => {
    const label = group.querySelector('label');
    if (label) {
        if (label.textContent.includes('მარკა')) {
            brandSelect = group.querySelector('select');
        } else if (label.textContent.includes('კატეგორია')) {
            categorySelect = group.querySelector('select');
        }
    }
});

const priceInputs = document.querySelectorAll('.price-inputs input');
const priceFromInput = priceInputs[0];   
const priceToInput = priceInputs[1];     
const container = document.querySelector('.product-grid'); 

// 2. პროდუქტების გამოტანა კატალოგში
function displayProducts(productsList) {
    if (!container) return;
    container.innerHTML = ""; 
    
    if(productsList.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; font-size: 18px; margin-top: 20px;'>პროდუქტი ვერ მოიძებნა 😔</p>";
        return;
    }

    productsList.forEach(product => {
        const card = `
            <div class="product-card">
                <div class="product-img">
                    <a href="product-details.html">
                        <img src="${product.image}" alt="${product.title}">
                    </a>
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="price">${product.price.toFixed(2)} ₾</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">კალათაში დამატება</button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 3. კალათაში დამატების ფუნქცია
// კალათაში დამატების შესწორებული ფუნქცია script.js ფაილისთვის
function addToCart(productId) {
    // ყოველი დაჭერისას თავიდან წავიკითხოთ LocalStorage, რომ კალათის გვერდიდან წაშლილი ნივთები არ წამოვიღოთ
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // ვპოულობთ პროდუქტს ბაზაში ID-ს მიხედვით
    const productToAdd = products.find(p => p.id === productId);
    
    // ვამოწმებთ, ეს პროდუქტი უკვე არის თუ არა კალათაში
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // თუ უკვე არის, რაოდენობას ვუზრდით 1-ით
        existingProduct.quantity += 1;
    } else {
        // თუ არ არის, ვამატებთ ახალ ობიექტს 1-იანი რაოდენობით
        cart.push({
            ...productToAdd,
            quantity: 1
        });
    }

    // ვინახავთ განახლებულ კალათას LocalStorage-ში
    localStorage.setItem('cart', JSON.stringify(cart));

    // ვიზუალური ეფექტი მომხმარებლისთვის
    alert(`"${productToAdd.title}" დაემატა კალათაში! 🛒`);
}
    

// 4. ფილტრაციის ფუნქცია
function filterProducts() {
    const selectedBrand = brandSelect ? brandSelect.options[brandSelect.selectedIndex].text.trim() : 'ყველა';
    const selectedCategory = categorySelect ? categorySelect.options[categorySelect.selectedIndex].text.trim() : 'ყველა კატეგორია';
    
    const priceFrom = priceFromInput ? (parseFloat(priceFromInput.value) || 0) : 0;
    const priceTo = priceToInput ? (parseFloat(priceToInput.value) || Infinity) : Infinity;

    const filtered = products.filter(product => {
        const matchBrand = (selectedBrand.toLowerCase().includes('ყველა') || product.brand.toLowerCase() === selectedBrand.toLowerCase());
        const matchCategory = (selectedCategory.includes('ყველა') || product.category === selectedCategory);
        const matchPrice = (product.price >= priceFrom && product.price <= priceTo);

        return matchBrand && matchCategory && matchPrice;
    });

    displayProducts(filtered);
}

// 5. საწყისი ინიციალიზაცია
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products); 

    if(brandSelect) brandSelect.addEventListener('change', filterProducts);
    if(categorySelect) categorySelect.addEventListener('change', filterProducts);
    if(priceFromInput) priceFromInput.addEventListener('input', filterProducts);
    if(priceToInput) priceToInput.addEventListener('input', filterProducts);
});