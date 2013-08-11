$(document).on('ready', function(){
	var pieza  = new Pieza();
	pieza.init();
});

function Pieza(){
	// Esta es la funcion que ejecuta el ini de piezas
	this.init = function(){
		$('#lista_piezas').click(function(){
			listaPiezas();
		});
	}
}
/*
 * Esta es la lista de la piezas
 * @param la lista de las piezas
 */
function listaPiezas(){
	$('#listaorders').empty();
	$('#listaorders').append('<h2> <img src="app/site/img/piezas.png">Piezas </h2> <hr>');
	$('#listaorders').append('<div id="msg_correcto"></div>');
    $('#msg_correcto').fadeOut(1000);
	$('#listaorders').append('<a href="#" onclick="nuevaPieza()" class="enlace_boton_lista"> <img src="app/site/img/piezas.png" align="absmiddle" height="20"> Nueva Pieza</a>');
	var listaPiezas   = "";
	listaPiezas  	  = listaPiezas+'<div id="contenido_lista_piezas">';
	listaPiezas       = listaPiezas+'<ul id="lista_clientes_total">';
	listaPiezas  	  = listaPiezas+'</table>';
	listaPiezas  	  = listaPiezas+'</div>';
	$('#listaorders').append(listaPiezas);
	$.ajax({
		url:"?action=piezas&tp=listaPiezas",
		dataType:"json",
		type:"GET",
		beforeSend:function(){
			    $('#msg_correcto').empty();
				$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle"> Cargando..').hide().fadeIn(1000);
		},
		success:function(data){
			$('#msg_correcto').empty();
			$.each(data, function(index, value){
 				$('#lista_clientes_total').append('<li><table><tr><td><img src="app/site/img/hab.jpg"  align="left" class="imagen_pieza"></td><td><b>Tipo:</b>'+value.seccion_pieza+'<br><b>Nombre:</b>'+value.nombre_pieza+'<br><b>Descripci&oacute;n</b>'+value.descripcion_pieza+'</td></tr></table><br><a href="#" onclick="editarPieza('+value.id_pieza+')"  class="enlace_boton_lista" style="margin-left:100px;"><img src="app/site/img/pencil.png" height="20" title="Editar Datos de Cliente" align="absmiddle"> Editar</a> <a href="#" onclick="eliminarPieza('+value.id_pieza+')" title="Eliminar Cliente" class="enlace_boton_lista"><img src="app/site/img/eliminar.png" height="20" align="absmiddle"> Eliminar</a></li>').hide().fadeIn(500); 			     
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
 function editarPieza(id_pieza){
 	$('#listaorders').empty();
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/piezas.png"> Nueva Pieza</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<form id="actualizar_pieza">';
	cadena_form  	 = cadena_form+'<table><tr><td><label>Tipo de Pieza:</label></td><td><select id="seccion_pieza"><option value="Simple">Simple</option><option value="Doble">Doble</option><option value="Triple">Triple</option><option value="Matrimonial">Matrimonial</option> </select></td> <td><label>Nombre Pieza: </label></td><td><input type="text" value="" id="nombre_pieza"> <input type="hidden" id="id_pieza"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Descripci&oacute;n:</label></td><td> <textarea id="descripcion_pieza"> </textarea></td> <td></td><td></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Actualizar" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista"  onclick="listaPiezas()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form>';
	$('#listaorders').append(cadena_form);
	$('#msg_login').hide();
	$('#nombre_pieza').blur(function(){
		if($('#nombre_pieza').val()==""){
			$('#msg_login').append('<p> <img src="app/site/img/inf.png" align="absmiddle"> El campo nombre no puede estar vacio !!</p>').hide().fadeIn(1000);	
		}else{
			$('#msg_login').empty();
			$('#msg_login').hide();
		}
	});
	$.ajax({
		url:'?action=piezas&tp=getPieza&idPieza='+id_pieza,
		type:'GET',
		dataType:'json',
		beforeSend:function(){

		},
		success:function(res){
			$('#id_pieza').val(res.id_pieza);
			$('#seccion_pieza option[value="'+res.seccion_pieza+'"]').attr("selected","selected");
			$('#nombre_pieza').val(res.nombre_pieza);
			$('#descripcion_pieza').val(res.descripcion_pieza);
		},
		error:function(){

		}
	});
	new Modal().show(700,300);
	/// Este es el evento que se ejecuta cuando el formulario ha sido enviado
	$('#actualizar_pieza').submit(function(evt){
		$('#msg_login').empty();
		if($('#nombre_pieza').val() == ""){
			$('#msg_login').append('<p> <img src="app/site/img/inf.png" align="absmiddle"> El campo nombre de pieza no puede estar vacio !!</p>').hide().fadeIn(1000);	
		}else{
			$.ajax({
				url: "?action=piezas&tp=actualizarPieza",
				dataType: 'json',
				type: 'POST',
				data: {
		      		seccion_pieza: $('#seccion_pieza').val(),
		      		nombre_pieza: $('#nombre_pieza').val(),
		      		descripcion_pieza: $('#descripcion_pieza').val(),
		      		id_pieza: $('#id_pieza').val()
		    	},
				beforeSend: function(){
					$('#msg_login').hide();
					$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
				},
				success: function(data){
					if(data.completado == true){
						piezaActualizadaExito();
					}
				},
				error: function(data){

				}
			});
		}
		//return false;
		evt.preventDefault();
	});
 }
/**
 * Metodo que se encarga de actualizar el la pieza
 */
 function piezaActualizadaExito(){
 	 $('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Pieza Registrada</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> Los datos de la pieza fueron actualizados con exito. </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaPiezas()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
 }
/**
 * Metodo que permite elimienar a la pieza
 */
 function eliminarPieza(idPieza){
 	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Pieza</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion">  ¿Realmente desea eliminar la Pieza?</p>';
	cadena_form  	 = cadena_form+'<input type="button" onclick="confirmarEliminarPieza('+idPieza+')" class="enlace_boton_lista" value="Confirmar" /> <input type="button" onclick="listaPiezas()" class="enlace_boton_lista" value="Cancelar" />';
	$('#listaorders').append(cadena_form);
 }

/**
 * Metodo que elimina las piezas
 */
 function confirmarEliminarPieza(idPieza){
 	$.ajax({
		url:'?action=piezas&tp=eliminarPieza&idPieza='+idPieza,
		dataType:'json',
		type:'GET',
		beforeSend:function(){
			$('#listaorders').empty();
			var cadena_form="";
			cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Pieza</h2><hr>';
			cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/ajax-loader.gif" align="absmiddle"> </p>';
			$('#listaorders').append(cadena_form);
		},
		success:function(data){
			if(data.completado == true){
				piezaEliminada();
			}
		},
		error:function(data){

		}
	});
 }
/**
 * Metodo que permite eliminar la pieza
 */
 function piezaEliminada(){
	$('#listaorders').empty();
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Pieza Eliminada</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> La pieza se ha eliminado con exito </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaPiezas()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
 }
/**
 * Esta es la funcion que ejecuta el nuevo formulario
 * @param nuevoCliente
 */
function nuevaPieza(){
	$('#listaorders').empty();
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/piezas.png"> Nueva Pieza</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<form id="registrar_nuevo_pieza">';
	cadena_form  	 = cadena_form+'<table> <tr><td><label>Tipo de Pieza:</label></td><td><select id="seccion_pieza"><option value="Simple">Simple</option><option value="Doble">Doble</option><option value="Triple">Triple</option><option value="Matrimonial">Matrimonial</option> </select></td> <td><label>Nombre Pieza: </label></td><td><input type="text" value="" id="nombre_pieza"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Descripci&oacute;n:</label></td><td> <textarea id="descripcion_pieza"> </textarea></td> <td></td><td></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Registrar" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista"  onclick="listaPiezas()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form>';
	$('#listaorders').append(cadena_form);
	$('#msg_login').hide();
	//new Modal().show(700,550);
	$('#nombre_pieza').blur(function(){
		if($('#nombre_pieza').val()==""){
			$('#msg_login').empty();
			$('#msg_login').append('<p> <img src="app/site/img/inf.png" align="absmiddle"> El campo nombre no puede estar vacio !!</p>').hide().fadeIn(1000);	
		}else{
			$('#msg_login').empty();
			$('#msg_login').hide();
		}
	});

	 /** 
	  * Este es el metodo que registra la nueva pieza
	  */

	$('#registrar_nuevo_pieza').submit(function(evt){
		$('#msg_login').empty();
		if($('#nombre_pieza').val() == ""){
			$('#msg_login').append('<p> <img src="app/site/img/inf.png" align="absmiddle"> El campo nombre de pieza no puede estar vacio !!</p>').hide().fadeIn(1000);	
		}else{
			$.ajax({
				url: "?action=piezas&tp=registrar&seccion="+$('#seccion_pieza').val()+'&nombre='+$('#nombre_pieza').val()+'&descripcion_pieza='+$('#descripcion_pieza').val(),
				dataType: 'json',
				type: 'GET',
				beforeSend: function(){
					$('#msg_login').hide();
					$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
				},
				success: function(data){
					if(data.completado == true){
						piezaRegistradaExito();
					}
					
				},
				error: function(data){
				}
			});
		}
		//return false;
		evt.preventDefault();
	});
	new Modal().show(700,350);	
}

/**
 * Metodo que se ejecuta cuando la pieza se ha registrado con piezaRegistradaExito
 */
 function piezaRegistradaExito(){
 	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Pieza Registrada</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> La pieza ha sido registrada con exito. </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaPiezas()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
 }