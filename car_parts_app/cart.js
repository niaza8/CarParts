// 1. LocalStorage-დან კალათის წამოღება
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartContainer = document.getElementById('cart-items-container');
const totalPriceElement = document.getElementById('cart-total-price');

// 2. კალათის ნივთების გამოჩენის ფუნქცია
function displayCartItems() {
    if (!cartContainer) return;
    cartContainer.innerHTML = "";

    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center; font-size: 18px; margin: 40px 0;'>შენი კალათა ცარიელია 🛒</p>";
        if (totalPriceElement) totalPriceElement.textContent = "0.00";
        
        // თუ კალათა ცარიელია, ფორმა და ღილაკები დავმალოთ
        if (document.getElementById('proceed-to-checkout-btn')) document.getElementById('proceed-to-checkout-btn').style.display = 'none';
        if (document.getElementById('checkout-form-container')) document.getElementById('checkout-form-container').style.display = 'none';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemRow = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <p>ფასი: ${item.price.toFixed(2)} ₾</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <p style="font-weight: bold; width: 100px; text-align: right;">${itemTotal.toFixed(2)} ₾</p>
                <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartContainer.innerHTML += itemRow;
    });

    if (totalPriceElement) totalPriceElement.textContent = total.toFixed(2);
    if (document.getElementById('proceed-to-checkout-btn') && document.getElementById('checkout-form-container').style.display !== 'block') {
        document.getElementById('proceed-to-checkout-btn').style.display = 'inline-block';
    }
}

// 3. რაოდენობის შეცვლა
function updateQuantity(index, change) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[index]) return;

    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// 4. ნივთის წაშლა
function removeItem(index) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// 5. კალათის გასუფთავება
function clearCart() {
    if (confirm("ნამდვილად გსურთ კალათის სრულად გასუფთავება?")) {
        localStorage.removeItem('cart');
        displayCartItems();
    }
}

// 6. შეკვეთის ფორმის გამოჩენა
function showCheckoutForm() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("ჯერ დაამატეთ პროდუქტები კალათაში!");
        return;
    }
    document.getElementById('checkout-form-container').style.display = 'block';
    document.getElementById('proceed-to-checkout-btn').style.display = 'none';
}

// 7. უსაფრთხო შეკვეთის დამუშავება და მკაცრი ვალიდაცია
function handleCheckout(event) {
    event.preventDefault(); 

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;

    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const payment = document.getElementById('payment-method').value;

    // თუ არჩეულია ონლაინ გადახდა ბარათით
    if (payment === 'card_online') {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, ''); 
        const cardExpiry = document.getElementById('card-expiry').value.trim();
        const cardCvc = document.getElementById('card-cvc').value.trim();

        if (!cardNumber || cardNumber.length < 16) {
            alert("შეცდომა: გთხოვთ შეიყვანოთ ბარათის სწორი 16-ნიშნა ნომერი!");
            document.getElementById('card-number').focus();
            return; // აჩერებს ფუნქციას
        }
        
        if (!cardExpiry || cardExpiry.length < 5 || !cardExpiry.includes('/')) {
            alert("შეცდომა: გთხოვთ შეიყვანოთ მოქმედების ვადა სწორი ფორმატით (MM/YY)!");
            document.getElementById('card-expiry').focus();
            return; // აჩერებს ფუნქციას
        }
        
        if (!cardCvc || cardCvc.length < 3) {
            alert("შეცდომა: გთხოვთ შეიყვანოთ სწორი 3-ნიშნა CVC/CVV კოდი!");
            document.getElementById('card-cvc').focus();
            return; // აჩერებს ფუნქციას
        }

        alert("მიმდინარეობს კავშირი ბანკთან... 💳\nტრანზაქცია ავტორიზებულია და თანხა ჩამოიჭრა წარმატებით!");
    }

    // შეკვეთის ობიექტი ბაზისთვის
    const order = {
        orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        customer: { name, phone, address },
        items: cart,
        totalPrice: document.getElementById('cart-total-price').textContent,
        paymentMethod: payment === 'card_online' ? 'ბარათით (ონლაინ)' : 'ადგილზე გადახდა',
        date: new Date().toLocaleString()
    };

    let ordersList = JSON.parse(localStorage.getItem('orders')) || [];
    ordersList.push(order);
    localStorage.setItem('orders', JSON.stringify(ordersList));

    alert(`გილოცავთ! შენი შეკვეთა (${order.orderId}) წარმატებით გაფორმდა.`);

    localStorage.removeItem('cart');
    window.location.href = 'catalog.html';
}

// 8. გვერდის ჩატვირთვისას მოვლენების მიბმა
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();

    const paymentMethodSelect = document.getElementById('payment-method');
    const cardBlock = document.getElementById('card-details-block');

    // გადახდის მეთოდის კონტროლი
    if (paymentMethodSelect && cardBlock) {
        paymentMethodSelect.addEventListener('change', () => {
            if (paymentMethodSelect.value === 'card_online') {
                cardBlock.style.display = 'block';
            } else {
                cardBlock.style.display = 'none';
            }
        });
    }

    // ბარათის ნომრის ფორმატირება (ინფუთზე აკრეფისას)
    const cardInput = document.getElementById('card-number');
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
        });
    }
    
    // ვადის ფორმატირება (MM/YY)
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^\d]/g, '');
            if (val.length >= 2) {
                val = val.slice(0, 2) + '/' + val.slice(2, 4);
            }
            e.target.value = val;
        });
    }
});