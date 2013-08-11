$.getScript("app/site/js/Validacion.js");
var datos_pieza ;
var num_pagina = 10;
$(document).on('ready', function(){
	var client  = new Cliente();
	client.init();
});
/**
 * Estas es la clase Cliente
 * encargada de manejar la informacion de los clientes
 */
function Cliente(){
	// Estas es la funcion que ejecuta la lista de los usuario
	this.init = function(){
		$('#lista_usuario').click(function(){
			listaClientes();
		});
	}
}
/**
 * Lista de cliente 
 * @return {[type]} [description]
 */
function listaClientes(){
	$('#listaorders').empty();
	$('#listaorders').append('<h2> <img src="app/site/img/listausuario.png"> Lista de Clientes </h2> <hr>');
	$('#listaorders').append('<div id="msg_correcto"></div>');
    $('#msg_correcto').fadeOut(1000);
	$('#listaorders').append('<br><a href="#" onclick="nuevoCliente()" class="enlace_boton_lista" ><img src="app/site/img/agregar_cli.png" align="absmiddle"> Agregar Nuevo Cliente </a>');
	var listaClientes = "";
	listaClientes  	  = listaClientes+'<div id="contenido_lista_clientes">';
	listaClientes     = listaClientes+'<ul id="lista_clientes_total">';
	listaClientes  	  = listaClientes+'<ul>';
	listaClientes  	  = listaClientes+'</div>';
	listaClientes  	  = listaClientes+'<div id="paginacion_clientes"></div>';
	$('#listaorders').append(listaClientes);
	$('#msg_correcto').hide();
	$.ajax({
		url:"?action=clientes&tp=listaClientes&desde=0&hasta="+num_pagina,
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		    $('#msg_correcto').empty();
			$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
		},
		success:function(data){
			$('#msg_correcto').empty();
			$.each(data, function(index, value){
 				$('#lista_clientes_total').append('<li><table><tr><td><img src="app/site/img/client.png"  align="left"></td><td><b>Nombre :</b>'+value.nombre_cliente+' '+value.apellido_cliente+' <br><b>Codigo:</b>'+value.codigo_cliente+'<br><b>Emial:</b>'+value.email_cliente+'<br> <b>Fecha Ingreso: </b>'+value.fecha_ingreso+' <br><b>Fecha Salida: </b>'+value.fecha_salida+'</td></tr></table><br><a href="#" onclick="editarCliente('+value.id_cliente+')"  class="enlace_boton_lista"><img src="app/site/img/pencil.png" height="20" title="Editar Datos de Cliente" align="absmiddle"> Editar</a>  <a href="#" onclick="eliminarCliente('+value.id_cliente+')" title="Eliminar Cliente" class="enlace_boton_lista"><img src="app/site/img/eliminar.png" height="20" align="absmiddle"> Eliminar</a>').hide().fadeIn(500); 			     
        	});
		},
		error:function(data){
		}
	});	
   // Esta seccion es para la paginacion 
  /*  $.ajax({
    	url:"?action=clientes&tp=total",
    	dataType: 'json',
    	type:'GET',
    	beforeSend:function(){

    	},
    	success:function(res){
    		var total  = res.total/num_pagina;
    		var paginacion = "<ul>";
    		for(var i=1; i <= total; i++){
    			paginacion = paginacion + "<li><a href='#' onclick='paginacion("+(i+1)+")'>"+i+"</a></li>";
    		}
    		paginacion = paginacion+"</ul>";
    		$('#paginacion_clientes').append(paginacion).hide().fadeIn(500);
    	},
    	error:function(res){

    	}
    });*/
	new Modal().show(700,550);
}
/**
 * Metodo que se encarga de hacer la paginacion del 
 */
 function paginacion(numero){
 	var desde = numero*num_pagina+1;
 	$.ajax({
		url:"?action=clientes&tp=listaClientes&desde=0&hasta="+num_pagina,
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		    $('#msg_correcto').empty();
			$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
		},
		success:function(data){
			$('#msg_correcto').empty();
			$.each(data, function(index, value){
 				$('#lista_clientes').append('<tr><td>'+value.nombre_cliente+'</td><td>'+value.apellido_cliente+'</td><td>'+value.codigo_cliente+'</td><td>'+value.email_cliente+'</td><td>'+value.fecha_ingreso+'</td><td>'+value.fecha_salida+'</td><td><a href="#" onclick="editarCliente('+value.id_cliente+')"  class="enlace_boton_lista"><img src="app/site/img/pencil.png" height="20" title="Editar Datos de Cliente" align="absmiddle"> Editar</a> <a href="#" onclick="eliminarCliente('+value.id_cliente+')" title="Eliminar Cliente" class="enlace_boton_lista"><img src="app/site/img/eliminar.png" height="20" align="absmiddle"> Eliminar</a></td></tr>'); 			     
        	});
		},
		error:function(data){
		}
	});	
 }
