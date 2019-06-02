<?php

include "bdd_connection.php";


if(array_key_exists("id", $_POST)){
    $id = $_POST["id"];
    $requete = $bdd->prepare("
    SELECT Id_message, User_Pseudo, Content, DateTime FROM message 
    WHERE Id_Discussion = ?
    ");

    $requete->execute([$id]);
    $messagesDisplay = $requete->fetchAll();
}else{
    $messagesDisplay = ["message" => false];
}

echo json_encode($messagesDisplay);