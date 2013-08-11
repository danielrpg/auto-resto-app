$(document).on('ready', function(){
	var servicio  = new Servicio();
	servicio.init();
});

function Servicio(){
	// Esta es la funcion que ejecuta el ini de piezas
	this.init = function(){
		$('#lista_servicios').click(function(){
			listaServicio();
		});
	}
}
/*
 * Esta es la lista de la piezas
 * @param la lista de las piezas
 */
function listaServicio(){
	$('#listaorders').empty();
	$('#listaorders').append('<h2> <img src="app/site/img/servicios.png">Lista de Servicios </h2> <hr>');
	$('#listaorders').append('<div id="msg_correcto"></div>');
    $('#msg_correcto').fadeOut(1000);
	$('#listaorders').append('<a href="#" onclick="nuevoServicio()" class="enlace_boton_lista"> <img src="app/site/img/servicios.png" align="absmiddle" height="20"> Nuevo Servicio</a>');
	var listaServicio   = "";
	listaServicio  	  = listaServicio+'<div id="contenido_lista_servicio">';
	listaServicio       = listaServicio+'<ul id="lista_clientes_total">';
	listaServicio  	  = listaServicio+'</table>';
	listaServicio  	  = listaServicio+'</div>';
	$('#listaorders').append(listaServicio);
	$.ajax({
		url:"?action=servicios&tp=listaServicios",
		dataType:"json",
		type:"GET",
		beforeSend:function(){
			    $('#msg_correcto').empty();
				$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle"> Cargando..').hide().fadeIn(1000);
		},
		success:function(data){
			$('#msg_correcto').empty();
			$.each(data, function(index, value){
 				$('#lista_clientes_total').append('<li><table><tr><td><img src="app/site/img/hab.jpg"  align="left" class="imagen_pieza"></td><td><b>Nombre: </b>'+value.nombre_servicio+'<br><b>Detalle: </b>'+value.detalle_servicio+'<br><b>Codigo: </b>'+value.codigo_servicio+'</td></tr></table><br><a href="#" onclick="editarServicio('+value.id_servicio+')"  class="enlace_boton_lista" style="margin-left:100px;"><img src="app/site/img/pencil.png" height="20" title="Editar Datos de Cliente" align="absmiddle"> Editar</a> <a href="#" onclick="eliminarServicio('+value.id_servicio+')" title="Eliminar Cliente" class="enlace_boton_lista"><img src="app/site/img/eliminar.png" height="20" align="absmiddle"> Eliminar</a></li>').hide().fadeIn(500); 			     
        	});
		},
		error:function(data){
		}
	});	
	new Modal().show(670,550);
}
/**
 * Metodo que permite eliminar una pieza
 */
 function editarServicio(idServicio){
 	$('#listaorders').empty();
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/servicios.png"> Actualizar Servicio</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<form id="actualizar_servicio">';
	cadena_form  	 = cadena_form+'<table>';
	cadena_form  	 = cadena_form+'<tr> <td><label>Nombre:</label> </td><td><input type="text" id="nombre_servicio"><input type="hidden" id="id_servicio"></td><td><label>Descripci&oacute;n:</label></td><td> <textarea id="descripcion_servicio"> </textarea></td></tr>';
	cadena_form  	 = cadena_form+'<tr> <td><label>Codigo:</label> </td><td><input type="text" id="codigo_servicio"></td><td></td><td> </td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Actualizar Servicio" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista"  onclick="listaServicio()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form>';
	$('#listaorders').append(cadena_form);
	$('#msg_login').hide();
	validarTodosCamposNuevoProducto();
	$.ajax({
		url:'?action=servicios&tp=getServicio&idServicio='+idServicio,
		type:'GET',
		dataType:'json',
		beforeSend:function(){
		},
		success:function(res){
			$('#id_servicio').val(res.id_servicio);
			$('#nombre_servicio').val(res.nombre_servicio);
			$('#descripcion_servicio').val(res.detalle_servicio);
			$('#codigo_servicio').val(res.codigo_servicio);
		},
		error:function(){

		}
	});
	new Modal().show(700,300);
	/// Este es el evento que se ejecuta cuando el formulario ha sido enviado
	$('#actualizar_servicio').submit(function(evt){
		$('#msg_login').empty();
		if($('#nombre_servicio').val() == ""){
			$('#msg_login').append('<p> <img src="app/site/img/inf.png" align="absmiddle"> El campo nombre de la pieza no puede estar vacio !!</p>').hide().fadeIn(1000);	
		}else{
			$.ajax({
				url: "?action=servicios&tp=actualizarServicio",
				dataType: 'json',
				type: 'POST',
				data: {
		      		id_servicio: $('#id_servicio').val(),
		      		nombre_servicio: $('#nombre_servicio').val(),
		      		descripcion_servicio: $('#descripcion_servicio').val(),
		      		codigo_servicio: $('#codigo_servicio').val()
		    	},
				beforeSend: function(){
					$('#msg_login').hide();
					$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
				},
				success: function(data){
					if(data.completado == true){
						servicioActualizadaExito();
					}
				},
				error: function(data){

				}
			});
		}
		evt.preventDefault();
	});
 }
