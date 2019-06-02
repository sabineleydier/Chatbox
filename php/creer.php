<?php
include 'bdd_connection.php';



if(array_key_exists("Name",$_POST) && !empty($_POST["Name"])){
    
    $newName = $_POST['Name'];
    //permet de mettre en majuscule le nom de la discussion
    $newNom = strtoupper($newName);

    //permet de remplacer l'espace par un tiret
    $nom = str_replace(" ", "-", $newNom);

    
    //récupère l'id de la discussion en fonction de son nom
    $requete = $bdd->prepare("
    SELECT Id_Discussion FROM  discussion WHERE Name=?
    ");
    $requete->execute([$nom]);
    $name_discution = $requete->fetchAll();

    //on vérifie si la discussion existe
     if(count($name_discution)>0){
       //la discussion existe
        $resultat = ["result" => true];

     }else{
       $resultat = ["result" =>false ];    

        //si la discussion n'existe pas, on l'insert dans la base de donnée
        $requete = $bdd->prepare("
        INSERT INTO  discussion (Name) VALUES (?)
        ");
        $requete->execute([$nom]);
        
         //ensuite on récupère son Id en fonction de son nom
        $requete = $bdd->prepare("
         SELECT Id_Discussion FROM  discussion WHERE Name=?
        ");
        $requete->execute([$nom]);
        $name_discution = $requete->fetch();

        $resultat +=  $name_discution;
    }
    
}else{
    $resultat = ["result" => false];
}
echo json_encode($resultat);
