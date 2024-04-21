<?php
    include '../helpers/DBConnect.php';
    
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    $query = `SELECT * FROM forums`;
    $result = mysqli_query($mysqli, $query);
    
    echo json_encode($result);
?>