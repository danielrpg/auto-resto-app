 /*
 * Esta es la clase que ejecuta el jquery
 */

$(document).on('ready',function(){
       var home = new Home();
       home.init();
               
});

/*
 * Esta esl a clase Home encargada de ls index para que
 * se ejecute todo lo del index 
 * 
 **/
function Home(){
   /*
   * Este es el estilo de la pagina para que se pueda 
   * 
   */
   this.init=function(){
         $('#msg_login').hide();
         //var x=$('#login');
         $('#user_id').blur(function(){
            new Home().verificarCampoUsuario($('#user_id').val());
         }); 
          $('#pass_id').blur(function(){
            new Home().verificarCampoPassword($('#pass_id').val());
         });        
         $('#pass_id').keypress(function(event){
      			var keycode = (event.keyCode ? event.keyCode : event.which);
      			if(keycode == '13'){
      				//alert('You pressed a "enter" key in textbox');
      				new Home().verifyUser();	
      			}
		    });
       
        
   }
   /**
    * Verificar el campo password
    * @param  {[type]} datoCampo [Este es el campo password]
    * @return {[type]}           [description]
    */
   this.verificarCampoPassword = function(datoCampo){
      if(datoCampo == ""){
        //console.log("la cadena esta vacia!");
        $('#msg_login').empty();
        $('#msg_login').html("<img src='app/site/img/inf.png' align='absmiddle'> El campo <b>Contraña</b> esta vacio.").hide().fadeIn(1000);
      }else{
        //console.log("No esta vacio!");
        $('#msg_login').fadeOut(1000);
      }
   }
   /**
    * Verificar el campo usuario
    * @return {[type]} [description]
    */
   this.verificarCampoUsuario = function(datoCampo){
      if(datoCampo == ""){
        //console.log("la cadena esta vacia!");
        $('#msg_login').empty();
        $('#msg_login').html("<img src='app/site/img/inf.png' align='absmiddle'> El campo <b>Nombre</b> esta vacio.").hide().fadeIn(1000);
      }else{
        //console.log("No esta vacio!");
        $('#msg_login').fadeOut(1000);
      }
   }

    /*
     * Esta s la funcion que inicializa la funcion notIn
     */

    this.notIn = function(){
        $('#login').effect('shake');
    }
    
    /*
     *Este es el metodo que te permite ingresar al sistema
     */
    this.enterSystem = function(){
        var md5_pass = MD5($('#pass_id').val());
       // document.location="?action=inSystem";
       $(location).attr('href','?action=inSystem');
        
    }
    
    /*
     * Esta es la funcion que vefifica los datos si estan en la base de datos
     */
    this.verifyUser = function(){

        $('#msg_login').empty();
        var md5_pass = MD5($('#pass_id').val());
        $.ajax({
           data: "action=login&user="+$('#user_id').val()+"&password="+md5_pass,
           type: "GET",
           dataType: "json",
           url: "",
           beforeSend:function(){
              $('#msg_login').empty();
              $('#msg_login').html("<img src='app/site/img/ajax-loader.gif'>").hide().fadeIn(500);
           },
           success: function(data){
             $('#msg_login').hide();
             if(data.completo ===false){
             	 $('#msg_login').empty();  
               $('#msg_login').html("<img src='app/site/img/inf.png' align='absmiddle'> La cuenta es incorrecta.").hide().fadeIn(1000);
               new Home().notIn();
             }else if(data.completo ===true){
               $('#msg_login').empty();
               new Home().enterSystem();
             }
           },
           error:function(){
                $('#msg_login').empty();
                $('#msg_login').html("<img src='app/site/img/inf.png' align='absmiddle'> Ocurrio un problema con el servidor vuelva a intentar.").hide().fadeIn(1000);
           }
            
        });
     
    }

    
}



