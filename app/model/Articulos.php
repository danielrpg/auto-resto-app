<?php
// Esta es la importacion de la clase mysql para poder realizar las consultas en la base de datos
require_once 'app/model/Servicios.php';
require_once 'app/core/Mysql.php';

/*
 *  Clase que se encarga de gestionar a los clintes
 *  @author Daniel Fernandez
 */
class Articulos{
	
	/**
	 * Atributo que maneja la conecccion con mysql
	 **/
	private $mysql;
    /*
     * Este es el constructo de del modelo HomeModel
     */
    public function __construct() {
        $this->mysql = new Mysql();
    }
	/*
	 * Metodo que se encarga de proporcionar la lista de los clientes
	 */
	public function listaArticulos(){
		$query = "SELECT *
				  FROM articulo
				  WHERE estado_articulo=1";
		$articulos = $this->mysql->query($query);
		return $articulos;
	}
	/**
	 * Metodo que devuelve el nombre del articulo en funcion al id del articulo
	 */
	public function getNombreServicio($id_servicio){
		$servicio = new Servicios();
		return $servicio->getNombreServicio($id_servicio);
	}
	/**
	 * Metodo encargado de registrar el cliente
	 **/
	public function registrarNuevoArticulo($nombre_producto,$descripcion_producto,$precio_producto,$precio_venta_producto,$servicio_producto, $idUser){
		$values['id_articulo'] = NULL ;
        $values['id_servicio'] = $servicio_producto ;
        $values['nombre_servicio'] = $nombre_producto;
        $values['detalle_servicio'] = $descripcion_producto;
        $values['precio_articulo'] = $precio_producto;
        $values['precio_venta_articulo'] = $precio_venta_producto;
        $values['estado_articulo'] = 1;
        $values['id_usuario_alta'] = $idUser;
        if(($id_articulo = $this->mysql->insert("articulo", $values)) != 0) {
        	return true;	
		}else{
			return false;
		}	
	}
	/**
	 * Metodo que da de baja los articulos
	 **/
	public function eliminarArticulo($idArticulo,$id_usuario_baja){
		date_default_timezone_set('America/La_Paz');
		$fecha_actual  = date("y-m-d H:i:s");
		$value['id_usuario_baja'] = $id_usuario_baja;
		$value['fecha_baja'] = $fecha_actual;
		$value['estado_articulo'] = 0;
		if($this->mysql->update('articulo', $value,'id_articulo='.$idArticulo)){
		    return true;	
		}else{
			return false;
		}
	}
	/**
	 * Metodo que devuelve los datos del cliente
	 **/
	function getDatos($idArticulo){
		$articulo = $this->mysql->query('SELECT *
										 FROM articulo
										 WHERE id_articulo='.$idArticulo.' AND estado_articulo=1');
		return $articulo;
	}
	/**
	 * Metodo que actualiza la informacion del cliente
	 **/
	function actualizarArticulo($id_producto_editar, $nombre_producto, $descripcion_producto, $precio_producto, $precio_venta_producto, $servicio_producto,$idUser){
        $values['id_servicio'] = $servicio_producto ;
        $values['nombre_servicio'] = $nombre_producto;
        $values['detalle_servicio'] = $descripcion_producto;
        $values['precio_articulo'] = $precio_producto;
        $values['precio_venta_articulo'] = $precio_venta_producto;
        $values['id_usuario_alta'] = $idUser;
        $condicion = "id_articulo=".$id_producto_editar;
        if($this->mysql->update("articulo", $values,$condicion)) {
            return true;            
		}else{
			return false;
		}
	}
}
?>
