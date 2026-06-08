<?php
header("Content-Type: application/json");
include 'db.php';

// JS-დან გამოგზავნილი JSON-ის წაკითხვა
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['email']) && !empty($data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    
    // პაროლის ჰეშირება (უსაფრთხოებისთვის, ბაზაში ღიად რომ არ გამოჩნდეს)
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    // ვამოწმებთ, ხომ არ არის ეს მეილი უკვე გამოყენებული
    $checkEmail = $conn->query("SELECT id FROM users WHERE email='$email'");
    if ($checkEmail->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "ეს ელ-ფოსტა უკვე რეგისტრირებულია!"]);
        exit;
    }

    // მომხმარებლის ჩამატება ბაზაში
    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "რეგისტრაცია წარმატებით დასრულდა!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "შეცდომა ბაზაში ჩაწერისას."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "გთხოვთ შეავსოთ ყველა ველი!"]);
}
?>