<?php
// Esta es la clase user que es importado para la utileria del monitor
require_once 'app/model/Users.php';
require_once 'app/model/Client.php';
require_once 'app/model/Shopping.php';
/**
 * Description of HomeView
 *
 * @author Daniel
 */
class HomeView {
    // Este es el atributo que crea el template de la vista
    private $template;
    /*
     * Este es el metodo constructor de la clase HomeView
     */
    public function __construct() {
        // Aqui todo lo que se define para este constructor
    }
    /*
     * Este es el metodo que ejecuta el template de la vista
     */
    public function runIndex(){
        $library = Array('title'=>'MONITOR - ORDENES',
                         'keywords'=>'ORDEN, PEDIDO, iphone, ipad,os',
                          'description'=>'Intersanitas');
        $template = file_get_contents('app/site/home.html');
        foreach ($library as $key => $value) {
             $template = str_replace('{'.$key.'}', $value, $template);
        }
        $template = str_replace('{menu_lateral}', '', $template);
        $template = str_replace('{clasejs}', 'app/site/js/Home.js', $template);
		$template = str_replace('{modaljs}', '', $template);
        $template = str_replace('{header}', '', $template);
        $template = str_replace('{user_tool}', '', $template);
        $login = file_get_contents('app/site/login.html');
        $template = str_replace('{content}', $login, $template);
        $template = str_replace('{footer}', '', $template);
        print($template);
    }
    
