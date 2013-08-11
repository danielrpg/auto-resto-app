<?php

// La libreria del modelo que necesita para 
require_once 'app/model/Servicios.php';
require_once 'app/model/Users.php';

/**
 * Este es el controlador de pizas donde se ejecuta la orden
 *
 * @author Daniel
 */
class ServiciosController{
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
        if($_GET['tp'] == 'listaServicios') {
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $servicio = new Servicios();
            $serv = $servicio->listaServicios();
            $cont=0;
            foreach ($serv as $key => $value) {
                $servicios['id_servicio'] = $value['servicio']['id_servicio'];
                $servicios['nombre_servicio'] = $value['servicio']['nombre_servicio'];
                $servicios['detalle_servicio'] = $value['servicio']['detalle_servicio'];
                $servicios['codigo_servicio'] = $value['servicio']['codigo_servicio'];
                $json_arr[$cont] = $servicios;
                $cont++;
            }   
            print_r(json_encode($json_arr));
        }elseif($_GET['tp'] == 'registrarServicio'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $servicio = new Servicios();
            if($servicio->registrarServicio($_POST['nombre_servicio'],$_POST['descripcion_servicio'],$_POST['codigo_servicio'],$_SESSION['idUser'])){
                 $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }elseif($_GET['tp'] == 'getServicio'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $servicio = new Servicios();
            $servi = $servicio->getServicio($_GET['idServicio']);
            $json_arr['id_servicio'] = $servi[0]['servicio']['id_servicio'];
            $json_arr['nombre_servicio'] = $servi[0]['servicio']['nombre_servicio'];
            $json_arr['detalle_servicio'] = $servi[0]['servicio']['detalle_servicio'];
            $json_arr['codigo_servicio'] = $servi[0]['servicio']['codigo_servicio'];
            print_r(json_encode($json_arr));
        }elseif($_GET['tp'] == 'actualizarServicio'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $servicio = new Servicios();
            if($servicio->actualizarServicio($_POST['id_servicio'], $_POST['nombre_servicio'], $_POST['descripcion_servicio'], $_POST['codigo_servicio'], $_SESSION['idUser'])){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }elseif($_GET['tp'] == 'eliminarServicio'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $idServicio = $_GET['idServicio'];
            $servicio = new Servicios();
            if($servicio->eliminarServicio($idServicio, $_SESSION['idUser'])){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }
    }

}

?>