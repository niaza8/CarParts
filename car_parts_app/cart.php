<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>შოპინგის კალათა</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css"> 
    <style>
        /* თანამედროვე და გაუმჯობესებული სტილები კალათის გვერდისთვის */
        body { background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; }
        .cart-container { max-width: 1000px; margin: 50px auto; padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .cart-title { font-size: 28px; font-weight: 700; margin-bottom: 25px; border-bottom: 2px solid #edf2f7; padding-bottom: 15px; color: #1a202c; display: flex; align-items: center; gap: 12px; }
        
        /* ნივთების სტილი */
        .cart-item { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #edf2f7; }
        .cart-item img { width: 90px; height: 90px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; }
        .item-details { flex: 1; margin-left: 20px; }
        .item-details h4 { margin: 0 0 6px 0; font-size: 16px; color: #2d3748; font-weight: 600; }
        .item-details p { margin: 0; color: #718096; font-size: 14px; }
        
        /* რაოდენობის კონტროლი */
        .quantity-controls { display: flex; align-items: center; gap: 5px; background: #f1f5f9; padding: 5px; border-radius: 6px; }
        .quantity-controls button { width: 32px; height: 32px; cursor: pointer; border: none; background: #fff; font-weight: bold; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: 0.2s; }
        .quantity-controls button:hover { background: #edf2f7; }
        .quantity-controls span { font-weight: 600; min-width: 25px; text-align: center; font-size: 15px; }
        
        .remove-btn { color: #e53e3e; cursor: pointer; background: none; border: none; font-size: 18px; transition: 0.2s; padding: 10px; }
        .remove-btn:hover { color: #c53030; transform: scale(1.1); }
        
        /* ჯამური ბლოკი */
        .cart-summary { margin-top: 35px; text-align: right; font-size: 22px; font-weight: 700; color: #1a202c; padding-top: 20px; border-top: 2px solid #edf2f7; }
        .cart-summary span { color: #3182ce; }
        .clear-cart-btn { background: #feb2b2; color: #9b2c2c; border: none; padding: 10px 20px; cursor: pointer; border-radius: 6px; margin-top: 15px; font-weight: 600; font-size: 14px; transition: 0.2s; }
        .clear-cart-btn:hover { background: #fc8181; color: #fff; }
        
        /* შეკვეთის ფორმის სტილი */
        .checkout-section { max-width: 550px; margin-top: 40px; background: #f8fafc; padding: 25px; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02); }
        .checkout-section h3 { margin-top: 0; margin-bottom: 20px; color: #2d3748; font-size: 20px; display: flex; align-items: center; gap: 10px; }
        .form-group { margin-bottom: 18px; }
        .form-group label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 600; color: #4a5568; }
        .form-group input, .form-group select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 14px; box-sizing: border-box; transition: 0.2s; background: #fff; }
        .form-group input:focus, .form-group select:focus { border-color: #3182ce; outline: none; box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.15); }
        
        /* ბარათის ვიზუალური ბლოკი */
        #card-details-block { background: #f0f7ff; padding: 20px; border-radius: 8px; border: 1px dashed #3182ce; margin: 20px 0; }
        #card-details-block h4 { margin-top: 0; margin-bottom: 15px; color: #2b6cb0; font-size: 15px; display: flex; align-items: center; gap: 8px; }
        
        /* ღილაკები */
        .btn-submit { background: #38a169; color: white; border: none; padding: 14px 20px; width: 100%; cursor: pointer; border-radius: 6px; font-size: 16px; font-weight: bold; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .btn-submit:hover { background: #2f855a; }
        .btn-primary { background: #3182ce; color: white; border: none; padding: 14px 30px; cursor: pointer; border-radius: 6px; font-size: 16px; font-weight: bold; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .btn-primary:hover { background: #2b6cb0; }
    </style>
</head>
<body>

    <div class="cart-container">
        <h2 class="cart-title"><i class="fas fa-shopping-cart"></i> ჩემი კალათა</h2>
        <div style="margin-bottom: 20px; text-align: left;">
    <a href="catalog.html" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 10px 18px; font-size: 14px; background: #4a5568;">
        <i class="fas fa-arrow-left"></i> კატალოგში დაბრუნება
    </a>
</div>
        <div id="cart-items-container"></div>

        <div class="cart-summary">
            სულ გადასახდელი: <span id="cart-total-price">0.00</span> ₾
            <br>
            <button class="clear-cart-btn" onclick="clearCart()">კალათის გასუფთავება</button>
        </div>

        <div class="checkout-section" id="checkout-form-container" style="display: none;">
            <h3><i class="fas fa-truck"></i> შეკვეთის გაფორმება</h3>
            <form id="checkout-form" onsubmit="handleCheckout(event)">
                
                <div class="form-group">
                    <label>სახელი, გვარი:</label>
                    <input type="text" id="customer-name" required>
                </div>
                
                <div class="form-group">
                    <label>ტელეფონის ნომერი:</label>
                    <input type="tel" id="customer-phone" required>
                </div>
                
                <div class="form-group">
                    <label>მიწოდების მისამართი:</label>
                    <input type="text" id="customer-address" required>
                </div>
                
                <div class="form-group">
                    <label>გადახდის მეთოდი:</label>
                    <select id="payment-method">
                        <option value="cash">ადგილზე გადახდა (კურიერთან)</option>
                        <option value="card_online">ონლაინ გადახდა ბარათით (იმიტაცია)</option>
                    </select>
                </div>

                <div id="card-details-block" style="display: none;">
                    <h4><i class="fas fa-credit-card"></i> ბარათის მონაცემები</h4>
                    
                    <div class="form-group">
                        <label>ბარათის ნომერი:</label>
                        <input type="text" id="card-number" placeholder="xxxx xxxx xxxx xxxx" maxlength="19">
                    </div>
                    
                    <div style="display: flex; gap: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label>ვადა (თვე/წელი):</label>
                            <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label>CVC/CVV:</label>
                            <input type="password" id="card-cvc" placeholder="***" maxlength="3">
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn-submit">შეკვეთის დადასტურება 🚀</button>
                
            </form>
        </div>

        <div style="text-align: right; margin-top: 20px;">
            <button id="proceed-to-checkout-btn" onclick="showCheckoutForm()" class="btn-primary">შეკვეთაზე გადასვლა</button>
        </div>
    </div>

    <script src="cart.js"></script>
</body>
</html>