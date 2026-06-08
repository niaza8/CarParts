<?php
session_start();
include 'db.php'; // შენი არსებული mysqli კავშირი

// შევამოწმოთ, დააჭირა თუ არა მომხმარებელმა ღილაკს
if (isset($_POST['place_order'])) {
    
    // მონაცემების მიღება და დაცვა
    $user_name = mysqli_real_escape_string($conn, $_POST['user_name']);
    $user_email = mysqli_real_escape_string($conn, $_POST['user_email']);
    $payment_method = mysqli_real_escape_string($conn, $_POST['payment_method']);
    
    // კალათის ჯამის გამოთვლა
    $total_price = 0;
    if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $item) {
            $total_price += ($item['price'] * $item['quantity']);
        }
    } else {
        die("შეცდომა: კალათა ცარიელია!");
    }

    // 1. შეკვეთის ჩაწერა orders ცხრილში
    $sql_order = "INSERT INTO orders (user_name, user_email, payment_method, total_price) 
                  VALUES ('$user_name', '$user_email', '$payment_method', '$total_price')";
    
    if (mysqli_query($conn, $sql_order)) {
        // ბოლო ჩანაწერის ID-ს აღება
        $order_id = mysqli_insert_id($conn);

        // 2. თითოეული ნივთის ჩაწერა order_items ცხრილში
        foreach ($_SESSION['cart'] as $item) {
            $name = mysqli_real_escape_string($conn, $item['name']);
            $qty = (int)$item['quantity'];
            $price = (float)$item['price'];
            
            $sql_item = "INSERT INTO order_items (order_id, product_name, quantity, price) 
                         VALUES ('$order_id', '$name', '$qty', '$price')";
            
            mysqli_query($conn, $sql_item);
        }

        // კალათის გასუფთავება
        unset($_SESSION['cart']);
        echo "შეკვეთა წარმატებით გაფორმდა! თქვენი შეკვეთის ID: " . $order_id;
        
    } else {
        // თუ შეკვეთა ვერ ჩაიწერა, გვეტყვის მიზეზს
        echo "ბაზის შეცდომა: " . mysqli_error($conn);
    }
} else {
    echo "არასწორი მოთხოვნა.";
}
?>