/**
 * Este es el metodo para editar
 */
 function editarCliente(idCliente){
 	$('#listaorders').empty();	
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/agregar_cli.png"> Editar Cliente</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<div id="contenido_nuevo_usuario"><form id="actualizar_nuevo_cliente">';
	cadena_form  	 = cadena_form+'<table> <tr><td><label>Nombre (s): </label></td><td><input type="text" value="" id="nombre_cliente"></td> <td><label>Apellido (s): </label></td><td><input type="text" value="" id="apellido_cliente"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>CI: </label></td><td><input type="text" value="" id="ci_cliente"></td> <td><label>Correo: </label></td><td><input type="email" value="" id="correo_cliente"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Telf./Cel.: </label></td><td><input type="number" value="" id="telf_cliente"></td><td><label>Direcci&oacute;n: </label></td><td><textarea id="dir_cliente"> </textarea></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Ciudad:</label></td><td><select id="ciudad_cliente"><option value="CBBA">Cochabamba</option><option value="STC">Santa Cruz</option><option value="LP">La Paz</option></select></td><td><label>Titulo: </label></td><td><select id="titulo_cliente"><option value="Sr">Señor</option><option value="Sra">Señora</option></select></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Pieza:</label></td><td><select id="pieza_cliente"></select></td><td><label></label></td><td></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Fecha Ingreso:</label></td><td><input type="text" id="fecha_ingreso" placeholder="0000-00-00"></td><td><label>Fecha Salida:</label></td><td><input type="text" id="fecha_salida" placeholder="0000-00-00"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Registrar" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista" onclick="listaClientes()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form></div>';
	$('#listaorders').append(cadena_form);
	$.ajax({
		url:"?action=piezas&tp=listaPiezas",
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		},
		success:function(data){
			console.log(data)
			$.each(data, function(index, value){
 				$('#pieza_cliente').append('<option value="'+value.id_pieza+'">'+value.nombre_pieza+'</option>'); 			     
        	 });
		},
		error:function(data){
		}
	});	
	
	$('#msg_login').hide();	
	validarTodosCamposNuevoCliente();
	$.ajax({
		url:"?action=clientes&tp=datosCliente&idCliente="+idCliente,
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		},
		success:function(data){
			$('#nombre_cliente').val(data.nombre_cliente);
			$('#id_cliente').val(data.id_cliente);
			$('#apellido_cliente').val(data.apellido_cliente);
			$('#ci_cliente').val(data.ci_cliente);
			$('#correo_cliente').val(data.email_cliente);
			$('#telf_cliente').val(data.telefono_cliente);
			$('#dir_cliente').val(data.direccion_cliente);
			$("#ciudad_cliente option[value='"+data.ciudad_cliente+"']").attr("selected","selected");
			$("#titulo_cliente option[value='"+data.titulo_cliente+"']").attr("selected","selected");
			$("#pieza_cliente option[value='"+data.id_pieza+"']").attr("selected","selected");
			$("#fecha_ingreso").val(data.fecha_ingreso);
			$("#fecha_salida").val(data.fecha_ingreso);
		},
		error:function(data){
		}
	});
	$('#actualizar_nuevo_cliente').submit(function(evt){
		 $.ajax({
		    cache: false,
		    async: false,
		    type: 'POST',
		    data: {
			    nombre_cliente: $('#nombre_cliente').val(),
			    apellido_cliente: $('#apellido_cliente').val(),
			    ci_cliente: $('#ci_cliente').val(),
			    correo_cliente:$('#correo_cliente').val(),
			    telf_cliente: $('#telf_cliente').val(),
			    dir_cliente: $('#dir_cliente').val(),
			    ciudad_cliente:$('#ciudad_cliente').val(),
			    titulo_cliente:$('#titulo_cliente').val(),
			    pieza_cliente:$('#pieza_cliente').val(),
			    id_cliente:$('#id_cliente').val(),
			    fecha_ingreso:$('#fecha_ingreso').va(),
			    fecha_salida:$('#fecha_salida').val()
		    },
		    url: '?action=clientes&tp=actualizarCliente',
		    dataType: 'json',
		    beforeSend: function(){
		      //$('#boton_enviar').attr('disabled', true);
		      	$('#msg_login').hide();
				$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
		    },
		    success: function(response) {
		      // Metodo 
		      if(response.completado==true){
		      	 clienteActualizadoExito(); // Metodo que se realiza para llamar cuando se registrado con exito
		      }
		    },
		    error: function(msg){
		       // $('#boton_enviar').attr('disabled', false);
		    }
		   });
		evt.preventDefault();
	});
	$('#fecha_ingreso').datepicker({dateFormat: 'yy-mm-dd'});
	$('#fecha_salida').datepicker({dateFormat: 'yy-mm-dd'});
	new Modal().show(750,550);
 }