    /*
     * Esta es la funcion que ejecuta el home de usuario del sistema 
     */
    public function runPageIni() {
		$user = new Users();
		if($user->verifySession()==false){
			header('Location: index.php');
		}
        $library = Array('title'=>'MONITOR - ORDENES',
                         'keywords'=>'ORDEN, PEDIDO, cart, iphone, ipad,os',
                         'description'=>'INTERSANITAS');
        $template = file_get_contents('app/site/home.html');
        foreach ($library as $key => $value) {
             $template = str_replace('{'.$key.'}', $value, $template);
        }
        $template = str_replace('{clasejs}', 'app/site/js/Shopping.js', $template);
        $template = str_replace('{clasejs2}', 'app/site/js/Cliente.js', $template);
        $template = str_replace('{clasejs3}', 'app/site/js/Piezas.js', $template);
        $template = str_replace('{clasejs4}', 'app/site/js/Articulo.js', $template);
         $template = str_replace('{clasejs5}', 'app/site/js/Servicio.js', $template);
		$template = str_replace('{modaljs}', 'app/site/js/Modal.js', $template);
		$header = file_get_contents('app/site/header.html');
        $template = str_replace('{header}', $header, $template);
		$tools = "<div id='cuanta_usuario' style='float:left;'><strong>Nombre: </strong>".$_SESSION['name']." ".$_SESSION['lastName']."<br> <a href='?action=closeSession'>Salir</a></div>"."<div class='clock'>
																		<div id='Date'></div>
																		<ul><li id='hours'></li>
																		<li id='point'>:</li>
																		<li id='min'></li><li id='point'>:</li>
          															    <li id='sec'></li></ul>
																</div>"; // Este es el div del clock
		$template = str_replace('{user_tool}',$tools , $template);
        $menu_lateral = file_get_contents('app/site/botones_lateral.html');
        $template = str_replace('{menu_lateral}', $menu_lateral, $template);
		$monitor = file_get_contents('app/site/monitor_home.html');
		$shopping = new Shopping();
		$ordersOrigin = $shopping->listOrdersOrigin();
		$sales_data = ' <ul class="lista" id="listaOrigen">';
		if($ordersOrigin == NULL){
			$sales_data = $sales_data." ";
		}else{
			foreach ($ordersOrigin as $key => $value) {
				$sales_data = $sales_data."<li class='item' id='".$value['o']['idOrder']."'   ondblclick='new Shopping().showModal(".$value['o']['idOrder'].")' ><img src='app/site/img/products/box.png'><hr><div id='title'><span id='".$value['o']['orderNumber']."'>".$value['c']['name']." ".$value['c']['lastName']." </span><input type='hidden' id='idOrder' name='idOrder' value='".$value['o']['idOrder']."'></div></li>";
			}
		}
		$sales_data = $sales_data."</ul><script type='text/javascript'> var shopp = new Shopping(); shopp.dragOrderOrigin();shopp.toolTip();</script>";
        $monitor = str_replace('{sales}', $sales_data, $monitor);
		$ordersDest = $shopping->listOrdersDest();
		$sales_data = '<ul class="lista" id="listaDestino">';
		if($ordersDest == NULL){
			$sales_data = $sales_data." ";
		}else{
			foreach ($ordersDest as $key2 => $value2) {
				$sales_data = $sales_data."<li class='item2' id='".$value2['o']['idOrder']."' ondblclick='new Shopping().showModal(".$value2['o']['idOrder'].")' ><img src='app/site/img/products/box.png' ><hr><div id='title'> <span id='".$value2['o']['orderNumber']."'>".$value2['c']['name']." ".$value2['c']['lastName']."</span><input type='hidden' id='idOrder'  name='idOrder' value='".$value2['o']['idOrder']."'></div></li>";
			}	
		}
		$sales_data = $sales_data."</ul><script type='text/javascript'> var shopp = new Shopping(); shopp.dragOrderFinal();shopp.toolTip();</script>";
        $monitor = str_replace('{sales2}', $sales_data, $monitor);
        //$sales_data = '<ul class="lista" id="listaDestinoFinal">';
		$ordersDest = $shopping->listOrdersDestFinal();
		$sales_data = '<ul class="lista" id="listaDestinoFinal">';
		if($ordersDest == NULL){
			$sales_data = $sales_data." ";
		}else{
			foreach ($ordersDest as $key3 => $value3) {
				$sales_data = $sales_data."<li class='item2' id='".$value3['o']['idOrder']."' ondblclick='new Shopping().showModal(".$value3['o']['idOrder'].")' ><img src='app/site/img/products/box.png' ><hr><div id='title'> <span id='".$value3['o']['orderNumber']."'>".$value3['c']['name']." ".$value3['c']['lastName']."</span><input type='hidden' name='idOrder' id='idOrder'  value='".$value3['o']['idOrder']."'></div></li>";
			}		
		}
		$sales_data = $sales_data."</ul><script type='text/javascript'> var shopp = new Shopping();shopp.toolTip2();</script>";
        $monitor = str_replace('{sales3}', $sales_data, $monitor);
		//$client = new Client();
		//$clients = $client->listClients();
		$dataClient = "";
	    $dataClient = $dataClient."<div id='data_client'>
				                                <img src='app/site/img/sales.png' align='absmidle' ondblclick='new Shopping().ordersReport()'><br>
				                                Ordenes Entregadas
				                   </div>";	
		$dataClient = $dataClient."<div id='data_client'>
				                                <img src='app/site/img/client.png' align='absmidle' ondblclick='new Shopping().clientsReport()'><br>
				                                Reporte de Clientes
				                   </div>";			
		$monitor = str_replace('{list_clients}', $dataClient, $monitor);
        $modal = file_get_contents('app/site/modal.html');
		//$detailOrder = $shopping->detailOrder();
		$order_data = '<div id="listaorders"><strong> Detalle de Ordenes</strong><br><div id="detailCustomer" ></div>';
		$order_data = $order_data.'<strong> Articulos de la Orden/strong><br><div id="itemsOrder"> </div></div>';
		$modal = str_replace('{order_modal}', $order_data, $modal);
		$monitor = str_replace('{modal_orders_modal}', $modal, $monitor);
        $template = str_replace('{content}', $monitor, $template);
		$footer = file_get_contents('app/site/footer.html');
		$footer = str_replace("{date}", $user->date_now(), $footer);
        $template = str_replace('{footer}', $footer, $template);
        print($template);
    }
    
    /*
     * Esta es la funcion que se ejecuta cuando no exite el usuario
     */
    public function noIn(){
        $library = Array('title'=>'Monitor - Shopping Cart',
                         'keywords'=>'Monitor, Shopping Cart, iphone, ipad,os',
                         'description'=>'Monitor - Shopping cart');
        $template = file_get_contents('app/site/home.html');
        foreach ($library as $key => $value) {
             $template = str_replace('{'.$key.'}', $value, $template);
        }
        $template = str_replace('{clasejs}', 'app/site/js/Home.js', $template);
        $template = str_replace('{header}', '<script type="text/javascript"> notIn() </script>', $template);
        $login = file_get_contents('app/site/login.html');
        $template = str_replace('{content}', $login, $template);
        $template = str_replace('{footer}', '', $template);
        print($template);
    }
}

?>
