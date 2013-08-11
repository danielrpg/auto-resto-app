$.getScript("app/site/js/Validacion.js");
var datos_pieza ;
var num_pagina = 10;
$(document).on('ready', function(){
	var art  = new Articulos();
	art.init();
});
/**
 * Estas es la clase Cliente
 * encargada de manejar la informacion de los clientes
 */
function Articulos(){
	// Estas es la funcion que ejecuta la lista de los usuario
	this.init = function(){
		$('#lista_articulos').click(function(){
			listaArticulos();
		});
	}
}
/**
 * Lista de cliente 
 * @return {[type]} [description]
 */
function listaArticulos(){
	$('#listaorders').empty();
	$('#listaorders').append('<h2><img src="app/site/img/product.png"> Lista de Productos </h2> <hr>');
	$('#listaorders').append('<div id="msg_correcto"></div>');
    $('#msg_correcto').fadeOut(1000);
	$('#listaorders').append('<br><a href="#" onclick="nuevoArticulo()" class="enlace_boton_lista" ><img src="app/site/img/product.png" align="absmiddle"> Agregar Nuevo Producto </a>');
	var listaArticulos    = "";
	listaArticulos  	  = listaArticulos+'<div id="contenido_lista_productos">';
	listaArticulos        = listaArticulos+'<ul id="lista_clientes_total">';
	listaArticulos  	  = listaArticulos+'<ul>';
	listaArticulos  	  = listaArticulos+'</div>';
	listaArticulos  	  = listaArticulos+'<div id="paginacion_clientes"></div>';
	$('#listaorders').append(listaArticulos);
	$('#msg_correcto').hide();
	$.ajax({
		url:"?action=articulos&tp=listaArticulos&desde=0&hasta="+num_pagina,
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		    $('#msg_correcto').empty();
			$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
		},
		success:function(data){
			$('#msg_correcto').empty();
			$.each(data, function(index, producto){
 				$('#lista_clientes_total').append('<li><table><tr><td><img src="app/site/img/cocina.jpg"  align="left" class="imagen_pieza"></td><td><b>Servicio : </b>'+producto.nombre_servicio+'<br><b>Producto:</b>'+producto.nombre_articulo+'<br><b>Precio Venta:</b>'+producto.precio_venta_articulo+'<br> <b>Precio : </b>'+producto.precio_articulo+'</td></tr></table> <br><a href="#" onclick="editarArticulo('+producto.id_articulo+')"  class="enlace_boton_lista"><img src="app/site/img/pencil.png" height="20" title="Editar Datos de Producto" align="absmiddle"> Editar</a>  <a href="#" onclick="eliminarArticulo('+producto.id_articulo+')" title="Eliminar Cliente" class="enlace_boton_lista"><img src="app/site/img/eliminar.png" height="20" align="absmiddle"> Eliminar</a>').hide().fadeIn(500); 			     
        	});
		},
		error:function(data){
		}
	});	
	new Modal().show(680,580);
}

/**
 * Este es el metodo para editar
 */
 function editarArticulo(idArticulo){
 	$('#listaorders').empty();	
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/product.png"> Editar Producto</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<div id="contenido_nuevo_usuario"><form id="actualizar_datos_producto">';
	cadena_form  	 = cadena_form+'<table> <tr><td><label>Nombre Producto: </label></td><td><input type="text" value="" id="nombre_producto"><input type="hidden" id="id_producto_editar"></td> <td><label>Descripci&oacute;n: </label></td><td><textarea id="descripcion_producto"> </textarea></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Precio: </label></td><td><input type="text" value="" id="precio_producto"></td> <td><label>Precio de Venta: </label></td><td><input type="text" value="" id="precio_venta_producto"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Servicio:</label></td><td><select id="servicio_producto"></select></td><td><label></label></td><td></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Actualizar" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista" onclick="listaArticulos()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form></div>';
	$('#listaorders').append(cadena_form);
	$.ajax({
		url:"?action=servicios&tp=listaServicios",
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		},
		success:function(data){
			$.each(data, function(index, servicio){
 				  	$('#servicio_producto').append('<option value="'+servicio.id_servicio+'">'+servicio.nombre_servicio+'</option>');
        	 });
		},
		error:function(data){
		}
	});	
	
	$('#msg_login').hide();	
	validarTodosCamposNuevoCliente();
	$.ajax({
		url:"?action=articulos&tp=datosArticulo&idArticulo="+idArticulo,
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		},
		success:function(data){
			$('#id_producto_editar').val(data.id_articulo);
			$('#nombre_producto').val(data.nombre_servicio);
			$('#descripcion_producto').val(data.detalle_servicio);
			$('#precio_producto').val(data.precio_articulo);
			$('#precio_venta_producto').val(data.precio_venta_articulo);
			$("#servicio_producto option[value='"+data.id_servicio+"']").attr("selected","selected")
		},
		error:function(data){
		}
	});
	$('#actualizar_datos_producto').submit(function(evt){
		 $.ajax({
		    cache: false,
		    async: false,
		    type: 'POST',
		    data: {
			    id_producto_editar: $('#id_producto_editar').val(),
			    nombre_producto: $('#nombre_producto').val(),
			    descripcion_producto: $('#descripcion_producto').val(),
			    precio_producto: $('#precio_producto').val(),
			    precio_venta_producto: $('#precio_venta_producto').val(),
			    servicio_producto: $('#servicio_producto').val()
		    },
		    url: '?action=articulos&tp=actualizarArticulo',
		    dataType: 'json',
		    beforeSend: function(){
		      //$('#boton_enviar').attr('disabled', true);
		      	$('#msg_login').hide();
				$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
		    },
		    success: function(response) {
		    	//alert(response);
		      // Metodo 
		      if(response.completado==true){
		      	 articuloActualizadoExito(); // Metodo que se realiza para llamar cuando se registrado con exito
		      }
		    },
		    error: function(msg){
		       // $('#boton_enviar').attr('disabled', false);
		    }
		   });
		evt.preventDefault();
	});
	new Modal().show(760,400);
 }
