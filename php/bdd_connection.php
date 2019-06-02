<?php
$bdd = new PDO(
	'mysql:host=localhost;dbname=chatbox;charset=UTF8',
    'root', '',
    [
    	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
);

?>