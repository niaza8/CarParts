<?php
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['email']) && !empty($data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    // ვეძებთ მომხმარებელს ელ-ფოსტით
    $result = $conn->query("SELECT * FROM users WHERE email='$email'");
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // ჰეშირებული პაროლის შემოწმება
        if (password_verify($password, $user['password'])) {
            echo json_encode(["status" => "success", "message" => "ავტორიზაცია წარმატებულია!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "შეყვანილი პაროლი არასწორია!"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "მომხმარებელი ამ ელ-ფოსტით არ არსებობს!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "გთხოვთ შეავსოთ ყველა ველი!"]);
}
?>