/**
 * Metodo que se encarga de actualizar el la pieza
 */
 function servicioActualizadaExito(){
 	 $('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Servicio Actualizado</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> Los datos del servicio fueron actualizados con exito. </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaServicio()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
 }
/**
 * Metodo que permite elimienar a la pieza
 */
 function eliminarServicio(idServicio){
 	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Servicio</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion">  ¿Realmente desea eliminar el servicio?</p>';
	cadena_form  	 = cadena_form+'<input type="button" onclick="confirmarEliminarServicio('+idServicio+')" class="enlace_boton_lista" value="Confirmar" /> <input type="button" onclick="listaServicio()" class="enlace_boton_lista" value="Cancelar" />';
	$('#listaorders').append(cadena_form);
 }

/**
 * Metodo que elimina las piezas
 */
 function confirmarEliminarServicio(idServicio){
 	$.ajax({
		url:'?action=servicios&tp=eliminarServicio&idServicio='+idServicio,
		dataType:'json',
		type:'GET',
		beforeSend:function(){
			$('#listaorders').empty();
			var cadena_form="";
			cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/ajax-loader.gif" align="absmiddle"> </p>';
			$('#listaorders').append(cadena_form);
		},
		success:function(data){
			if(data.completado == true){
				servicioEliminadoExito();
			}
		},
		error:function(data){

		}
	});
 }
/**
 * Metodo que permite eliminar la pieza
 */
 function servicioEliminadoExito(){
	$('#listaorders').empty();
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Servicio Eliminado</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> El servicio se ha eliminado con exito </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaServicio()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
 }
/**
 * Esta es la funcion que ejecuta el nuevo formulario
 * @param nuevoCliente
 */
function nuevoServicio(){
	$('#listaorders').empty();
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/servicios.png"> Nuevo Servicio</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<form id="registrar_nuevo_pieza">';
	cadena_form  	 = cadena_form+'<table>';
	cadena_form  	 = cadena_form+'<tr> <td><label>Nombre:</label> </td><td><input type="text" id="nombre_servicio"></td><td><label>Descripci&oacute;n:</label></td><td> <textarea id="descripcion_servicio"> </textarea></td></tr>';
	cadena_form  	 = cadena_form+'<tr> <td><label>Codigo:</label> </td><td><input type="text" id="codigo_servicio"></td><td></td><td> </td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Registrar" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista"  onclick="listaServicio()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form>';
	$('#listaorders').append(cadena_form);
	$('#msg_login').hide();
	//new Modal().show(700,550);
	validarTodosCamposNuevoProducto();
	 /** 
	  * Este es el metodo que registra la nueva pieza
	  */
	$('#registrar_nuevo_pieza').submit(function(evt){
		$('#msg_login').empty();
		if($('#nombre_servicio').val() == ""){
			$('#msg_login').append('<p> <img src="app/site/img/inf.png" align="absmiddle"> El campo Nombre de Servicio no puede estar vacio !!</p>').hide().fadeIn(1000);	
		}else{
			$.ajax({
				cache: false,
		    	async: false,
		    	type: 'POST',
			    data: {
			        nombre_servicio: $('#nombre_servicio').val(),
			        descripcion_servicio: $('#descripcion_servicio').val(),
			        codigo_servicio:$('#codigo_servicio').val()
			    },
			    url: '?action=servicios&tp=registrarServicio',
				dataType: 'json',
				beforeSend: function(){
					$('#msg_login').hide();
					$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
				},
				success: function(data){
					if(data.completado == true){
						servicioRegistradaExito();
					}
					
				},
				error: function(data){
				}
			});
		}
		evt.preventDefault();
	});

	new Modal().show(700,350);	
}

/**
 * Metodo que se ejecuta cuando la pieza se ha registrado con piezaRegistradaExito
 */
 function servicioRegistradaExito(){
 	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Servicio Registrada</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> El Servicio ha sido registrada con exito. </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaServicio()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
 }
 function validarTodosCamposNuevoProducto(){
	validacionNoVacio('nombre_servicio','msg_login','El campo <b> Nombre Servicio </b> no puede estar vacio!!');
	validacionNoVacio('descripcion_servicio','msg_login','El campo <b> Descripci&oacute;n </b> no puede estar vacio!!');
	validacionNoVacio('codigo_servicio','msg_login','El campo <b> Codigo </b> no puede estar vacio!!');
//	validacionNoVacio('fecha_ingreso','msg_login','El campo <b> Fecha de Ingreso </b> no puede estar vacio!!');
}