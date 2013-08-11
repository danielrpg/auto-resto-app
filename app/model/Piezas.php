<?php
// Esta es la importacion de la clase mysql para poder realizar las consultas en la base de datos
require_once 'app/core/Mysql.php';


/*
 *  Clase encargada con las piezas
 *  @author Daniel Fernandez
 */
class Piezas{
	/*
	 * Esta la variable mysql la cual continee la conexion
	 */
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
	public function listaPiezas(){
		$query = "SELECT * 
		          FROM pieza
		          WHERE estado_pieza=1";
		$pieza = $this->mysql->query($query);
		return $pieza;
	}
	/**
	 * Metodo encargado de registrar la nuevas piezas
	 * @param $seccion    -> que es la seccion de en la que se encuentra unicado la pieza
	 *        $codigo     -> el codigo de la habitacion
	 *        $nombre     -> que es el nombre de la pieza
	 *        $id_usuario -> que es el id del usuario que esta registrando la nueva pieza
	 **/	
	public function registraPieza($seccion,$codigo, $nombre,$descripcion_pieza, $id_usuario){
			 $datos_arr['id_pieza']        = NULL;
			 $datos_arr['seccion_pieza']   = $seccion;
			 $datos_arr['codigo_pieza']    = $codigo;
			 $datos_arr['nombre_pieza']    = $nombre;
			 $datos_arr['descripcion_pieza']=$descripcion_pieza;
			 $datos_arr['estado_pieza']    = 1;   // 0 -> es disponible y 1 es ocupado
			 $datos_arr['id_usuario_alta'] = $id_usuario;
			if($id_pieza = $this->mysql->insert("pieza", $datos_arr)) {
				return true;
			}else{
				return false;
			}
	}
	/**
	 * Metodo encargado de eliminar una pieza
	 */
	public function eliminarPieza($idPieza, $id_usuario_baja){
		date_default_timezone_set('America/La_Paz');
		$fecha_actual  = date("y-m-d H:i:s");
		$value['id_usuario_baja'] = $id_usuario_baja;
		$value['fecha_baja'] = $fecha_actual;
		$value['estado_pieza'] = 0;
		if($this->mysql->update('pieza', $value,'id_pieza='.$idPieza)){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * Metodo que permite devolver los datos de la piza
	 */
	public function  getPieza($idPieza) {
		$res = $this->mysql->query('SELECT * 
			                       FROM pieza
			                       WHERE id_pieza='.$idPieza);
		return $res;
	}
	/**
	 * Metodo que actualiza los datos de pieza
	 */
	public function actualizarPieza($seccion_pieza, $nombre_pieza,$descripcion_pieza, $id_pieza){ 
        $values['seccion_pieza'] = $seccion_pieza;
        $values['nombre_pieza'] = $nombre_pieza;
        $values['descripcion_pieza'] = $descripcion_pieza;
        $condicion = "id_pieza=".$id_pieza;
        if($id_pieza = $this->mysql->update("pieza", $values,$condicion)) {
			return true;
		}else{
			return false;
		}
	}
}
?>