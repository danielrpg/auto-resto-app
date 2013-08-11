<?php
require_once 'app/core/Mysql.php';

/**
 * Esta e la clase que se encarga de hacer los servicios
 */
class Servicios{
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
    /**
	 * Metodo que devuelve el nombre en funsion al id
     */
    public function getNombreServicio($id_servicio){
		$query = "SELECT nombre_servicio
			  	  FROM servicio
		  		  WHERE id_servicio=".$id_servicio;
		return $this->mysql->query($query);

    }
    /**
     * Metodo que devuelve la lista de los servicios
     */
    public function listaServicios(){
        $query = "SELECT * 
                  FROM servicio
                  WHERE estado_servicio=1";
        return $this->mysql->query($query);
    }
    /**
     * Metodo que permite registrar el servicio
     */
    public function registrarServicio($nombre_servicio,$descripcion_servicio,$codigo_servicio,$idUser){
        $values['id_servicio'] = NULL ;
        $values['nombre_servicio'] = $nombre_servicio;
        $values['detalle_servicio'] = $descripcion_servicio;
        $values['codigo_servicio'] = $codigo_servicio;
        $values['estado_servicio'] = 1;
        $values['id_usuario_alta'] = $idUser;
        if(($id_servicio = $this->mysql->insert("servicio", $values)) != 0) {
            return true;    
        }else{
            return false;
        }   
    }
    /**
     * Metodo que permite devolver el dato del servicio
     */
    public function getServicio($idServicio){
         $query = "SELECT * 
                  FROM servicio
                  WHERE estado_servicio=1 AND id_servicio=".$idServicio;
        return $this->mysql->query($query);
    }
    /**
     * Metodo encargado de actualizar los datos del servicio
     */
    public function actualizarServicio($id_servicio, $nombre_servicio, $descripcion_servicio, $codigo_servicio, $idUser){
        $values['nombre_servicio'] = $nombre_servicio;
        $values['detalle_servicio'] = $descripcion_servicio;
        $values['codigo_servicio'] = $codigo_servicio;
        $values['id_usuario_alta'] = $idUser;
        $condicion = "id_servicio=".$id_servicio;
        if($this->mysql->update("servicio", $values,$condicion)) {
            return true;            
        }else{
            return false;
        }
    }
    /**
     * Metodo que permite eliminar el servicio
     */
    public function eliminarServicio($idServicio,$id_usuario_baja){
        date_default_timezone_set('America/La_Paz');
        $fecha_actual  = date("y-m-d H:i:s");
        $value['id_usuario_baja'] = $id_usuario_baja;
        $value['fecha_baja'] = $fecha_actual;
        $value['estado_servicio'] = 0;
        if($this->mysql->update('servicio', $value,'id_servicio='.$idServicio)){
            return true;    
        }else{
            return false;
        }
    }
}
?>