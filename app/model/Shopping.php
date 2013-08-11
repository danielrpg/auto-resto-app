<?php
  // importanto la clase del mysql para para poder hacer las conexiones ne la base de datos
require_once 'app/core/Mysql.php';

/*
 * Esta es la clase que gestiona todas las consultas a la base de datos referentes a la shopping cart
 * @author Daniel fernandez
 */
class Shopping{
	
	private $mysql;
	/*
	 * Este es el constructor de la clase 
	 */
	 public function __construct(){
		// implementacion del constructor de la clase 
		
	   $this->mysql =  new Mysql();
	   
	   
	 }
	 /*
	  * Este es el metodo que devuelve la lista de todos los items por cada orden
	  */
	  
	 public function listOrderCustomer($orderNomber){
	 	
		$query = "SELECT oi.idItem, oi.orderNumber, oi.sku, oi.name, oi.price, oi.quantity FROM orders as o, orderitems as oi WHERE o.idOrder=".$orderNomber." and o.orderNumber= oi.orderNumber and oi.status=1";
		
		$orderItems = $this->mysql->query($query);
		
		$cont=0;
		
		$array_data = array();
		
		$json_data = array();
		
		foreach ($orderItems as $key => $value) {
			
			$array_data['idItem'] = $value['oi']['idItem'];
			
			$array_data['orderNumber'] = $value['oi']['orderNumber'];
			
			$array_data['sku'] = $value['oi']['sku'];
			
			$array_data['name'] = $value['oi']['name'];
			
			$array_data['price'] = $value['oi']['price'];
			
			$array_data['quantity'] = $value['oi']['quantity'];
			
			$json_data[$cont] = $array_data;
			
			$cont++;
			
		}
		
		print(json_encode($json_data));
	 	
	 }
	 /*
	  * Metodo que devuelve la el detalle de la orden y el cliente
	  */
	 public function getOrderCustomerDetail($orderNumber){
			
	    $query = "SELECT o.idOrder as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, o.dateTime as dateTime,c.name as name, c.lastName as lastName,
						c.customerNumber as customerNumber,c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
				  FROM orders as o,customer as c 
                  WHERE o.orderNumber ='".$orderNumber."' AND o.idCustomer = c.idCustomer";

		$order = $this->mysql->query($query);
		
		return $order;	
				 	
	 }
	 
	  /*
	  * Metodo que permite obtener una orden
	  */
	 public function getOrdersRegisteredId($orderId){
	 	
		$query = "SELECT o.idOrder as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, o.dateTime as dateTime, o.status as status,c.name as name, c.lastName as lastName,
						c.customerNumber as customerNumber,c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
				  FROM orders as o,customer as c 
                  WHERE o.idOrder =".$orderId." AND o.idCustomer = c.idCustomer";

		$order = $this->mysql->query($query);
		
		// Estableciendo el formato de salida del json
        header('content-type: application/json; charset=utf-8'); 
		
		//print_r($order);
		
		if($order[0]['o']['idOrder'] == null) {
			
			$json_data = Array('ordermsg'=>'No have order');
			
		}else{
			
			$json_data = Array('idOrder'=>$order[0]['o']['idOrder'],
							   'orderNumber'=>$order[0]['o']['orderNumber'],
			                   'orderTotal'=>$order[0]['o']['orderTotal'],
			                   'dateTime'=>$order[0]['o']['dateTime'],
			                   'status' =>$order[0]['o']['status'],
			                   'name'=>$order[0]['c']['name'],
			                   'lastName'=>$order[0]['c']['lastName'],
			                   'customerNumber'=> $order[0]['c']['customerNumber'],
			                   'email'=> $order[0]['c']['email'],
			                   'phone'=>  $order[0]['c']['phone'],
			                   'address'=>  $order[0]['c']['address'],
							   'city'=> $order[0]['c']['city'],
							   'country'=> $order[0]['c']['country'],
							   'title'=> $order[0]['c']['title']);
			
		}
		
		print(json_encode($json_data));

	 }
	 
