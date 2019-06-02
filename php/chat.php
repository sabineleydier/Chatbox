<?php

include "bdd_connection.php";

 

if(array_key_exists("User_Pseudo",$_POST) && array_key_exists("Id_Discussion", $_POST) && array_key_exists("Content", $_POST)){
    
    $newPseudo = $_POST["User_Pseudo"];
    $id = $_POST["Id_Discussion"];
    $message = $_POST["Content"];


    $requete = $bdd->prepare("
    INSERT INTO message (Id_Discussion, User_Pseudo, Content) VALUES(?, ?, ?)
    ");

    $requete->execute([$id, $newPseudo, $message]);

    if(empty($message) == false){
        $resultat = ["result" => true];

    }else{
        $resultat = ["result" => false];
    }

}else{
    $resultat = ["result" => false];
}
echo json_encode($resultat);


