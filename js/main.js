$(document).ready(function(){
    $("#rejoindre").on("submit", Rejoindre);
    $(".new-chat").on("submit", Creer);
    $(".connexion-chat").on("submit", Chat);

})
function Rejoindre(e){
    e.preventDefault();
    var  name = $("#joinChat").val();
    $.ajax({
        url : 'php/rejoindre.php',
        method : 'post',
        data : {Name : name},
        dataType : 'json',
        success : function(data){
            if(data.result == true){ 
               // redirection vers page de connexion
                window.location.replace("connexion.html?Id_Discussion=" +data.Id_Discussion); 
            }else{
                $("#error-msg").append('<div class="alert alert-danger" role="alert">Cette discussion n\'existe pas</div>');
            }
        }

    })
}
function Creer(e){
    e.preventDefault();
    var creation = $("#creatChat").val();
    $.ajax({
        url : 'php/creer.php',
        method : 'post',
        data : {Name : creation},
        dataType : 'json',
        success : function(data){
            console.log(data);
            if(data.result == true){ 
                $("#error-msg").append('<div class="alert alert-danger" role="alert">Cette discussion existe déjà</div>')   
            }else{
                //redirection vers page de connexion
                 window.location.replace("connexion.html?Id_Discussion=" +data.Id_Discussion);              
            }
        }
        
    })
}
function Chat(e){
    e.preventDefault();
    var pseudo = $("#Chat").val();

    //récupération de l'id dans l'url
    var id = location.search.substring(15);

    window.location.replace("chat.html?Id_Discussion=" + id +"&User_Pseudo=" + pseudo);
    
}