/**
 * Esta es la funsion que se ejecuta 
 */
function clienteActualizadoExito(){
	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Cliente Actualizado</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> Los datos del cliente han sido actualizados con exito!! </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaClientes()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
}
/**
 * Esta es la funcion que ejcuta el formulario de nuevo cliente
 * 
 */
function formularioNuevoCliente(){
	$('#listaorders').empty();	
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/agregar_cli.png"> Nuevo Cliente</h2><hr>';
	cadena_form  	 = cadena_form+'<div id="msg_correcto"></div>';
	cadena_form  	 = cadena_form+'<div id="msg_login"></div>';
	cadena_form  	 = cadena_form+'<div id="contenido_nuevo_usuario"><form id="registrar_nuevo_cliente">';
	cadena_form  	 = cadena_form+'<table> <tr><td><label>Nombre (s): </label></td><td><input type="text" value="" id="nombre_cliente"></td> <td><label>Apellido (s): </label></td><td><input type="text" value="" id="apellido_cliente"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>CI: </label></td><td><input type="text" value="" id="ci_cliente"></td> <td><label>Correo: </label></td><td><input type="email" value="" id="correo_cliente"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Telf./Cel.: </label></td><td><input type="number" value="" id="telf_cliente"></td><td><label>Direcci&oacute;n: </label></td><td><textarea id="dir_cliente"> </textarea></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Ciudad:</label></td><td><select id="ciudad_cliente"><option value="CBBA">Cochabamba</option><option value="STC">Santa Cruz</option><option value="LP">La Paz</option></select></td><td><label>Titulo: </label></td><td><select id="titulo_cliente"><option value="Sr">Señor</option><option value="Sra">Señora</option></select></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Pieza:</label></td><td><select id="pieza_cliente"></select></td><td><label></label></td><td></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td><label>Fecha Ingreso:</label></td><td><input type="text" id="fecha_ingreso" placeholder="0000-00-00"></td><td><label>Fecha Salida:</label></td><td><input type="text" id="fecha_salida" placeholder="0000-00-00"></td></tr>';
	cadena_form  	 = cadena_form+'<tr><td></td><td><input type="submit" value="Registrar" class="enlace_boton_lista"></td><td></td><td><input type="button" value="Cancelar" class="enlace_boton_lista" onclick="listaClientes()"></td></tr></table>';
	cadena_form  	 = cadena_form+'</form></div>';
	$('#listaorders').append(cadena_form);
	$.ajax({
		url:"?action=piezas&tp=listaPiezas",
		dataType:"json",
		type:"GET",
		beforeSend:function(){
		},
		success:function(data){
			//console.log(data)
			$.each(data, function(index, value){
 				  	$('#pieza_cliente').append('<option value="'+value.id_pieza+'">'+value.nombre_pieza+'</option>'); 			     

        	 });
		},
		error:function(data){
		}
	});	
	$('#msg_login').hide();	
	validarTodosCamposNuevoCliente();
	$('#fecha_ingreso').datepicker({dateFormat: 'yy-mm-dd'});
	$('#fecha_salida').datepicker({dateFormat: 'yy-mm-dd'});
	new Modal().show(750,550);
}
/**
 * Nueva para 
 * @return {[type]} [description]
 */
