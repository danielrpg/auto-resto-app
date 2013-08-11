<?php
// Esta es la importacion de la clase mysql para poder realizar las consultas en la base de datos
require_once 'app/core/Mysql.php';

/*
 *  Clase que se encarga de gestionar a los clintes
 *  @author Daniel Fernandez
 */
class Movil{
	/**
	 * Atributo que maneja la conecccion con mysql
	 **/
	private $mysql;
  private $nombre_prod;
  private $monto;
  private $cantidad;
  private $numero_ord;
    /*
     * Este es el constructor del Movil
     */
    public function __construct() {
        $this->mysql = new Mysql();
    }
    /**
     * Metodo que permite verificar si el usuario existe en la base de datos
     */
    public function loginSistema($correo,$ci){
    	$query = "SELECT * 
				  FROM cliente
				WHERE email_cliente = '$correo' AND ci_cliente='$ci' AND estado_cliente=1";
	   /* if($this->mysql->query($query)){
	    	return true;
	    }else{
	    	return false;
	    }*/
        return $this->mysql->query($query);
    }
    /**
     * Metodo que permite optener la lista de los servicios
     */
    public function listaServicios(){
        $query = "SELECT id_servicio, nombre_servicio, detalle_servicio, codigo_servicio 
                  FROM servicio
                  WHERE id_servicio > 1 AND estado_servicio=1";
        return $this->mysql->query($query);
    }
    /**
     * Metodo que permite optener la lista de los articulos
     */
    public function listaArticulos($id_servicio){
        $query = "SELECT id_articulo, nombre_servicio, detalle_servicio, precio_venta_articulo
                  FROM articulo 
                  WHERE id_servicio = ".$id_servicio." AND estado_articulo = 1";
        return $this->mysql->query($query);
    }
    /**
     * Metodo que se encarga de listar todos los productos
     */
    public function listaProductos(){
        $query = "SELECT id_articulo,id_servicio, nombre_servicio, detalle_servicio, precio_venta_articulo
                  FROM articulo
                  WHERE estado_articulo = 1";
        return $this->mysql->query($query);
    }
    /**
     * Metodo que permite registrar la orden
     */
    public function registrarOrden($id_producto,$numero_orden,$cantidad, $id_cliente, $ci, $idUser){
        date_default_timezone_set('America/La_Paz');
        $fecha_actual  = date("y-m-d H:i:s");
        $values['id_orden'] = NULL ;
        $values['id_cliente'] = $id_cliente ;
        $values['numero_orden'] = $numero_orden;
        $values['orden_total'] = $cantidad;
        $values['estado_orden'] = 1;
        $values['id_usuario_alta'] = $idUser;
        $id_orden = $this->mysql->insert("orden", $values);
        if($id_orden) {
            $query_producto = "SELECT *
                               FROM articulo
                               WHERE id_articulo=".$id_producto;
            $articulo = $this->mysql->query($query_producto);
            $value2['id_orden_detalle'] = NULL;
            $value2['id_articulo'] = $articulo[0]['articulo']['id_articulo'];
            $value2['id_orden'] = $id_orden;
            $value2['id_servicio'] = $articulo[0]['articulo']['id_servicio'];
            $value2['nombre_producto'] = $articulo[0]['articulo']['nombre_servicio'];
            $value2['precio_producto'] = $articulo[0]['articulo']['precio_venta_articulo'];
            $value2['cantidad_producto'] = $cantidad;
            $value2['estado_detalle'] = 1;
            $value2['id_usuario_alta'] = $idUser;
            $id_detalle = $this->mysql->insert("orden_detalle", $value2);
            if($id_detalle){
                $value3['id_actividad'] = NULL;
                $value3['id_orden'] = $id_orden;
                $value3['proceso_orden'] = 0;
                $value3['acion_orden'] = 0;
                $value3['id_usuario_alta'] = $idUser;
                $id_actividad = $this->mysql->insert("actividad", $value3);
                $this->establecerDatos($articulo[0]['articulo']['nombre_servicio'],$articulo[0]['articulo']['precio_venta_articulo'],$cantidad,$numero_orden);
                return true;    
            }
        }else{
            return false;
        }
    }
  /*
   * Metodo que se establece los datos del producto
   */
  private function establecerDatos($nombre, $precio, $cant, $norden){
    $this->nombre_prod = $nombre;
    $this->monto = $precio;
    $this->cantidad = $cant;
    $this->numero_ord = $norden;
  }
  /*
   * Metodo que se encarga de devolver los datos 
   */
  public function getDatosProdNombre(){
    return $this->nombre_prod;
  }
  /*
   * Metodo que devuelve el precio
   */
  public function getPrecioProd(){
    return $this->monto;
  } 
  /*
   * Metodo devuelve cant
   */
  public function getCantProd(){
    return $this->cantidad;
  }
  /*
   * Metodo que permite devolver el numero de orden
   */
  public function getNumOrden(){
    return $this->numero_ord;
  }
}

?>