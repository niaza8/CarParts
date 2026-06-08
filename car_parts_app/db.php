<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "car_parts_db";

// კავშირის დამყარება
$conn = new mysqli($host, $user, $pass, $dbname);

// შემოწმება, ხომ არ არის შეცდომა
if ($conn->connect_error) {
    die("ბაზასთან კავშირი ჩავარდა: " . $conn->connect_error);
}

// ქართული ენის მხარდაჭერა
$conn->set_charset("utf8mb4");
?>