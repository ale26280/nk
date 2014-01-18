/// circuito carga el formulario si tien conexion va a la db sino guarda en local storage. Cuando envia si es correcto se de debe fijar si hay registros en local storage si los hay actualiza.

jQuery(document).ready(function($) {

	compruebaDbLocal()
});

$('#agrega').on('click',function(){
	$("#response").hide();
	$("#gracias").hide();
	if($("#nombre").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Nombre requerido');
		$("#response").show().delay(800).fadeOut();
	}else if($("#apellido").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Apellido requerido');
		$("#response").show().delay(800).fadeOut();
	}else if($("#dia").val()=="" || $("#mes").val()=="" || $("#ano").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Fecha errónea');
		$("#response").show().delay(800).fadeOut();
	}else if($("#telefono").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Tel&eacute;fono requerido');
		$("#response").show().delay(800).fadeOut();;
	}else if($("#dni").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Dni requerido');
		$("#response").show().delay(800).fadeOut();;
	}else if($("#correo").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Correo requerido');
		$("#response").show().delay(800).fadeOut();;
	}else if($("#correo").val().indexOf("@")==-1 || $("#correo").val().indexOf(".")==-1){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Mail incorrecto');
		$("#correo").val('')
		$("#response").show().delay(800).fadeOut();
	}else if($("#operador").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Seleccione un Operador');
		$("#response").show().delay(800).fadeOut();;
	}else if($("#modelo").val()==""){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Modelo requerido');
		$("#response").show().delay(800).fadeOut();;
	}else if(!$('#bases').is(':checked')){
		$("#response").css({'background-color': 'red'});
		$("#response").html('Debe aceptar las bases');
		$("#response").show().delay(800).fadeOut();;
	}else{
		
		prendeCarga();
			
		$.post('ingresa.php', {	
			nombre: $('#nombre').val(),
			apellido: $('#apellido').val(),
			dia: $('#dia').val(),
			mes: $('#mes').val(),
			ano: $('#ano').val(),
			telefono: $('#telefono').val(),
			dni: $('#dni').val(),
			correo: $('#correo').val(),
			operador: $('#operador').val(),
			modelo: $('#modelo').val()
		},function(data){					
			console.log(data);					
			// 1 sie s correcto limpia formulario si devuelve error carga en local storage
			if(data==2){
		
				agregaLS($("#nombre").val(), $("#apellido").val(), ($("#dia").val()+'-'+$("#mes").val()+'-'+$("#ano").val()),$("#telefono").val(),$("#dni").val(),$("#correo").val(),$("#operador").val(),$("#modelo").val())
				
			}else{
				compruebaDbLocal()//comprueba si hay registros que cargar
			}
			
			resetForm()
								
		}).error(function() { 
			
			agregaLS($("#nombre").val(), $("#apellido").val(), ($("#dia").val()+'-'+$("#mes").val()+'-'+$("#ano").val()),$("#telefono").val(),$("#dni").val(),$("#correo").val(),$("#operador").val(),$("#modelo").val())
		
			resetForm() 
		
		})
	

	
	
	}
	
})

///////////////////////////////////////////////////////////
///////////////// WEB DB //////////////////////////////////
///////////////////////////////////////////////////////////


function agregaLS(nombre,apellido,dia,mes,ano,telefono,dni,correo){
	
	localStorage.setItem(''+dni+'', nombre+'-'+apellido+'-'+dia+'-'+mes+'-'+ano+'-'+telefono+'-'+dni+'-'+correo)
}




function compruebaDbLocal(){
	//myData.webdb.getAllItems(recorre);
	if(localStorage.length>0){
	for(var key in localStorage) {
  console.log(localStorage.getItem(key));
  
  v = localStorage.getItem(key).split('-');
  
 
 
     
    $.post('ingresa.php', {	
			nombre: v[0],
			apellido: v[1],
			dia: v[2],
			mes: v[3],
			ano: v[4],
			telefono: v[5],
			dni: v[6],
			correo: v[7],
			operador: v[8],
			modelo: v[9]
		},function(data){					
			console.log(data);					
			// 1 sie s correcto limpia formulario si devuelve error carga en local storage
			/*
if(data==2){
				myData.webdb.addData($("#nombre").val(), $("#apellido").val(), ($("#dia").val()+'-'+$("#mes").val()+'-'+$("#ano").val()),$("#telefono").val(),$("#dni").val(),$("#correo").val(),$("#operador").val(),$("#modelo").val());
				//console.log('es');
			}else{
				
*/
			})
  
  
  
  
  
  
}
}
	
}


function recorre(tx, rs){
	if(rs.rows.length<1){
       console.log('vacio');
	   
	   }else{    
    
		   for (var i=0; i < rs.rows.length; i++) {
     // console.log(rs.rows.item(i).nombre+'-'+rs.rows.item(i).apellido+'-'+rs.rows.item(i).fechaNacimiento+'-'+rs.rows.item(i).telefono+'-'+rs.rows.item(i).dni+'-'+rs.rows.item(i).correo+'-'+rs.rows.item(i).operador+'-'+rs.rows.item(i).modelo);
    
    
    $.post('ingresa.php', {	
			nombre: rs.rows.item(i).nombre,
			apellido: rs.rows.item(i).apellido,
			dia: rs.rows.item(i).fechaNacimiento,
			mes: rs.rows.item(i).fechaNacimiento,
			ano: rs.rows.item(i).fechaNacimiento,
			telefono: rs.rows.item(i).telefono,
			dni: rs.rows.item(i).dni,
			correo: rs.rows.item(i).correo,
			operador: rs.rows.item(i).operador,
			modelo: rs.rows.item(i).modelo
		},function(data){					
			console.log(data);					
			// 1 sie s correcto limpia formulario si devuelve error carga en local storage
			/*
if(data==2){
				myData.webdb.addData($("#nombre").val(), $("#apellido").val(), ($("#dia").val()+'-'+$("#mes").val()+'-'+$("#ano").val()),$("#telefono").val(),$("#dni").val(),$("#correo").val(),$("#operador").val(),$("#modelo").val());
				//console.log('es');
			}else{
				
*/
			})
		
		}	

}

}



function resetForm(){
	
			$("#nombre").val('');
			$("#apellido").val('');
			$("#dia").val('');
			$("#mes").val('');
			$("#ano").val('');
			$("#telefono").val('');
			$("#dni").val('');
			$("#correo").val('');
			$("#operador").prop('selectedIndex',0);
			$("#modelo").val('');
			apagaCarga();
			$("#gracias").show().delay(800).fadeOut();	
}




$('#abreBases').on('click',function(){
	$('#basesMuestra').fadeIn();
	
	
})

$('#closeMuestra').on('click',function(){
	$('#basesMuestra').fadeOut();
	
	
})

var preload = $('#preload');

function prendeCarga(){
	preload.fadeIn();
	
}


function apagaCarga(){
	
	preload.fadeOut();
}
