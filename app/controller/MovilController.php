<?php
require_once 'app/model/Movil.php';
require_once 'app/model/Users.php';
/**
 * Este es el controlador de pizas donde se ejecuta la orden
 *
 * @author Daniel
 */
class MovilController{
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
        $movil = new Movil();
        $user = new Users();
        if($_GET['tp'] == 'login'){
            $res  = $movil->loginSistema($_GET['correo'], $_GET['ci']);
            if($res[0]['cliente']['id_cliente'] != NULL){
                $json_data['id_cliente'] = $res[0]['cliente']['id_cliente'];
                $json_data['email_cliente'] = $res[0]['cliente']['email_cliente'];
                $json_data['ci_cliente'] = $res[0]['cliente']['ci_cliente'];
                $json_data['nombre_cliente'] = $res[0]['cliente']['nombre_cliente'];
                $json_data['apellido_cliente'] = $res[0]['cliente']['apellido_cliente'];
                $json_data['completo'] = true;
            }else{
                $json_data['completo'] = false;
            }
            header( "Content-type: application/json; charset=utf-8");
            header('Access-Control-Allow-Origin: *');
            if(isset($_GET['callback'])){
                print_r($_GET['callback']."(".json_encode($json_data).")");
            }else{
                print_r(json_encode($json_data));
            }
            
        }elseif($_GET['tp'] == 'listaServicios'){
            $servicios = $movil->listaServicios();
            $cont = 0;
            foreach ($servicios as $key => $value) {
                $array['id_servicio'] = $value['servicio']['id_servicio'];
                $array['nombre_servicio'] = $value['servicio']['nombre_servicio'];
                $array['codigo_servicio'] = $value['servicio']['codigo_servicio'];
                $json_data[$cont] = $array;
                $cont++;
            }
            $data['services'] = $json_data;
            header( "Content-type: application/json; charset=utf-8");
            header('Access-Control-Allow-Origin: *');
            if(isset($_GET['callback'])){
                print_r($_GET['callback']."(".json_encode($data).")");
            }else{
                print_r(json_encode($data));
            }
        }elseif($_GET['tp'] == 'listarArticulos'){
            
            $articulos = $movil->listaArticulos($_GET['id']);
            $cont = 0;
            foreach ($articulos as $key => $value) {
                $array['id_articulo'] = $value['articulo']['id_articulo'];
                $array['nombre_servicio'] = $value['articulo']['nombre_servicio'];
                $array['detalle_servicio'] = $value['articulo']['detalle_servicio'];
                $array['precio_venta_articulo'] = $value['articulo']['precio_venta_articulo'];
                $json_data[$cont] = $array;
                $cont++;
            }
            header( "Content-type: application/json; charset=utf-8");
            header('Access-Control-Allow-Origin: *');
            if(isset($_GET['callback'])){
                print_r($_GET['callback']."(".json_encode($json_data).")");
            }else{
                print_r(json_encode($json_data));
            }
        }elseif($_GET['tp'] == 'listaProductos'){
            
            $articulos = $movil->listaProductos();
            $cont = 0;
            foreach ($articulos as $key => $value) {
                $array['id_articulo'] = $value['articulo']['id_articulo'];
                $array['id_servicio'] = $value['articulo']['id_servicio'];
                $array['nombre_servicio'] = $value['articulo']['nombre_servicio'];
                $array['detalle_servicio'] = $value['articulo']['detalle_servicio'];
                $array['precio_venta_articulo'] = $value['articulo']['precio_venta_articulo'];
                $json_data[$cont] = $array;
                $cont++;
            }
            $data['productos'] = $json_data;
            header( "Content-type: application/json; charset=utf-8");
            header('Access-Control-Allow-Origin: *');
            if(isset($_GET['callback'])){
                print_r($_GET['callback']."(".json_encode($data).")");
            }else{
                print_r(json_encode($data));
            }
        }elseif ($_GET['tp'] == 'registrarOrden') {
            $numero_orden = uniqid();
            if($movil->registrarOrden($_GET['id_producto'],$numero_orden,$_GET['cantidad'], $_GET['id_cliente'],$_GET['ci'],$_SESSION['idUser'])){
                $json_data['completo'] = true;
                $json_data['msg'] = 'Se realizo la orden correctamente';
                $json_data['nombre_producto'] = $movil->getDatosProdNombre();
                $json_data['monto'] = $movil->getPrecioProd();
                $json_data['cantidad'] = $movil->getCantProd();
                $json_data['numero_orden'] = $movil->getNumOrden();
            }else{
                $json_data['completo'] = false;
                $json_data['msg'] = 'No se pudo realizar la transaccion por los datos estan mal';
            }    
            //}
            header( "Content-type: application/json; charset=utf-8");
            header('Access-Control-Allow-Origin: *');
            if(isset($_GET['callback'])){
                print_r($_GET['callback']."(".json_encode($json_data).")");
            }else{
                print_r(json_encode($json_data));
            }
        }elseif($_GET['tp']=='listServicios'){
            $servicios = $movil->listaServicios();
            $cont = 0;
            foreach ($servicios as $key => $value) {
                $array['id_servicio'] = $value['servicio']['id_servicio'];
                $array['nombre_servicio'] = $value['servicio']['nombre_servicio'];
                $array['detalle_servicio'] = $value['servicio']['detalle_servicio'];
                $array['codigo_servicio'] = $value['servicio']['codigo_servicio'];
                $json_data[$cont] = $array;
                $cont++;
            }
            header( "Content-type: application/json; charset=utf-8");
            header('Access-Control-Allow-Origin: *');
            if(isset($_GET['callback'])){
                print_r($_GET['callback']."(".json_encode($json_data).")");
            }else{
                print_r(json_encode($json_data));
            }
        }
    }
}

?>