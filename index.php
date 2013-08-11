<?php
// Este es el controler 
require_once 'app/controller/UsersController.php';
require_once 'app/controller/PiezasController.php';
require_once 'app/controller/ClientesController.php';
require_once 'app/controller/ArticulosController.php';
require_once 'app/controller/ServiciosController.php';
require_once 'app/controller/MovilController.php';
require_once 'app/controller/ShoppingController.php';
/**
 * Esta es la descripcion del index
 *
 * @author Daniel Fernandez
 */
class Index {
    /*
     * Este es el metodo que ejecuta la aplicación
     */
    public function run(){
    	switch ($_GET['action']) {
    		case 'piezas':
    			$piezas = new PiezasController();
    			$piezas->run();
    			break;
            case 'clientes':
                $clientes = new ClientesController();
                $clientes->run();
                break;
            case 'articulos':
                $articulos = new ArticulosController();
                $articulos->run();
                break;
            case 'servicios':
                $servicio = new ServiciosController();
                $servicio->run();
                break;
            case 'movil':
                $movil = new MovilController();
                $movil->run();
                break;
            case 'shopping':
                $shopping = new ShoppingController();
                $shopping->run();
                break;
    		default:
    			//$users = new UsersController();
       			$users = new UsersController(); 
       			$users->runIndex();
    			break;
    	}
       
    }
}
// Esta es la llamada al index que ejecuta la clase
$index = new Index();
$index->run();
?>
