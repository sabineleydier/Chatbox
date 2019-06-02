var pseudo;
var idName;

$(document).ready(function(){
    
    pseudo = processUser();  
    idName = idNumber();
      
    recupMessageForIdDiscussion();   
  
    $("#sendMessage").on("click", sendMessage);  
    
    var interval = setInterval(afficheDernierMessage, 2000);

    $(".quit").on("click", function (){
        clearInterval(interval);
        window.location.replace("rejoindre.html");
    });

   
})
    



//fonction permettant de récuperer le nom de la discussion en fonction de l'id
function idNumber(id){
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    var id = unescape(temp[1]);
    
    $.ajax({
        url : 'php/infosReturn.php',
        method : 'post',
        data :  {Id_Discussion : id},
        dataType : 'json',
        success : function(nameId){            
            $(".discussion").append(nameId.Name);
            
        }
    })
    return id;
}

//fonction permettant de récuperer le paramètre pseudo dans l'url
function processUser(pseudo){    
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[1].split("=");
    var pseudo = unescape(temp[1]);
    $(".utilisateur").append(pseudo);   
    return pseudo;
  
  }


  //fonction permettant d'envoyer les messages dans le BDD
  function sendMessage(e){ 
      e.preventDefault();      
      var message = $("#writtenMessage").val();

      $.ajax({
          url : 'php/chat.php',
          method : 'post',
          data : {Content : message, Id_Discussion : idName, User_Pseudo : pseudo},
          dataType : 'json',
          success : function(){
            afficheDernierMessage();
            scroll();
    
          }          
      })
      $("#writtenMessage").val("");
      
      
      
       
      
  }
  //affiche les messages en fonction de la discussion
  function recupMessageForIdDiscussion(id){
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    var id = unescape(temp[1]);
    $.ajax({
        url : "php/message.php",
        method : "post",
        data : {id : id},
        dataType : 'json',
        success : function(data){
            //console.log(data);
            for(var i = 0; i<data.length; i++){
                if(pseudo == data[i].User_Pseudo){
                    $("#displayChat1").append("<div class='self' ><p class='sent' data-id= "+ data[i].Id_message + ">" + data[i].Content + "</p>" + "<p>Envoyé par " + data[i].User_Pseudo + " le " + data[i].DateTime + "</p></div>");
                 }else{
                    $("#displayChat1").append("<div class='other'><p class='sent' data-id= "+ data[i].Id_message + ">" + data[i].Content + "</p>" + "<p>Envoyé par " + data[i].User_Pseudo + " le " + data[i].DateTime + "</p></div>");
                 }
            }
            scroll();

        }
    }) 
    return id;
  }

  
  //affiche le dernier message
  function afficheDernierMessage(){
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    var id = unescape(temp[1]);
    var idMessageCurrent = $("#displayChat1 div:last-of-type .sent").data("id");
    
    
    if(idMessageCurrent == undefined) idMessageCurrent = 0;
            
      $.ajax({
          url : 'php/chatDisplay.php',
          method : 'post',
          data: {Id_Discussion : id, lastId : idMessageCurrent},
          dataType : 'json',
          success : function (data){
                          
            for(var i = 0; i<data.length; i++){
                if(pseudo == data[i].User_Pseudo){
                $("#displayChat1").append("<div class='self' ><p class='sent' data-id= "+ data[i].Id_message + ">" + data[i].Content + "</p>" + "<p>Envoyé par " + data[i].User_Pseudo + " le " + data[i].DateTime + "</p></div>");
            }else{
                $("#displayChat1").append("<div class='other'><p class='sent' data-id= "+ data[i].Id_message + ">" + data[i].Content + "</p>" + "<p>Envoyé par " + data[i].User_Pseudo + " le " + data[i].DateTime + "</p></div>");
                }
            }
            
          }
      })
      
      
     
      
    }

    function scroll(){  

        $("#displayChat1").animate({scrollTop: $("#displayChat1")[0].scrollHeight}, 3000);

    }