<?php

include "bdd_connection.php";
if (array_key_exists("Id_Discussion", $_POST)){

    $discussionName = $_POST["Id_Discussion"];

    $requete = $bdd->prepare("
        SELECT Name FROM discussion WHERE Id_Discussion = ?
        ");

    $requete->execute([$discussionName]);
    $returnedName = $requete->fetch();
}else{
    $returnedName = ["name" => false];
}

echo json_encode($returnedName);