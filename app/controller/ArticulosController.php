<?php

// La libreria del modelo que necesita para 
require_once 'app/model/Articulos.php';
require_once 'app/model/Users.php';

/**
 * Este es el controlador de pizas donde se ejecuta la orden
 *
 * @author Daniel
 */
class ArticulosController{
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
        if($_GET['tp'] == 'listaArticulos') {
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $articulo = new Articulos();
            $arts = $articulo->listaArticulos();
            $cont=0;
            foreach ($arts as $key => $value) {
                $articulos['id_articulo'] = $value['articulo']['id_articulo'];
                $articulos['id_servicio'] = $value['articulo']['id_servicio'];
                $nom = $articulo->getNombreServicio($value['articulo']['id_servicio']);
                $articulos['nombre_servicio'] = $nom[0]['servicio']['nombre_servicio'];
                $articulos['nombre_articulo'] = $value['articulo']['nombre_servicio'];
                $articulos['precio_articulo'] = $value['articulo']['precio_articulo'];
                $articulos['precio_venta_articulo'] = $value['articulo']['precio_venta_articulo'];
                $articulos['precio_articulo'] = $value['articulo']['precio_articulo'];
                $json_arr[$cont] = $articulos;
                $cont++;
            }   
            print_r(json_encode($json_arr));
        }elseif($_GET['tp'] == 'registrarArticulo'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $articulo = new Articulos();
            header('content-type: application/json; charset=utf-8');
            if($articulo->registrarNuevoArticulo($_POST['nombre_producto'],$_POST['descripcion_producto'],$_POST['precio_producto'],$_POST['precio_venta_producto'],$_POST['servicio_producto'], $_SESSION['idUser'])){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }elseif($_GET['tp'] == 'eliminarArticulo'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $idArticulo = $_GET['idArticulo'];
            $articulo = new Articulos();
            if($articulo->eliminarArticulo($idArticulo, $_SESSION['idUser'])){
                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }elseif($_GET['tp'] == 'datosArticulo'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $idArticulo = $_GET['idArticulo'];
            $articulo = new Articulos();
            $arti = $articulo->getDatos($idArticulo);
            $json_arr['id_articulo'] = $arti[0]['articulo']['id_articulo'];
            $json_arr['id_servicio'] = $arti[0]['articulo']['id_servicio'];
            $json_arr['nombre_servicio'] = $arti[0]['articulo']['nombre_servicio'];
            $json_arr['detalle_servicio'] = $arti[0]['articulo']['detalle_servicio'];
            $json_arr['precio_articulo'] = $arti[0]['articulo']['precio_articulo'];
            $json_arr['precio_venta_articulo'] = $arti[0]['articulo']['precio_venta_articulo'];
            $json_arr['estado_articulo'] = $arti[0]['articulo']['estado_articulo'];
            print_r(json_encode($json_arr));
        }elseif($_GET['tp'] == 'actualizarArticulo'){
            if($user->verifySession()==false){
                header('Location: index.php');
            }
            $articulo = new Articulos();
            $id_producto_editar = $_POST['id_producto_editar'];
            $nombre_producto = $_POST['nombre_producto'];
            $descripcion_producto = $_POST['descripcion_producto'];
            $precio_producto = $_POST['precio_producto'];
            $precio_venta_producto = $_POST['precio_venta_producto'];
            $servicio_producto = $_POST['servicio_producto'];
            if($articulo->actualizarArticulo($id_producto_editar, 
                                          $nombre_producto,
                                          $descripcion_producto,
                                          $precio_producto,
                                          $precio_venta_producto,
                                          $servicio_producto,$_SESSION['idUser'])){

                $datos_json = array('completado' => true);
            }else{
                $datos_json = array('completado' => false);
            }
            print_r(json_encode($datos_json));
        }
    }
}

?>