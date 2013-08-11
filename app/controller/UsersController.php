<?php

// Estas son las librerias que se necesita para poder ejecutar el home
require_once 'app/model/Users.php';
require_once 'app/view/HomeView.php';
require_once 'app/view/ShoppingView.php';
require_once 'app/model/Shopping.php';

// Este es el modelo de la lista de usuarios
//require_once 'app/model/ListaUsuarios.php';
//require_once 'app/view/ListaUsuariosView.php';

/**
 * Description of Router
 *
 * @author Daniel
 */
class UsersController {
    
    private $action;
    /*
     * Este es el metodo constructor para el proyecto
     */
    public function __construct() {
        
    }
    
    /*
     * Esta es la funcion que ejecuta y redirecciona la solicitud  que se haga
     */
    public function runIndex(){
		//$shopping = new ShoppingView();
        $action = $_GET['action'];
        switch ($action) {
            case "login": /// Esto es del usuario
                $users = new Users();
                $json_data = $users->verifyUser($_GET['user'],$_GET['password']);
                print($json_data);
                break;
            case "inSystem": //Cuando inicia la session del usuario
                $home_view = new HomeView();
                $home_view->runPageIni();
                break;
			case "closeSession": //Cuando cerramos la session
				$users = new Users();
				$users->logout_user();
				break;
			case "ajaxTooltip":  // Este es el tooltip del producto muestra su detalle // Esto es del shopping
				//$id = $_POST['id'];
			    $orderNumber = $_POST['orderNum'];
				$shopping = new ShoppingView();
                $shopping->runToolTip($orderNumber);
				break;
				
			case "dateTime": // Este evento tambien es del dateTime del monitor
				$shopping = new Shopping();
				$shopping->getLastDateTime();
                break;
				
			case "regOrderCostumer": // tambien llega a ser del monitor
				
				$shopping = new Shopping();
				$idOrder = $_GET['idOrder'];
				$orderNumber = $_GET['orderNumber'];
				$orderTotal = $_GET['orderTotal'];
				$dateTime = $_GET['dateTime'];
				$idCustom = $_GET['idCustom'];
				$idUser = $_SESSION['idUser'];
				$date_time = $_GET['DTime'];
				$shopping->regOrderCustomer($idOrder,$orderNumber,$orderTotal,$dateTime,$idCustom,$idUser,$date_time);
				
			    break;
				
			case "regCostumerId": //  esto es del shopping
				$shopping = new Shopping();
				$idUser = $_GET['idUser'];
				$shopping->regCustomerID($idUser);
				break;
		    
			case "regCostumerDB": /// Esto es del shopping 
				$shopping = new Shopping();
				$name = $_GET['name'];
				$lastName = $_GET['lastName'];
				$custumerNumber = $_GET['custumerNumber'];
				$email = $_GET['email'];
				$phone = $_GET['phone'];
				$address = $_GET['address'];
				$city = $_GET['city'];
				$country = $_GET['country'];
				$title = $_GET['title'];
				$idUserCust = $_GET['idCustomer'];
				$shopping->regCostumerDB($name,$lastName,$custumerNumber,$email,$phone,$address,$city,$country,$title,$idUserCust);
				break;
			
			case "regItemsOrder": //Esto es del shopping
				$idOrder = $_GET['idOrder'];				
				$orderNumber = $_GET['orderNumber'];
				$itemId = $_GET['itemId'];
				$itemSku = $_GET['itemSku'];
				$itemName = $_GET['itemName'];
				$itemQuantity = $_GET['itemQuantity'];
				$itemPrice = $_GET['itemPrice'];
				$itemDate = $_GET['itemDate'];
				$shopping = new Shopping();
				$shopping->regItemsOrder($idOrder,$orderNumber,$itemId,$itemSku,$itemName,$itemQuantity,$itemPrice,$itemDate);
				
				break;
				
			case "changeToConfirmation": // Esto es del shopping
				
				$orderId = $_GET['orderId'];
			   	$dateTimeConf = $_GET['dateTimeConf'];				
				$idUser = $_SESSION['idUser'];
				$shopping = new Shopping();
				$shopping->changeToConfirmation($orderId,$dateTimeConf,$idUser);
				break;
				
			case "changeToConfirmationFinal": // del Shopping
				
				$orderId = $_GET['orderId'];
				$dateTimeConf = $_GET['dateTimeConf'];
				$idUser = $_SESSION['idUser'];
				$shopping = new Shopping();
				$shopping->changeToConfirmationFinal($orderId,$dateTimeConf,$idUser);
				break;
				
			case "getOrdersRegistered": // Esto es del shopping
				$orderNumber = $_GET['orderNumber'];
				$shopping = new Shopping();
				$shopping->getOrdersRegistered($orderNumber);
				break;
			
			case "getOrdersRegisteredId":
				
				$orderId = $_GET['orderId'];
				$shopping = new Shopping();
				$shopping->getOrdersRegisteredId($orderId);
				break;
				
			case "listOrderCustomer": // Esto es de shopping
			    $orderNomber = $_GET['orderNumber'];		
				$shopping = new Shopping();
				$shopping->listOrderCustomer($orderNomber);
				break;
				
		    case 'cancelItem':
				$idItem = $_GET['idItem'];
				$shopping = new Shopping();
				$shopping->cancelItem($idItem);
				break;
				
			case "cancelOrder":
				$orderId = $_GET['orderId'];
				$shopping = new Shopping();				
				$shopping->cancelOrder($orderId);
				break;
				
			case "listOrderDelivery":
				$shopping = new Shopping();
				$shopping->listOrderDelivery();
				break;
				
			case 'listCustomer':
				
				$shopping = new Shopping();
				$shopping->listCustomer();
				break;
			
			case 'updateItem':
				
				$idItem = $_GET['idItem'];
				$itemQuantity = $_GET['itemQuantity'];
				$shopping = new Shopping();
				$shopping->updateItem($idItem,$itemQuantity);
				break;
			
            default: // Esto es del home
                
                $home_view = new HomeView();
                $home_view->runIndex();
                break;
            
        }
    }
}

?>
