<?php

include "bdd_connection.php";


 if(array_key_exists("lastId", $_POST) && array_key_exists("Id_Discussion", $_POST)){
    $IdDiscussion = $_POST["Id_Discussion"];
    $lastId = $_POST["lastId"];
    $requete = $bdd->prepare("
    SELECT Id_message, User_Pseudo, Content, DateTime FROM message 
    WHERE Id_Discussion = ? AND Id_message > ?
    ");

    $requete->execute([$IdDiscussion,$lastId]);
    $messagesDisplay = $requete->fetchAll();
}else{
    $messagesDisplay = ["message" => false];
}

echo json_encode($messagesDisplay);