	 /*
	  * Metodo que permite obtener una orden
	  */
	 public function getOrdersRegistered($orderNumber){
	 	
		$query = "SELECT o.idOrder as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, o.dateTime as dateTime,c.name as name, c.lastName as lastName,
						c.customerNumber as customerNumber,c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
				  FROM orders as o,customer as c 
                  WHERE o.orderNumber ='".$orderNumber."' AND o.idCustomer = c.idCustomer";

		$order = $this->mysql->query($query);
		
		// Estableciendo el formato de salida del json
        header('content-type: application/json; charset=utf-8'); 
		
		//print_r($order);
		
		if($order[0]['o']['idOrder'] == null) {
			
			$json_data = Array('ordermsg'=>'No have order');
			
		}else{
			
			$json_data = Array('idOrder'=>$order[0]['o']['idOrder'],
							   'orderNumber'=>$order[0]['o']['orderNumber'],
			                   'orderTotal'=>$order[0]['o']['orderTotal'],
			                   'dateTime'=>$order[0]['o']['dateTime'],
			                   'name'=>$order[0]['c']['name'],
			                   'lastName'=>$order[0]['c']['lastName'],
			                   'customerNumber'=> $order[0]['c']['customerNumber'],
			                   'email'=> $order[0]['c']['email'],
			                   'phone'=>  $order[0]['c']['phone'],
			                   'address'=>  $order[0]['c']['address'],
							   'city'=> $order[0]['c']['city'],
							   'country'=> $order[0]['c']['country'],
							   'title'=> $order[0]['c']['title']);
			
		}
		
		print(json_encode($json_data));

	 }
	 
	 /*
	  * Metodo que realiza genera un detalle del producto que se quiere mostrar
	  */
	 public function orderDetailItems($orderNumber){
		
		//$mysql = new Mysql();
		
		$query = "SELECT * FROM orderitems WHERE orderNumber='".$orderNumber."' AND status=1";
		
		$orderItems = $this->mysql->query($query);

		return $orderItems;
		
	 }
	 /*
	  * Metodo que devuelve el 
	  */
	  public function getLastDateTime(){
		$query = "SELECT MAX(fecha_alta) as lastDateTime FROM orden";
		$lastDateTime = $this->mysql->query($query);
        header('content-type: application/json; charset=utf-8'); 
		if($lastDateTime[0][0]['lastDateTime'] == null) {
			$json_data = Array('dateTime'=>'0000-00-00 00:00:00');
		}else{
			$json_data = Array('dateTime'=>$lastDateTime[0][0]['lastDateTime']);
		}
		print(json_encode($json_data)); 
	 }
	  
	 /*
	  * Metodo que se encarga de registrar la orden
	  */
	 public function regOrderCustomer($idOrder,$orderNumber,$orderTotal,$dateTime,$idCustom,$idUser,$date_time){
	 	
	    $this->mysql->query("SELECT idOrder FROM  orders WHERE idOrder=".$idOrder);   
		 
		if($this->mysql->getNumFields() == 0){
			
			$customer = $this->mysql->query("SELECT idCustomer FROM customer WHERE  idCustom=".$idCustom);
						
			$values['idOrder'] = NULL ;
	        
	        $values['idCustomer'] = $customer[0]['customer']['idCustomer'];
	        
	        $values['orderNumber'] = $orderNumber;
	        
	        $values['orderTotal'] = $orderTotal;
	        
	        $values['status'] = 0;    
	    
		    $values['dateTime'] = $dateTime;
			
			$this->mysql->insert("orders", $values);
			/// Estamos insertando en la actividad que es lo qeu se acaba de hacer
			$orders  = $this->mysql->query("SELECT idOrder FROM orders WHERE orderNumber='".$orderNumber."'");
			$activity['idActivity'] = NULL ;
	   		$activity['orderID'] = $orders[0]['orders']['idOrder'];
	    	$activity['userID'] = $idUser;
	    	$activity['process'] = 0;
	    	$activity['action'] = 1;
	    	$activity['dateTime'] = $date_time;
			$this->mysql->insert("activity",$activity);
			
		
		}
		
	 }
	 