/**
 * Esta es la funsion que se ejecuta 
 */
function articuloActualizadoExito(){
	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Articulo Actualizado</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> Los datos del Articulo han sido actualizados con exito!! </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaArticulos()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
}
/**
 * Esta es la funcion que ejcuta el formulario de nuevo cliente
 * 
 */
function formularioNuevoArticulo(){
	$('#listaorders').empty();	
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/product.png"> Nuevo Producto</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<div id="contenido_nuevo_usuario"><form id="registrar_nuevo_cliente">';
	cadena_form  	 = cadena_form+'<table> <tr><td><label>Nombre Producto: </label></td><td><input type="text" value="" id="nombre_producto"></td> <td><label>Descripci&oacute;n: </label></td><td><textarea id="descripcion_producto"> </textarea></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Precio: </label></td><td><input type="text" value="" id="precio_producto"></td> <td><label>Precio de Venta: </label></td><td><input type="text" value="" id="precio_venta_producto"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Servicio:</label></td><td><select id="servicio_producto"></select></td><td><label></label></td><td></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Registrar" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista" onclick="listaArticulos()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form></div>';
	$('#listaorders').append(cadena_form);
	$.ajax({
		url:"?action=servicios&tp=listaServicios",
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		},
		success:function(data){
			$.each(data, function(index, servicio){
 				  	$('#servicio_producto').append('<option value="'+servicio.id_servicio+'">'+servicio.nombre_servicio+'</option>');
        	 });
		},
		error:function(data){
		}
	});	
	$('#msg_login').hide();	
	validarTodosCamposNuevoProducto();
	new Modal().show(750,400);
}
/**
 * Nueva para 
 * @return {[type]} [description]
 */
function nuevoArticulo(){	
	formularioNuevoArticulo();
	$('#registrar_nuevo_cliente').submit(function(evt){
		 $.ajax({
		    cache: false,
		    async: false,
		    type: 'POST',
		    data: {
		        nombre_producto: $('#nombre_producto').val(),
		        descripcion_producto: $('#descripcion_producto').val(),
		        precio_producto:$('#precio_producto').val(),
		        precio_venta_producto:$('#precio_venta_producto').val(),
		        servicio_producto: $('#servicio_producto').val()
		    },
		    url: '?action=articulos&tp=registrarArticulo',
		    dataType: 'json',
		    beforeSend: function(){
		      //$('#boton_enviar').attr('disabled', true);
		      	$('#msg_login').hide();
				$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
		    },
		    success: function(response) {
		      // Metodo 
		      //alert(response);
		      if(response.completado == true){
		      	articuloRegistradoExito(); // Metodo que se realiza para llamar cuando se registrado con exit
		      }
		    },
		    error: function(msg){
		    }
		   });
		evt.preventDefault();
	});
	$('#cancelar_formulario_cliente').click(function(){
		new Modal().closeModal();
	});
}
/**
 * Metodo encargado de mostrar el alerta con el mensaje de cliente registrado con exito
 */
function articuloRegistradoExito(){
	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Producto Registrado</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> Producto registrado con exito. </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaArticulos()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
}

/**
 * Metodo encargado de revisar validar todo los campos del fomulario de nuevo cliente
 */
function validarTodosCamposNuevoProducto(){
	validacionNoVacio('nombre_producto','msg_login','El campo <b> Nombre Producto </b> no puede estar vacio!!');
	validacionNoVacio('descripcion_producto','msg_login','El campo <b> Descripci&oacute;n </b> no puede estar vacio!!');
	validacionNoVacio('precio_producto','msg_login','El campo <b> Precio </b> no puede estar vacio!!');
	validacionNoVacio('precio_venta_producto','msg_login','El campo <b> Precio Venta </b> no puede estar vacio!!');
//	validacionNoVacio('fecha_ingreso','msg_login','El campo <b> Fecha de Ingreso </b> no puede estar vacio!!');
}

/**
 * Metodo que elimina al cliente 
 */

function  eliminarArticulo(idArticulo){
	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Producto</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion">  ¿Realmente desea eliminar el Producto?</p>';
	cadena_form  	 = cadena_form+'<input type="button" onclick="confirmarEliminarArticulo('+idArticulo+')" class="enlace_boton_lista" value="Confirmar" /> <input type="button" onclick="listaClientes()" class="enlace_boton_lista" value="Cancelar" />';
	$('#listaorders').append(cadena_form);
}

/**
 * Estos son los metodos
 */
function confirmarEliminarArticulo(idArticulo){
  $.ajax({
		url:'?action=articulos&tp=eliminarArticulo&idArticulo='+idArticulo,
		dataType:'json',
		type:'GET',
		beforeSend:function(){
			$('#listaorders').empty();
			var cadena_form="";
			cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminado Producto</h2><hr>';
			cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/ajax-loader.gif" align="absmiddle"> </p>';
			$('#listaorders').append(cadena_form);
		},
		success:function(data){
			$('#listaorders').empty();
			var cadena_form="";
			cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Producto</h2><hr>';
			cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> Se eliminino el Producto con exito </p>';
			cadena_form  	 = cadena_form+' <input type="button" onclick="listaArticulos()" class="enlace_boton_lista" value="Aceptar" />';
			$('#listaorders').append(cadena_form);
		},
		error:function(data){

		}
	});
}