function nuevoCliente(){	
	formularioNuevoCliente();
	$('#registrar_nuevo_cliente').submit(function(evt){
		 $.ajax({
		    cache: false,
		    async: false,
		    type: 'POST',
		    data: {
		        nombre_cliente: $('#nombre_cliente').val(),
		        apellido_cliente: $('#apellido_cliente').val(),
		        ci_cliente:$('#ci_cliente').val(),
		        correo_cliente:$('#correo_cliente').val(),
		        telf_cliente: $('#telf_cliente').val(),
		        dir_cliente: $('#dir_cliente').val(),
		        ciudad_cliente:$('#ciudad_cliente').val(),
		        titulo_cliente:$('#titulo_cliente').val(),
		        pieza_cliente:$('#pieza_cliente').val(),
		        fecha_ingreso:$('#fecha_ingreso').val(),
		        fecha_salida:$('#fecha_salida').val()
		    },
		    url: '?action=clientes&tp=registrarCliente',
		    dataType: 'json',
		    beforeSend: function(){
		      //$('#boton_enviar').attr('disabled', true);
		      	$('#msg_login').hide();
				$('#msg_correcto').append('<img src="app/site/img/ajax-loader.gif" align="absmiddle">').hide().fadeIn(1000);
		    },
		    success: function(response) {
		      // Metodo 
		      if(response.completado==true){
		      	clienteRegistradoExito(); // Metodo que se realiza para llamar cuando se registrado con exito
				/*listaClientes();*/
				/*$('#contenido_nuevo_usuario').empty();
		      	$('#msg_correcto').append('<img src="app/site/img/bien.png" align="absmiddle"> El Cliente a sido registrado con exito.<br>').hide().fadeIn(500);
				$('#msg_correcto').fadeOut(3000);**/
		      }
		    },
		    error: function(msg){
		     // $('#boton_enviar').attr('disabled', false);
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
function clienteRegistradoExito(){
	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form="";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Cliente Registrado</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> El cliente ha sido registrado con exito. </p>';
	cadena_form  	 = cadena_form+' <input type="button" onclick="listaClientes()" class="enlace_boton_lista" value="Aceptar" />';
	$('#listaorders').append(cadena_form);
}

/**
 * Metodo encargado de revisar validar todo los campos del fomulario de nuevo cliente
 */
function validarTodosCamposNuevoCliente(){
	validacionNoVacio('nombre_cliente','msg_login','El campo <b> Nombre </b> no puede estar vacio!!');
	validacionNoVacio('apellido_cliente','msg_login','El campo <b> Apellido </b> no puede estar vacio!!');
	validacionNoVacio('ci_cliente','msg_login','El campo <b> CI </b> no puede estar vacio!!');
	validacionNoVacio('correo_cliente','msg_login','El campo <b> Correo </b> no puede estar vacio!!');
	validacionNoVacio('telf_cliente','msg_login','El campo <b> Telefono </b> no puede estar vacio!!');
	validacionNoVacio('dir_cliente','msg_login','El campo <b> Direccion </b> no puede estar vacio!!');
	validacionNoVacio('ciudad_cliente','msg_login','El campo <b> Ciudad </b> no puede estar vacio!!');
	validacionNoVacio('titulo_cliente','msg_login','El campo <b> Titulo </b> no puede estar vacio!!');
//	validacionNoVacio('fecha_ingreso','msg_login','El campo <b> Fecha de Ingreso </b> no puede estar vacio!!');
}

/**
 * Metodo que elimina al cliente 
 */

function  eliminarCliente(idCliente){
	$('#listaorders').empty();
	new Modal().show(525,180);
	var cadena_form  = "";
	cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Cliente</h2><hr>';
	cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion">  ¿Realmente desea eliminar el cliente?</p>';
	cadena_form  	 = cadena_form+'<input type="button" onclick="confirmarEliminarCliente('+idCliente+')" class="enlace_boton_lista" value="Confirmar" /> <input type="button" onclick="listaClientes()" class="enlace_boton_lista" value="Cancelar" />';
	$('#listaorders').append(cadena_form);
}

/**
 * Estos son los metodos
 */
function confirmarEliminarCliente(idCliente){
  $.ajax({
		url:'?action=clientes&tp=eliminarCliente&idCliente='+idCliente,
		dataType:'json',
		type:'GET',
		beforeSend:function(){
			$('#listaorders').empty();
			var cadena_form="";
			cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Cliente</h2><hr>';
			cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/ajax-loader.gif" align="absmiddle"> </p>';
			$('#listaorders').append(cadena_form);
		},
		success:function(data){
			$('#listaorders').empty();
			var cadena_form="";
			cadena_form  	 = cadena_form+'<h2><img src="app/site/img/inf.png" align="absmiddle"> Eliminar Cliente</h2><hr>';
			cadena_form  	 = cadena_form+'<p id="id_mensaje_confirmacion"> <img src="app/site/img/bien.png" align="absmiddle"> Se eliminino el cliente con exito </p>';
			cadena_form  	 = cadena_form+' <input type="button" onclick="listaClientes()" class="enlace_boton_lista" value="Aceptar" />';
			$('#listaorders').append(cadena_form);
		},
		error:function(data){

		}
	});
}