	/*
	 * Medodo que registra el customer en la base de datos 
	 */
	 public function regCustomerID($idUser){
	 	
		$values['idOrder'] = NULL ;
        $values['idCustomer'] = $idCustomer ;
        $values['orderNumber'] = $orderNumber;
        $values['orderTotal'] = $orderTotal;
        $values['status'] = 0;
        $values['dateTime'] = $dateTime;
        return $this->mysql->insert("orders", $values);	
		
	 }
	 /*
	  * Metodo que se encarga de registrar al customer y devuelve el id del registrado
	  */
	 public function regCostumerDB($name,$lastName,$custumerNumber,$email,$phone,$address,$city,$country,$title,$idCustom){
	 	 
	 	
		 $this->mysql->query("SELECT customerNumber 
		 					  FROM customer 
		 					  WHERE customerNumber='".$custumerNumber."'");
		 
		 if($this->mysql->getNumFields() == 0){
			 $sales_arr['idCustomer'] = NULL;
			 $sales_arr['name'] = $name;
			 $sales_arr['lastName'] = $lastName;
			 $sales_arr['customerNumber'] = $custumerNumber;
			 $sales_arr['email'] = $email;
			 $sales_arr['phone'] = $phone;
			 $sales_arr['address'] = $address;
			 $sales_arr['city'] = $city;
			 $sales_arr['country'] = $country;
			 $sales_arr['title'] = $title;
			 $sales_arr['datetime'] = date("Y-m-d H:i:s");
			 $sales_arr['status'] = 1;
			 $sales_arr['idCustom'] = $idCustom;
			 // Estableciendo el formato de salida del json
	        header('content-type: application/json; charset=utf-8'); 
			if($idCustomer = $this->mysql->insert("customer", $sales_arr)) {
				$json_data = Array('idCostumer'=>$idCustomer);
			}
		 }else{
		 
		 	header('content-type: application/json; charset=utf-8'); 
		 	
		 	$json_data = Array('msg'=>'El usuario ya ha sido registrado');
				
		 } 	
		
	 	print(json_encode($json_data));
	 }
	 
	 public function regItemsOrder($idOrder,$orderNumber,$itemId,$itemSku,$itemName,$itemQuantity,$itemPrice,$itemDate){
	 	
	 	 $this->mysql->query("SELECT idItem 
	 	 	                  FROM  orderitems 
	 	 	                  WHERE idItem=".$itemId);
		 
		 if($this->mysql->getNumFields() == 0){
	 
		 	 $sales_arr['idItem'] = NULL;
			 	 	
			 $sales_arr['idOrder'] = $idOrder;
			 
			 $sales_arr['orderNumber']=$orderNumber;
					 
			 $sales_arr['sku'] = $itemSku;
					 
			 $sales_arr['name'] = $itemName;
					 
			 $sales_arr['price'] = $itemPrice;
					 
			 $sales_arr['quantity'] = $itemQuantity;
					 
			 $sales_arr['status'] = 1;
					 
			 $sales_arr['dateTime'] = $itemDate;
			 
			 $this->mysql->insert('orderitems',$sales_arr);
		
		 }	 
		 	
	 }
	 
   /*
	* Metodo que devuelve la lista de las ventas que hay 
	*/
	 
	public function listOrdersOrigin(){
		
		//$mysql = new Mysql();
		
		$query = "SELECT o.idOrder as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, o.dateTime as dateTime,c.name as name, c.lastName as lastName,
						c.customerNumber as customerNumber,c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
				  FROM orders as o,customer as c 
                  WHERE o.idCustomer = c.idCustomer AND o.status=0";
		
		
		//$query = "SELECT * FROM orders WHERE status=0";
		
		
		//$query = "SELECT * FROM orders WHERE status=0";
		$sales = $this->mysql->query($query);
		
		if($sales[0]['o']['idOrder'] != 0 ){
			
			$res = $sales;
			
		}else{
			
			$res = FALSE;
			
		}
		
		return $res;
	}
	
   /*
    * Metodo que devuelve la lista de las ordenes que esteen confirmadas ose status=1
    */
   public function listOrdersDest(){
   	   		
   	   //	$mysql = new Mysql();
		
		$query = "SELECT o.idOrder as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, o.dateTime as dateTime,c.name as name, c.lastName as lastName,
						c.customerNumber as customerNumber,c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
				  FROM orders as o,customer as c 
                  WHERE o.idCustomer = c.idCustomer AND o.status=1";
		
		
		//$query = "SELECT * FROM orders WHERE status=1";
		
		$sales = $this->mysql->query($query);
		
		if($sales[0]['o']['idOrder'] != 0 ){
			
			$res = $sales;
			
		}else{
			
			$res = FALSE;
			
		}
		
		return $res;
   	
   }
   
     /*
    * Metodo que devuelve la lista de las ordenes que esteen confirmadas ose status=1
    */
   public function listOrdersDestFinal(){
   	   		
		date_default_timezone_set('America/La_Paz');
		/*$query = "SELECT o.idOrder as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, o.dateTime as dateTime,c.name as name, c.lastName as lastName,
						c.customerNumber as customerNumber,c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
				  FROM orders as o,customer as c 
                  WHERE o.idCustomer = c.idCustomer AND o.status=2";	
		*/
		$dateIni =  date("Y-m-d")." "."00:00:01";
		
		$dateEnd = date("Y-m-d")." "."24:59:59";
		
		$query = "SELECT DISTINCT(o.idOrder) as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, 
		                 o.dateTime as dateTime,c.name as name, c.lastName as lastName,c.customerNumber as customerNumber,
		                 c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
                  FROM orders as o,customer as c, activity as a 
                  WHERE o.idCustomer = c.idCustomer AND o.status=2 AND a.orderID = o.idOrder AND a.dateTime > '".$dateIni."' AND a.dateTime < '".$dateEnd."'";
		 //$query = "SELECT * FROM orders WHERE status=2";
		

		$sales = $this->mysql->query($query);
		
		if($sales[0]['o']['idOrder'] != 0 ){
			
			$res = $sales;
			
		}else{
			
			$res = FALSE;
			
		}
		
		return $res;
   	
   }
   
   
  /*
   * Metodo que realiza el cambio de estado de la orden 
   */
   public function changeToConfirmation($orderId,$dateTimeConf,$idUser){
	        
	     $values['status'] = 1; // Estableciendo el estado 

	     $conditions = "idOrder=".$orderId;
			 
		 $this->mysql->update('orders',$values,$conditions);	 
		 
		 $activity['idActivity'] = NULL;
	        
	   	 $activity['orderID'] = $orderId;
	        
	     $activity['userID'] = $idUser;
	        
	     $activity['process'] = 1;
	        
	     $activity['action'] = 1;
	        
	     $activity['dateTime'] = $dateTimeConf;
		   
		 $this->mysql->insert("activity",$activity);
			
   }
   
    
  /*
   * Metodo que changeToConfirmationFinal 
   */
   public function changeToConfirmationFinal($orderId,$dateTimeConf,$idUser){
	        
	     $values['status'] = 2; // Estableciendo el estado 

	     $conditions = "idOrder=".$orderId;
			 
		 $this->mysql->update('orders',$values,$conditions);
		 
		  $activity['idActivity'] = NULL;
	        
	   	 $activity['orderID'] = $orderId;
	        
	     $activity['userID'] = $idUser;
	        
	     $activity['process'] = 2;
	        
	     $activity['action'] = 1;
	        
	     $activity['dateTime'] = $dateTimeConf;
		   
		 $this->mysql->insert("activity",$activity);
		
			
   }
	
  /*
   * Metodo que se encarga de cancelar el item
   */ 
  public function cancelItem($idItem){
  	
	    $item = $this->mysql->query("SELECT idItem, orderNumber, price, quantity FROM  orderitems WHERE idItem=".$idItem);
		 
		 $itemID = $item[0]['orderitems']['idItem'];
		 
		 $orderNumber = $item[0]['orderitems']['orderNumber'];
		 
		 $price = $item[0]['orderitems']['price'];
		 
		 $quantity = $item[0]['orderitems']['quantity'];
		 
		 $lastPrice = $price*$quantity;
		 
		 $orders  = $this->mysql->query("SELECT idOrder,orderTotal FROM orders WHERE orderNumber='".$orderNumber."'");
		 
		 $idOrder = $orders[0]['orders']['idOrder'];
		 
		 $orderTotal = $orders[0]['orders']['orderTotal'];
		 
		 $orderTotal = $orderTotal - $lastPrice;
		 
		// $orderTotal = $orderTotal + ($price*$itemQuantity);
		
		  $values['orderTotal'] = $orderTotal; // Estableciendo el estado 

	     $conditions = "idOrder=".$idOrder;
			 
		 $this->mysql->update('orders',$values,$conditions);	 
		 
	/*	 $values2['quantity']  = $itemQuantity;
		 
		 $conditions2 = "idItem=".$itemID;
		 
		 $this->mysql->update('orderitems', $values2,$conditions2);
	*/
  		 $status['status'] = 0; // Estableciendo el estado 

	 	$conditions = "idItem=".$idItem;
			 
	 	$this->mysql->update('orderitems',$status,$conditions);
		
		header('content-type: application/json; charset=utf-8'); 
		
		//print_r($lastDateTime);
		$json_data = Array('orderTotal'=>$orderTotal);
			
		print(json_encode($json_data));	
  	
  }
  
  /*
   * Metodo que cancela la orden
   */
  public function cancelOrder($orderId){
  	
		 $values['status'] = 3; // Estableciendo el estado 

	     $conditions = "idOrder=".$orderId;
			 
		 $this->mysql->update('orders',$values,$conditions);
  	
  }
  
    /*
   * Metodo que saca la lista de todas las ordenes entregadas 
   */
  public function listCustomer(){
  	
  	$query ="SELECT c.name as name, c.lastName as lastName,c.customerNumber as customerNumber,
		                 c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
            		 FROM customer as c
            		 WHERE c.status=1";
	
	$orders = $this->mysql->query($query);
	
	
	$cont=0;
		
	$array_data = array();
	
	$json_data = array();
	
	foreach ($orders as $key => $value) {
		
		$array_data['name'] = $value['c']['name'];
		
		$array_data['lastName'] = $value['c']['lastName'];
		
		$array_data['customerNumber'] = $value['c']['customerNumber'];
		
		$array_data['email'] = $value['c']['email'];
		
		$array_data['phone'] = $value['c']['phone'];
		
		$array_data['address'] = $value['c']['address'];
		
		$array_data['city'] = $value['c']['city'];
		
		$array_data['country'] = $value['c']['country'];
		
		$array_data['title'] = $value['c']['title'];
		
		$json_data[$cont] = $array_data;
		
		$cont++;
		
	}
		
    print(json_encode($json_data));

	
  }
    
  /*
   * Metodo que saca la lista de todas las ordenes entregadas 
   */
  public function listOrderDelivery(){
  	
  	$query ="SELECT DISTINCT(o.idOrder) as idOrder,o.orderNumber as orderNumber,o.orderTotal as orderTotal, 
		                 o.dateTime as dateTime,c.name as name, c.lastName as lastName,c.customerNumber as customerNumber,
		                 c.email as email,c.phone as phone,c.address as address,c.city as city,c.country as country, c.title as title  
             FROM orders as o,customer as c, activity as a 
             WHERE o.idCustomer = c.idCustomer AND o.status=2";
	
	$orders = $this->mysql->query($query);
	
	
	$cont=0;
		
	$array_data = array();
	
	$json_data = array();
	
	foreach ($orders as $key => $value) {
		
		$array_data['idOrder'] = $value['o']['idOrder'];
		
		$array_data['orderNumber'] = $value['o']['orderNumber'];
		
		$array_data['orderTotal'] = $value['o']['orderTotal'];
		
		$array_data['dateTime'] = $value['o']['dateTime'];
		
		$array_data['name'] = $value['c']['name'];
		
		$array_data['lastName'] = $value['c']['lastName'];
		
		$array_data['customerNumber'] = $value['c']['customerNumber'];
		
		$array_data['email'] = $value['c']['email'];
		
		$array_data['phone'] = $value['c']['phone'];
		
		$array_data['address'] = $value['c']['address'];
		
		$array_data['city'] = $value['c']['city'];
		
		$array_data['country'] = $value['c']['country'];
		
		$array_data['title'] = $value['c']['title'];
		
		$json_data[$cont] = $array_data;
		
		$cont++;
		
	}
		
    print(json_encode($json_data));

	
  }
  
  /*
   * Este metodo realiza la actualizacion de las catidades
   */
   public function updateItem($idItem,$itemQuantity){
   	
	     $item = $this->mysql->query("SELECT idItem, orderNumber, price, quantity FROM  orderitems WHERE idItem=".$idItem);
		 
		 $itemID = $item[0]['orderitems']['idItem'];
		 
		 $orderNumber = $item[0]['orderitems']['orderNumber'];
		 
		 $price = $item[0]['orderitems']['price'];
		 
		 $quantity = $item[0]['orderitems']['quantity'];
		 
		 $lastPrice = $price*$quantity;
		 
		 $orders  = $this->mysql->query("SELECT idOrder,orderTotal FROM orders WHERE orderNumber='".$orderNumber."'");
		 
		 $idOrder = $orders[0]['orders']['idOrder'];
		 
		 $orderTotal = $orders[0]['orders']['orderTotal'];
		 
		 $orderTotal = $orderTotal - $lastPrice;
		 
		 $orderTotal = $orderTotal + ($price*$itemQuantity);
		
		  $values['orderTotal'] = $orderTotal; // Estableciendo el estado 

	     $conditions = "idOrder=".$idOrder;
			 
		 $this->mysql->update('orders',$values,$conditions);	 
		 
		 $values2['quantity']  = $itemQuantity;
		 
		 $conditions2 = "idItem=".$itemID;
		 
		 $this->mysql->update('orderitems', $values2,$conditions2);
		 
		 // Estableciendo el formato de salida del json
        header('content-type: application/json; charset=utf-8'); 
		
		//print_r($lastDateTime);
		$json_data = Array('orderTotal'=>$orderTotal);
			
		print(json_encode($json_data));
		    	
		
   }
	 
} 

    
?>
