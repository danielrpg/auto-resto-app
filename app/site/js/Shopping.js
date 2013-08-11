/**
 * @author Daniel Fernandez
 */

var time=setInterval(monitor, 10000);
//var time=setInterval(monitor, 30000); // Este es el metodo que activa el monitor para que verifique si hay venta
$(document).ready(function(){
       var shop = new Shopping();
       shop.init();
       $('#order_windows').hide(); // Metodo que oculta el modal cuando para qe luego se muestre
       $(".item").mouseenter(function() {
           new Shopping().toolTip();
      }).mouseleave(function() {
             // $(this).find("span").text("mouse leave");
      });
});

function monitor()
{
     // alert("hola");
     var shop = new Shopping();  
     shop.monitor();
     shop.toolTip();
}




/*
 *  Esta es la clase que ejecuta las funciones del shopping cart
 */

function Shopping() {
	
	/*
	 * Metodo que  reailiza 
	 */
	this.changeQuantity = function(idItem){
		
		
		
		$.ajax({
		 	
            data: "action=updateItem&idItem="+idItem+"&itemQuantity="+$('#'+idItem).val(),
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
            	
                 
            },          
            success: function(data){ 
            	 
            	$('#orderTotal').val(data.orderTotal);

            },
            error:function(){
            
           }
        });
		
	}
	
	/*
	 * Metodo que permite el listar los clientes que tiene 
	 */
   this.clientsReport = function(){
   	
   		$.ajax({
		 	
            data: "action=listCustomer",
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
            	
            	$('#listaorders').empty();   
                
                $('#listaorders').append("<img src='app/site/img/imgLoad.gif' height='160'>");
                 
            },          
            success: function(data){ 
            	
            	$('#listaorders').empty();
            	
            	$('#listaorders').append("<table id='client_table'>");
            	
            	$('#client_table').append("<tr><th>Numero de Cliente</th><th>Cliente</th><th>Correo</th><th>Telefono</th><th>Direcci&oacute;n</th><th>Ciudad</th><th>Pais</th></tr>");
            	
 				$.each(data, function(index, value){
 				                                                                                                                                                                                          //Gestionamos el evento de cancelar el item address
 				  	$('#client_table').append("<tr><td>"+value.customerNumber+"</td><td>"+value.name+" "+value.lastName+"</td><td>"+value.email+"</td><td>"+value.phone+"</td><td>"+value.address+"</td><td>"+value.city+"</td><td>"+value.country+"</td></tr>");			     
        	  
        	    });
        	    
        	    $('#client_table').append("</table>");
        	    
        		
            },
            error:function(){
            	
            	$('#detailCustomer').empty();
            
           }
        });
        
        new Modal().show(850,500);
   	
   }
	
	
	
	
	/*
	 * Metodo que realiza el reporte  de  las ordenes
	 */
	this.ordersReport =function(){
		
		$.ajax({
		 	
            data: "action=listOrderDelivery",
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
            	
            	$('#listaorders').empty();   
                
                $('#listaorders').append("<img src='app/site/img/imgLoad.gif' height='160'>");
                 
            },          
            success: function(data){ 
            	
            	$('#listaorders').empty();
            	
            	$('#listaorders').append("<table id='client_table'>");
            	
            	$('#client_table').append("<tr><th>ID</th><th>Numero de Orden</th><th>Total</th><th>Fecha</th><th>Cliente</th><th>Numero de Cliente</th><th>Correo</th><th>Phone</th><th>Direccion</th><th>Ciudad</th><th>Pais</th></tr>");
            	
 				$.each(data, function(index, value){
 				                                                                                                                                                                                          //Gestionamos el evento de cancelar el item address
 				  $('#client_table').append("<tr class='"+value.idOrder+"'><td>"+value.idOrder+"</td><td>"+value.orderNumber+"</td><td>"+value.orderTotal+"</td><td>"+value.dateTime+"</td><td>"+value.name+" "+value.lastName+"</td><td>"+value.customerNumber+"</td><td>"+value.email+"</td><td>"+value.phone+"</td><td>"+value.address+"</td><td>"+value.city+"</td><td>"+value.country+"</td></tr>");			     
        	  
        	    });
        	    
        	    $('#client_table').append("</table>");
        	    
        		
            },
            error:function(){
            	
            	$('#detailCustomer').empty();
            
           }
        });
        
        new Modal().show(1040,500);
		
	}
	
	this.showModal = function(orderNumber){
		
		var status;
		
		$.ajax({
		 	
            data: "action=getOrdersRegisteredId&orderId="+orderNumber,
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
            	
            	$('#listaorders').empty(); 
            	
            	$('#listaorders').append('<div id="listaorders"><strong>Detalle de Orden</strong><br><div id="detailCustomer" ></div>');
            	
            	$('#listaorders').append('<strong>Articulos de Orden</strong><br><div id="itemsOrder"> </div></div>');
            	
            	$('#detailCustomer').empty();   
                
                $('#detailCustomer').append("<img src='app/site/img/imgLoad.gif' height='160'>");
                 
            },          
            success: function(data){ 
            	
            	$('#detailCustomer').empty();

        		$('#detailCustomer').append("<table id='client_detail'>");
        	
        		$('#client_detail').append("<tr><td><strong>Nombre:</strong></td><td>"+data.name+" "+data.lastName+"</td><td><strong>Emial:</strong></td><td>"+data.email+"</td><td><strong>Telefono:</strong></td><td>"+data.phone+"</td></tr>");
        	
        		$('#client_detail').append("<tr><td><strong>Direccion:</strong></td><td>"+data.address+"</td><td><strong>Ciudad:</strong></td><td>"+data.city+"</td><td><strong>Pais:</strong></td><td>"+data.country+"</td></tr>");
        	
        		$('#client_detail').append("<tr><td><strong>Numero Orden:</strong></td><td>"+data.orderNumber+"</td><td><strong>Total:</strong></td><td><input name='orderTotal' id='orderTotal' value='"+data.orderTotal+"'  readonly ></td><td></td><td></td></tr>");
        	
    			$('#detailCustomer').append("</table>");
 
               new Shopping().showItems(data.status, orderNumber);
            },
            error:function(){
            	
               $('#detailCustomer').empty();
           
           }
        });
		
		
		
		
		
	}
	
	/*
	 * Metodo que nos muestra la lista de los items
	 */
    this.showItems = function(status,orderNumber){
    	
    	
    	$.ajax({
		 	
            data: "action=listOrderCustomer&orderNumber="+orderNumber,
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
            	
            /*	$('#listaorders').empty(); 
            	
            	$('#listaorders').append('<div id="listaorders"><strong> ORDER DETAIL</strong><br><div id="detailCustomer" ></div>');
            	
            	$('#listaorders').append('<strong> ORDER ITEMS</strong><br><div id="itemsOrder"> </div></div>');
            	*/
            	$('#itemsOrder').empty();   
                
                $('#itemsOrder').append("<img src='app/site/img/imgLoad.gif' height='160'>");
                 
            },          
            success: function(data){ 
            	
            	$('#itemsOrder').empty();
            	
            	$('#itemsOrder').append("<table id='client_table'>");
            	
            	if(status == 2){
            		
            	    
	            	
	            	$('#client_table').append("<tr><th>SKU</th><th>Producto</th><th>Precio</th><th>Cantidad</th></tr>");
	            	
	 				$.each(data, function(index, value){
	 				                                                                                                                                                                                          //Gestionamos el evento de cancelar el item
	 				  $('#client_table').append("<tr class='"+value.idItem+"'><td>"+value.sku+"</td><td>"+value.name+"</td><td>"+value.price+"</td><td>"+value.quantity+"</td></tr>");			     
	        	  
	        	    });
	        	    
	        	    $('#itemsOrder').append("</table>");
	        	    
	        	   
	            	
	           }else{
	           	
	           	   
	            	
	            	$('#client_table').append('<tr><th>SKU</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Edicion</th></tr>');
	            	
	 				$.each(data, function(index, value){
	 				                                                                                                                                                                                          //Gestionamos el evento de cancelar el item
	 				  $('#client_table').append('<tr class="'+value.idItem+'"><td>'+value.sku+'</td><td>'+value.name+'</td><td>'+value.price+'</td><td><input name="itemQuantity" id="'+value.idItem+'" value="'+value.quantity+'" onchange="new Shopping().changeQuantity('+value.idItem+');" /></td><td><a  onclick="new Shopping().cancelItem('+value.idItem+');">Cancel</a></td></tr>');			     
	        	  
	        	    });
	        	    
	        	    $('#itemsOrder').append("</table>");
	        	    
	        	    $('#itemsOrder').append("<a href='#' onclick='new Shopping().cancelOrder("+orderNumber+")' class='bt_cancelorder'> Cancel Order</a>  "); 
	        	    
	        	      $('#itemsOrder').append(" <a href='#' onclick='new Modal().closeModal()' class='bt_cancelorder'> Accept</a>");
	           }
        
            },
            error:function(){
            	
                $('#detailCustomer').empty();
           
           }
        });
		
		new Modal().show(560,400);
    	
    }
	
	/*
	 * Metodo que cancela la orden
	 */
	this.cancelOrder = function(orderId){
		
		$.ajax({
		 	
            data: "action=cancelOrder&orderId="+orderId,
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
            	
                 
            },          
            success: function(data){ 
            	 
            	// $('#'+orderId).remove();
            	 new Modal().closeModal();
            	 
            	 $('#'+orderId).hide("explode", { pieces: 32 }, 2500);

            },
            error:function(){
            
           }
        });
	}
	
	/*
	 * Metodo que cancela el item desde la interface
	 */
	this.cancelItem = function(idItem){
		
		$.ajax({
		 	
            data: "action=cancelItem&idItem="+idItem,
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
            	
                 
            },          
            success: function(data){ 
            	 
            	 $('.'+idItem).remove();
            	 
            	 $('#orderTotal').val(data.orderTotal);

            },
            error:function(){
            
           }
        });
		
		
	}
	
	
	/*
	 * Esta es la funcion que ejecuta el shopping del cart
	 */
	this.init = function(){
		
		var shop = new Shopping();
		
	    shop.clock();
       
        shop.toolTip();
		
		$("#listaDestino").droppable({            

	                accept: ".item",               

	                drop: function(ev, ui) {                                                          
                        
	    	            var orderId = $(ui.draggable).attr('id');
	    	            
	    	           //console.log(orderId);
	    	           
	    	            new Shopping().changeToConfirmation(orderId); 
	    	           
	    	            $(this).append($(ui.draggable));
	    	            
	    	            //console.log(ui.draggable);
	    	            $(ui.draggable).removeAttr('class');
	    	            
	    	            $(ui.draggable).attr('class','item2');               
	         		}
	    }); 
	    
	    $("#listaDestinoFinal").droppable({            

	                accept: ".item2",               

	                drop: function(ev, ui) {                                                          
                        
	    	            var orderId = $(ui.draggable).attr('id');
	    	            
	    	           // console.log(orderId);
	    	            	    	           
	    	            new Shopping().changeToConfirmationFinal(orderId); 
	    	           
	    	            $(this).append($(ui.draggable));
	    	                           
	         		}
	    }); 
	    
	     
	    
	}
	/*
	 * 
	 * 
	 */
	this.changeToConfirmation = function (orderId){
		
		//console.log(orderId);	
		
		$.ajax({
		 	
            data: "action=changeToConfirmation&orderId="+orderId+"&dateTimeConf="+(new Shopping().date_time()),
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
               
               
            },          
             
            success: function(data){ 
 				
 				  			     
            },
            error:function(){
            
           }
       });
       
      
			
	}
	/*
	 * Metodo que ejecuta el dragable para el final
	 */
    this.changeToConfirmationFinal = function(orderId){
    	
    	$.ajax({
		 	
            data: "action=changeToConfirmationFinal&orderId="+orderId+"&dateTimeConf="+(new Shopping().date_time()),
            
            dataType: 'json',
            
            type: 'GET',
  
            url: '',
             
            beforeSend:function(){
               
               
            },          
             
            success: function(data){ 
 				
 				  			     
            },
            error:function(){
            
           }
       });
	  
    	
    }
	
	/*
	 * Metodo encargado de monitorizar las ordenes en el server
	 */
	this.monitor = function(){
		$.ajax({
            data: "action=shopping&tp=dateTime",
            dataType: 'json',
            type: 'GET',
            url: "",
            beforeSend:function(){
            },          
            success: function(data){ 
               var shop = new Shopping();
               shop.getOrderCustumer(data.dateTime);
               			     
             },
            error:function(){
           }
       });
	}

	/*
	 * Metodo encargado de registrar los datos de la order y del custumer
	 */
	this.getOrderCustumer= function(dateTime){
		
		//console.log(dateTime);			
		
		$.ajax({
            data: "action=1&dateTime="+dateTime,
            //dataType: 'jsonp',
            dataType: 'json',
            type: 'GET',
            crossDomain:true,
            callback:'callback', 
             url: "http://chalasoft.tk/webservices/clients/clients.php",
            beforeSend:function(){
               
            },          
             
            success: function(data){
            	 var shopp = new Shopping();
            	 if(data.msg =='Yes'){ 
            	     
	            	 $.each(data.orders, function(index, value){
	            	  	shopp.getCustomerId(value.idUser, value.idOrder,value.orderNumber,value.orderTotal,value.dateTime);
	                 });
	             }else if(data.msg=='No'){
               	   console.log('No new orders');
                 }    
                     
             },
            error:function(){

            }
       });
	}
     /*
    * Metodo que se encarga de registrar al usuario y devuelve el idUsuario
    */
   this.getCustomerId = function(idUser,idOrder,orderNumber,orderTotal,dateTime){			
		
		$.ajax({
		 	
            data: "action=3&idCustomer="+idUser,
            
            //dataType: 'jsonp',
            
            dataType: 'json',
            
            type: 'GET',
            
            crossDomain:true,
            
            callback:'callback', 
            
             url: "http://chalasoft.tk/webservices/clients/clients.php",
             
            beforeSend:function(){
               
            },          
             
            success: function(data){
            	 
            	 var shop = new Shopping();
            	 
            	 shop.regCustomerBD(data.name,data.lastName,data.custumerNumber,data.email,data.phone,data.address,data.city,data.country,data.title,idUser,idOrder,orderNumber,orderTotal,dateTime,idUser);
    
             },
            error:function(){

           }
       });
       
       //return idCustomer;
   }
   /*
    * Esta es la funcion qe registra en la base de datos al cliente
    */
   this.regCustomerBD = function(name,lastName,custumerNumber,email,phone,address,city,country,title, idCustomer,idOrder,orderNumber,orderTotal,dateTime,idUser){
   	 
   	 //var  idCustomer;
 
    
   	 $.ajax({
		 	
            data: "action=regCostumerDB&name="+name+"&lastName="+lastName+"&custumerNumber="+custumerNumber+"&email="+email+"&phone="+phone+"&address="+address+"&city="+city+"&country="+country+"&title="+title+"&idCustomer="+idCustomer,
            
            dataType: 'json',
            
            type: 'GET',
  
            url: "",
             
            beforeSend:function(){
               
            },          
             
            success: function(data){ 
            	
                  // idCustomer = data.idCustomer;
                  
                  var shopp = new Shopping();
                  
                  shopp.regOrdersCustomer(idOrder,orderNumber,orderTotal,dateTime, idUser);
                  
                 //shopp.toolTip();
             },
             
            error:function(){
            
           }
       });
       
    //   return idCustomer;
   	
   }
   
   /*
    * Esta es la funcion que nos devuelve la fecha actual del cliente
    */
   this.date_time = function()
	{
		
		var fechaActual = new Date();
 
	    dia = fechaActual.getDate();
	    
	    mes = fechaActual.getMonth() +1;
	    
	    anno = fechaActual.getFullYear();
	 
	    if (dia <10) dia = "0" + dia;
	    
	    if (mes <10) mes = "0" + mes;  
	    
	    h = fechaActual.getHours();
	    
	    if(h<10)h = "0"+h;
	    
	    m = fechaActual.getMinutes();
	    
	    if(m<10)m = "0"+m;
	    
	    s = fechaActual.getSeconds();  
	    
	    if(s<10) s = "0"+s;
	    
	    fechaHoy = anno+ "-" + mes + "-" + dia+" "+h+":"+m+":"+s;
	   
	    return fechaHoy;
	     
	}
   
   
   /*
	* Metodo que ejecuta la funcion que registra a las ordenes en la base de dato
	*/
	this.regOrdersCustomer = function(idOrder, orderNumber, orderTotal,dateTime,idCustom){
		
		// se tiene que sacar la hora del cliente para enviar y almacenar enla base de datos
		
		$.ajax({
		 	
            data: "action=regOrderCostumer&idOrder="+idOrder+"&orderNumber="+orderNumber+"&orderTotal="+orderTotal+"&dateTime="+dateTime+"&idCustom="+idCustom+"&DTime="+(new Shopping().date_time()),
            
            dataType: 'json',
            
            type: 'GET',
  
            url: "",
             
            beforeSend:function(){
               
            },          
             
            success: function(data){ 
            	
            	var shopp = new Shopping();
            	
            	shopp.regOrderItems(idOrder,orderNumber);
                 
               // shopp.toolTip(); 
             },
             
            error:function(){
            
           }
       });
		
	}

   



	
	 /*
    * Metodo que realiza la insercion en la base de datos de los items de cada order
    */	
   this.regOrderItems = function(idOrder,orderNumber){
   	  
   	  $.ajax({
		 	
            data: "action=2&orderId="+idOrder,
            
            //dataType: 'jsonp',
            
            dataType: 'json',
            
            type: 'GET',
            
            crossDomain:true,
            
            callback:'callback', 
            
             url: "http://chalasoft.tk/webservices/clients/clients.php",
             
            beforeSend:function(){
               
            },          
             
            success: function(data){
            	
            	 //console.log(data.custumerNumber);
            	 $.each(data.items, function(index, value){
            	 	
            	 	var shop = new Shopping();
            	 	
            	 	shop.regItemsDB(idOrder,orderNumber, value.itemId, value.itemSku,value.itemName,value.itemQuantity,value.itemPrice,value.itemDate);
            	 	
            	 });
            	    
             },
            error:function(){

           }
       });
        
        var shopp = new Shopping();
        
        shopp.getOrdersResgistered(orderNumber);
       
   }
   
   /*
    * Metodo que registra lo items por cada order
    */
   this.regItemsDB= function(idOrder,orderNumber,itemId,itemSku,itemName,itemQuantity,itemPrice,itemDate){
   	
   	  $.ajax({
		 	
            data: "action=regItemsOrder&idOrder="+idOrder+"&orderNumber="+orderNumber+"&itemId="+itemId+"&itemSku="+itemSku+"&itemName="+itemName+"&itemQuantity="+itemQuantity+"&itemPrice="+itemPrice+"&itemDate="+itemDate,
            
            dataType: 'json',
            
            type: 'GET',
  
            url: "",
             
            beforeSend:function(){
               
            },          
             
            success: function(data){ 
            	
                  
              
             },
             
            error:function(){
            
           }
       });
       
      //new Shopping().toolTip();  
   	
   }
   
   /*
    * Metodo que se enecarga de listar las ordenes registradas en la base de datos
    */
   this.getOrdersResgistered = function(orderNum){
   	
   	
   		$.ajax({
		 	
            data: "action=getOrdersRegistered&orderNumber="+orderNum,
            
            dataType: 'json',
            
            type: 'GET',
  
            url: "",
             
            beforeSend:function(){
               
            },          
             
            success: function(data){ 
            	
            	 var item = $("<li class='item' id='"+data.idOrder+"' ondblclick='new Shopping().showModal("+data.idOrder+");' ><img src='app/site/img/products/box.png' ><hr><div id='title'><span id='"+data.orderNumber+"'>"+data.name+" "+data.lastName+"</span><input type='hidden' name='idOrder' id='idOrder' value='"+data.idOrder+"'></div></li>").hide().delay(3000).fadeIn(2000);
	
	             $('#listaOrigen').append(item);
	             
	            // $.getScript("app/site/lib/js/jquery.simpletip-1.3.1.pack.js");   Esta es la funcion para inportar una libreria js en cualquier momento
	             
	            	             
	                      
	             $(".item").draggable({
				
						appendTo: "body",
				
						helper: 'clone',
								
						cursor: "crosshair",
								
						revert: 'invalid',
								
						drag: function(event, ui){
									
								$('.tooltip').hide();
						
						}
			
				});
             
             
             },
             
            error:function(){
            
           }
       });
   	
   	   
     
   }
		
	/*
	 * Esta es la funcion que ejecuta el tooltip 
	 */
	this.toolTip = function(){
		
	
	      $('.item').simpletip({   //using the simpletip plugin
		 
		        offset:[10,30],
		        
		        showEffect: 'slide',
		        
		        hideEffect: 'slide',
	
		        content:'<img style="margin:10px;" src="app/site/img/ajax_load.gif" alt="loading" />', // default content
		        
		        onShow: function(){
		 
		 		   //var param = this.getParent().find('input').attr('value');
		 		   
		 		   var param2 = this.getParent().find('span').attr('id');
		          
		           this.load('?action=ajaxTooltip',{orderNum:param2});
		          
		        }
		 
		   });
		  
	}
	
	/*
	 * Metodo que realiza el toolTip2
	 */
	this.toolTip2 = function(){
		
		// console.log("Estas aqui hehehe");
		   
	    $('.item2').simpletip({   //using the simpletip plugin
	 
	        offset:[10,30],
	        
	        showEffect: 'slide',
	        
	        hideEffect: 'slide',

	        content:'<img style="margin:10px;" src="app/site/img/ajax_load.gif" alt="loading" />', // default content
	        
	        onShow: function(){
	 
	 		   //var param = this.getParent().find('input').attr('value');
	 		   
	 		   var param2 = this.getParent().find('span').attr('id');
	          
	          this.load('?action=ajaxTooltip',{orderNum:param2});
	          
	        }
	 
	    });
		    
		    
		
		
	}
	
	
	
   /*
    * Metodo que activa el drag  para los item2
    * 
    */	
	
	this.dragOrderFinal = function(){
		
		 $(".item2").draggable({
				
					appendTo: "body",
	
					helper: 'clone',
					
					cursor: "crosshair",
					
					revert: 'invalid',
					
					zIndex: 1000,
					//revert: true,
					
					drag: function(event, ui){
						
						$('.tooltip').hide();
					}
			
			});
	}
	
	this.dragOrderOrigin = function(){
		
		$(".item").draggable({
			
			appendTo: "body",
			
			helper: 'clone',
			
			containment: 'document',
	    	
	    	cursor: "crosshair",
	    	//opacity: 0.6,
	    	
	    	revert: 'invalid',
		    
		    zIndex: 1000,
		    
		    drag: function(event, ui){
		    	
		    	$('.tooltip').hide();

		    }
		
		});
		
		
		
	}
	
	/*
	 * Esta es la function para la hora digital
	 */
	this.clock = function(){
				// Create two variable with the names of the months and days in an array
		var monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]; 
		var dayNames= ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
		// Create a newDate() object
		var newDate = new Date();
		// Extract the current date from Date object
		newDate.setDate(newDate.getDate());
		// Output the day, date, month and year   
		$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
		setInterval( function() {
			// Create a newDate() object and extract the seconds of the current time on the visitor's
			var seconds = new Date().getSeconds();
			// Add a leading zero to seconds value
			$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
			},1000);
			
		setInterval( function() {
			// Create a newDate() object and extract the minutes of the current time on the visitor's
			var minutes = new Date().getMinutes();
		
			// Add a leading zero to the minutes value
			$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
		    },1000);
		setInterval( function() {
			// Create a newDate() object and extract the hours of the current time on the visitor's
			var hours = new Date().getHours();
		
			// Add a leading zero to the hours value
			$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
		
		    }, 1000);	
	}
}
