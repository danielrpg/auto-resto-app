<?php

// La libreria del modelo que necesita para 
require_once 'app/model/Piezas.php';
require_once 'app/model/Users.php';

/**
 * Este es el controlador de pizas donde se ejecuta la orden
 *
 * @author Daniel
 */
class PiezasController{
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
        if($_GET['tp'] == 'registrar') {
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $pieza = new Piezas();
            $codigo_pieza = "ASKI_".uniqid();
            header('content-type: application/json; charset=utf-8'); 
           /* $res = $pieza->registraPieza($_GET['seccion'],$codigo_pieza, $_GET['nombre'], $_SESSION['idUser']);
            print_r($res);*/
            if($pieza->registraPieza($_GET['seccion'],$codigo_pieza, $_GET['nombre'],$_GET['descripcion_pieza'], $_SESSION['idUser'])){
                $res = array('completado' => true);
            }else{
                $res = array('completado' => false);
            }
            $json = json_encode($res);
            print_r($json);
        }elseif ($_GET['tp'] == 'listaPiezas') {
            $pieza = new Piezas();
            $res = $pieza->listaPiezas();
            $datos_json = array();
            $cont = 0;
            foreach ($res as $key => $value) {
                $datos['id_pieza'] = $value['pieza']['id_pieza'];
                $datos['nombre_pieza'] = $value['pieza']['nombre_pieza'];
                $datos['seccion_pieza'] = $value['pieza']['seccion_pieza'];
                $datos['descripcion_pieza'] = $value['pieza']['descripcion_pieza'];
                $datos_json[$cont] = $datos;
                $cont++;
            }
            print_r(json_encode($datos_json));
        }elseif($_GET['tp'] == 'eliminarPieza'){
            $pieza = new Piezas();
            $idPieza = $_GET['idPieza'];
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            header('content-type: application/json; charset=utf-8');
            if($pieza->eliminarPieza($idPieza, $_SESSION['idUser'])){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }elseif ($_GET['tp'] == 'getPieza') {
            $pieza = new Piezas();
            $idPieza = $_GET['idPieza'];
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            header('content-type: application/json; charset=utf-8');
             $res = $pieza->getPieza($idPieza);
            $datos_array['id_pieza'] = $res[0]['pieza']['id_pieza'];
            $datos_array['seccion_pieza'] = $res[0]['pieza']['seccion_pieza'];
            $datos_array['nombre_pieza'] = $res[0]['pieza']['nombre_pieza'];
            $datos_array['descripcion_pieza'] = $res[0]['pieza']['descripcion_pieza'];
            print_r(json_encode($datos_array));
        }elseif($_GET['tp'] == 'actualizarPieza'){
            $pieza = new Piezas();
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $seccion_pieza    = $_POST['seccion_pieza'];
            $nombre_pieza     = $_POST['nombre_pieza'];
            $descripcion_pieza = $_POST['descripcion_pieza'];
            $id_pieza   = $_POST['id_pieza'];
            header('content-type: application/json; charset=utf-8');
            if($pieza->actualizarPieza($seccion_pieza,$nombre_pieza,$descripcion_pieza,$id_pieza)){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }  
            print_r(json_encode($datos_json)); 
        }
    }
}

?>