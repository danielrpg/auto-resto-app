<?php

// La libreria del modelo que necesita para 
require_once 'app/model/Client.php';
require_once 'app/model/Users.php';
/**
 * Este es el controlador de pizas donde se ejecuta la orden
 *
 * @author Daniel
 */
class ClientesController{
	/**
	 * Metodo constructor de la clase
	 */
	public function __construct() {
       // aqui el contructor de la clase 
    }
    /**
     * Metodo que ejecuta el index de la clase
     */
    public function run(){
        $user = new Users();
        if($_GET['tp'] == 'listaClientes') {
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $cliente = new Client();
            $res = $cliente->listClients($_GET['desde'], $_GET['hasta']);
            header('content-type: application/json; charset=utf-8');
            $cont = 0;
            foreach ($res as $key => $value) {
                $datos_array['id_cliente'] = $value['cliente']['id_cliente'];
                $datos_array['nombre_cliente'] = $value['cliente']['nombre_cliente'];
                $datos_array['ci_cliente'] = $value['cliente']['ci_cliente'];
                $datos_array['apellido_cliente'] = $value['cliente']['apellido_cliente'];
                $datos_array['email_cliente'] = $value['cliente']['email_cliente'];
                $datos_array['codigo_cliente'] = $value['cliente']['codigo_cliente'];
                $datos_array['fecha_ingreso'] = $value['asigna_cliente_pieza']['fecha_ingreso'];
                $datos_array['fecha_salida'] = $value['asigna_cliente_pieza']['fecha_salida'];
                $datos_json[$cont] = $datos_array;
                $cont ++;
            }
            //$total = $cliente->totalClientes();
            print_r(json_encode($datos_json));
        }elseif($_GET['tp'] == 'total'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $cliente = new Client();
            $total = $cliente->totalClientes();
            header('content-type: application/json; charset=utf-8');
            $datos_array = array('total' =>$total);
            print_r(json_encode($datos_array));
        }elseif ($_GET['tp'] == 'registrarCliente') {
            $cliente = new Client();
            $nombre_cliente   = $_POST['nombre_cliente'];
            $apellido_cliente = $_POST['apellido_cliente'];
            $ci_cliente       = $_POST['ci_cliente'];
            $correo_cliente   = $_POST['correo_cliente'];
            $telf_cliente     = $_POST['telf_cliente'];
            $dir_cliente      = $_POST['dir_cliente'];
            $ciudad_cliente   = $_POST['ciudad_cliente'];
            $titulo_cliente   = $_POST['titulo_cliente'];
            $pieza_cliente    = $_POST['pieza_cliente'];
            $fecha_ingreso    = $_POST['fecha_ingreso'];
            $fecha_salida     = $_POST['fecha_salida'];
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $codigo_cliente = "ASKI_".uniqid();
            header('content-type: application/json; charset=utf-8');
            if($cliente->registrarNuevoCliente($nombre_cliente,$apellido_cliente,$ci_cliente,$codigo_cliente,$correo_cliente,$telf_cliente,$dir_cliente,$ciudad_cliente,$titulo_cliente,$pieza_cliente, $_SESSION['idUser'], $fecha_ingreso, $fecha_salida)){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }elseif($_GET['tp'] == 'eliminarCliente'){
           $cliente = new Client();
            $idCliente = $_GET['idCliente'];
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            header('content-type: application/json; charset=utf-8');
            if($cliente->eliminarCliente($idCliente, $_SESSION['idUser'])){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }elseif ($_GET['tp'] == 'datosCliente') {
            $cliente = new Client();
            $idCliente = $_GET['idCliente'];
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            header('content-type: application/json; charset=utf-8');
            $res = $cliente->getCliente($idCliente);
            $datos_array['id_cliente'] = $res[0]['cliente']['id_cliente'];
            $datos_array['nombre_cliente'] = $res[0]['cliente']['nombre_cliente'];
            $datos_array['apellido_cliente'] = $res[0]['cliente']['apellido_cliente'];
            $datos_array['ci_cliente'] = $res[0]['cliente']['ci_cliente'];
            $datos_array['email_cliente'] = $res[0]['cliente']['email_cliente'];
            $datos_array['codigo_cliente'] = $res[0]['cliente']['codigo_cliente'];
            $datos_array['telefono_cliente'] = $res[0]['cliente']['telefono_cliente'];
            $datos_array['direccion_cliente'] = $res[0]['cliente']['direccion_cliente'];
            $datos_array['ciudad_cliente'] = $res[0]['cliente']['ciudad_cliente'];
            $datos_array['titulo_cliente'] = $res[0]['cliente']['titulo_cliente'];
            $datos_array['id_pieza'] = $res[0]['cliente']['id_pieza'];
            $datos_array['fecha_ingreso'] = $res[0]['asigna_cliente_pieza']['fecha_ingreso'];
            $datos_array['fecha_ingreso'] = $res[0]['asigna_cliente_pieza']['fecha_salida'];
            print_r(json_encode($datos_array));
        }elseif($_GET['tp'] == 'actualizarCliente'){
            $cliente = new Client();
            $idCliente = $_GET['idCliente'];
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $nombre_cliente     =  $_POST['nombre_cliente'];
            $apellido_cliente   =  $_POST['apellido_cliente'];
            $ci_cliente         =  $_POST['ci_cliente'];
            $correo_cliente     =  $_POST['correo_cliente'];
            $telf_cliente       =  $_POST['telf_cliente'];
            $dir_cliente        =  $_POST['dir_cliente'];
            $ciudad_cliente     =  $_POST['ciudad_cliente'];
            $titulo_cliente     =  $_POST['titulo_cliente'];
            $pieza_cliente      =  $_POST['pieza_cliente'];
            $id_cliente         =  $_POST['id_cliente'];
            $fecha_ingreso      =  $_POST['fecha_ingreso'];
            $fecha_salida       =  $_POST['fecha_salida'];
            header('content-type: application/json; charset=utf-8');
            if($cliente->actualizarNuevoCliente($nombre_cliente,$apellido_cliente,$ci_cliente, $correo_cliente,$telf_cliente,$dir_cliente,$ciudad_cliente,$titulo_cliente,$pieza_cliente, $_SESSION['idUser'], $id_cliente, $fecha_ingreso, $fecha_ingreso)){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }  
            print_r(json_encode($datos_json)); 
        }
    }
}

?>