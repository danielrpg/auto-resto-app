<?php
// Esta es la importacion de la clase mysql para poder realizar las consultas en la base de datos
require_once 'app/core/Mysql.php';

/*
 *  Clase que se encarga de gestionar a los clintes
 *  @author Daniel Fernandez
 */
class Client{
	
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
	public function listClients($desde, $hasta){
		$query = "SELECT * 
				  FROM cliente, asigna_cliente_pieza
				  WHERE estado_cliente=1 AND cliente.id_cliente = asigna_cliente_pieza.id_cliente 
				        AND cliente.estado_cliente = 1
				   LIMIT ".$desde.",".$hasta;
		$clients = $this->mysql->query($query);
		return $clients;
	}
	/**
	 * Metodo que permite conseguir el total de clientes
	 */
	public function totalClientes(){
		$query ="SELECT * 
				  FROM cliente, asigna_cliente_pieza
				  WHERE estado_cliente=1 AND cliente.id_cliente = asigna_cliente_pieza.id_cliente 
				        AND cliente.estado_cliente = 1";
	    $this->mysql->query($query);
	    $total = $this->mysql->getNumFields();
	    return $total;
	}
	/**
	 * Metodo encargado de registrar el cliente
	 **/
	public function registrarNuevoCliente($nombre_cliente,$apellido_cliente,$ci_cliente, $codigo_cliente,$correo_cliente,$telf_cliente,$dir_cliente,$ciudad_cliente,$titulo_cliente,$pieza_cliente, $id_cliente_alta, $fecha_ingreso, $fecha_salida){
		$values['id_cliente'] = NULL ;
        $values['nombre_cliente'] = $nombre_cliente ;
        $values['apellido_cliente'] = $apellido_cliente;
        $values['ci_cliente'] = $ci_cliente;
        $values['codigo_cliente'] = $codigo_cliente;
        $values['email_cliente'] = $correo_cliente;
        $values['telefono_cliente'] = $telf_cliente;
        $values['direccion_cliente'] = $dir_cliente;
        $values['ciudad_cliente'] = $ciudad_cliente;
        $values['titulo_cliente'] = $titulo_cliente;
        $values['id_pieza'] = $pieza_cliente;
        $values['id_usuario_alta'] = $id_cliente_alta;
        $values['estado_cliente'] = 1;
        if($id_cliente = $this->mysql->insert("cliente", $values)) {
        	$values2['id_asigna_cliente_pieza'] = NULL;
        	$values2['id_cliente'] = $id_cliente;
        	$values2['id_pieza'] = $pieza_cliente;
        	$values2['id_usuario_alta'] = $id_cliente_alta;
        	$values2['fecha_ingreso'] = $fecha_ingreso;
            $values2['fecha_salida'] = $fecha_salida;
        	if($cliente_asigna_pieza = $this->mysql->insert("asigna_cliente_pieza",$values2)){
        		$values3['estado_pieza']=1;
        		$this->mysql->update("pieza",$values3,"id_pieza=".$pieza_cliente);
        		return true;	
        	}
		}else{
			return false;
		}
       // return $this->mysql->insert("orders", $values);	
	}
	/**
	 * Metodo que elimina los clientes
	 **/
	public function eliminarCliente($idCliente,$id_usuario_baja){
		date_default_timezone_set('America/La_Paz');
		$fecha_actual  = date("y-m-d H:i:s");
		$value['id_usuario_baja'] = $id_usuario_baja;
		$value['fecha_baja'] = $fecha_actual;
		$value['estado_cliente'] = 0;
		if($this->mysql->update('cliente', $value,'id_cliente='.$idCliente)){
			$value2['id_usuario_baja'] = $id_usuario_baja;
			$value2['fecha_baja'] = $fecha_actual;
			$value2['estado_cliente_pieza'] = 0;	
            $condicion2 = "id_cliente=".$idCliente;
			if($this->mysql->update('asigna_cliente_pieza', $value2,$condicion2)){
				return true;	
			}
			
		}else{
			return false;
		}
	}
	/**
	 * Metodo que devuelve los datos del cliente
	 **/
	function getCliente($idCliente){
		$cliente = $this->mysql->query('SELECT *
			                            FROM cliente,asigna_cliente_pieza
			                            WHERE cliente.id_cliente='.$idCliente.' AND cliente.id_cliente = asigna_cliente_pieza.id_cliente AND cliente.estado_cliente = 1');
		return $cliente;
	}
	/**
	 * Metodo que actualiza la informacion del cliente
	 **/
	function actualizarNuevoCliente($nombre_cliente,$apellido_cliente,$ci_cliente,$correo_cliente,$telf_cliente,$dir_cliente,$ciudad_cliente,$titulo_cliente,$pieza_cliente, $id_cliente_alta, $id_cliente, $fecha_ingreso, $fecha_ingreso){
        $values['nombre_cliente'] = $nombre_cliente ;
        $values['apellido_cliente'] = $apellido_cliente;
        $values['ci_cliente'] = $ci_cliente;
        $values['email_cliente'] = $correo_cliente;
        $values['telefono_cliente'] = $telf_cliente;
        $values['direccion_cliente'] = $dir_cliente;
        $values['ciudad_cliente'] = $ciudad_cliente;
        $values['titulo_cliente'] = $titulo_cliente;
        $values['id_pieza'] = $pieza_cliente;
        $values['id_usuario_alta'] = $id_cliente_alta;
        $condicion = "id_cliente=".$id_cliente;
        if($this->mysql->update("cliente", $values,$condicion)) {
        	$values2['id_pieza'] = $pieza_cliente;
        	$values2['fecha_ingreso'] = $fecha_ingreso;
            $values2['fecha_salida']  = $fecha_salida;			
            $condicion2 = "id_cliente=".$id_cliente;
            if($this->mysql->update("asigna_cliente_pieza", $values2,$condicion2)){
            	return true;            
            }
		}else{
			return false;
		}
	}
}
?>
