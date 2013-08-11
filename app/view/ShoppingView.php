<?php
// Este es el modelo de la clase para que se ejecute las consultas en la base de datos
require_once 'app/model/Shopping.php';
/*
 * Clase que se encarga de gesionar las vistas para el monitor y todo lo referente a los productos
 * @author Daniel Fernandez
 */
class ShoppingView {
	
	/*
	 * Metodo constructor
	 */
	public function __construct() {
        // codigo para definir al constructor   
    }
	
	/*
	 * Esta es la function que realiza la vista para el tooltip
	 */
	 public function runToolTip($orderNumber){
		$shopping = new Shopping();
		$template = file_get_contents('app/site/tooltip.html');
		$view_detail = $view_detail."<div id='description_sale'> <h2>Detalle de Orden</h2><hr>";
		$view_detail = $view_detail."<strong> Numero de Orden: </strong> ".$orderNumber."<br>";
		$orderDetail = $shopping->getOrderCustomerDetail($orderNumber);
		$view_detail = $view_detail."<table border='0' class='table_customer' cellpadding='0' cellspacing='0'>";
		$view_detail = $view_detail."<tr><td><strong>Nombre:</strong></td><td>".$orderDetail[0]['c']['name']." ".$orderDetail[0]['c']['lastName']."</td><td><strong>Direccion:</strong></td><td>".$orderDetail[0]['c']['address']."</td></tr>";
		$view_detail = $view_detail."<tr><td><strong>Telefono:</strong></td><td>".$orderDetail[0]['c']['phone']."</td><td><strong>Correo:</strong></td><td>".$orderDetail[0]['c']['email']."</td></tr>";
		$view_detail = $view_detail."<tr></tr>";
		$view_detail = $view_detail."</table>";
		$view_detail = $view_detail."<br>";
		$view_detail = $view_detail."<table border='1' class='table_items' cellpadding='0' cellspacing='0'> <tr><th>SKU</th><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>";
		$cont = 0;
		$quantity = 0;
		$totalPrice = 0;
		$detail = $shopping->orderDetailItems($orderNumber);
		foreach ($detail as $key => $value) {
			$view_detail = $view_detail."<tr><td> ".$detail[$cont]['orderitems']['sku']."</td>";
			$view_detail = $view_detail."<td>".$detail[$cont]['orderitems']['name']."</td>";
			$view_detail = $view_detail."<td>".$detail[$cont]['orderitems']['quantity']."</td>";
			$quantity = $quantity + $detail[$cont]['orderitems']['quantity'];
			$view_detail = $view_detail."<td>".$detail[$cont]['orderitems']['price']."</td></tr>";	
			$totalPrice = $totalPrice + ($detail[$cont]['orderitems']['quantity']*$detail[$cont]['orderitems']['price']);
			$cont++;
		}
		$view_detail = $view_detail."<tr><td></td><th>Total</th><td>".$quantity."</td><td>".$totalPrice."</td></tr>";
		
		$view_detail = $view_detail."</table> <br><img src='app/site/img/products/open_box.png' align='left'> </div>";	
		
		$template = str_replace('{tool_tip_content}', $view_detail, $template);
		
		print($template);
	 	
	 }
}
 
?>