function validacionNoVacio(divcampo,divmensaje, mensaje){
	var res = false;
	$('#'+divcampo).blur(function() {
		if($.trim($('#'+divcampo).val()) == ""){
			$('#'+divmensaje).empty();
			$('#'+divmensaje).append('<p> <img src="app/site/img/inf.png" align="absmiddle"> '+mensaje+'</p>').hide().fadeIn(1000);
			res = false
		}else{
			$('#'+divmensaje).empty();
			$('#'+divmensaje).fadeOut(1000);
			res = true;
		}
	});
	return res;
}
