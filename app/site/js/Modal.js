/**
 * @author Daniel Fernandez
 */

function Modal(){
	
	/*
	 *  Metodo que prueba la clase si esta siendo importando
	 */
	this.show = function(width_s,height_s){

		//new Modal().showModal(550,400);
		new Modal().showModal(width_s,height_s);
	
	}
	
	/*
    * Esta es la ventana para sales 
    */
   this.showModal = function(width_s,height_s){
            //request data for centering
            var windowWidth = document.documentElement.clientWidth;

            var windowHeight = document.documentElement.clientHeight;

            //var popupHeight = $("#add_client").height();
            var popupHeight = height_s;

            //var popupWidth = $("#add_client").width();
            var popupWidth = width_s;
            //centering
            $("#order_windows").css({

                    "height": height_s,

                    "width": width_s,

                    "position": "absolute",

                    "top": windowHeight/2-popupHeight/2,

                    "left": windowWidth/2-popupWidth/2

            });
		
	    $("#background_sales").css({
			
			"opacity": "0.7"
            });
		$("#background_sales").fadeIn("slow");
	   $("#order_windows").fadeIn('slow');
   }
   
   /*
    * Esta es la funcion que cierra la ventana de las nuevas ventas
    * 
    */
   this.closeModal = function(){
       
       $('#background_sales').fadeOut("slow");
       //$('#order_windows').effect("explode","slow");
       $('#order_windows').hide("explode", { pieces: 4 }, 800);
   }
}
