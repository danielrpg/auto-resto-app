<?php

require_once 'app/core/Mysql.php';
/**
 * Esta e la clase que gestion todo todo lo que los datos del usuario
 *
 * @author Daniel Fernandez
 */
class Users {
    /*
     * Este es el constructo de del modelo HomeModel
     */
    public function __construct() {
        /// Este es el metodo constructor
        
    }
	/*
	 * Esta es la funcion que ingresa el año para que se vea en el footer
	 */
	public function date_now(){	
		return date( "Y" ); 
	} 
    /*
     * Este es el metodo que verifica 
     * @return boolean si exite o no en la base de datos
     */
    public function verifyUser($user,$password){
        $this->iniSession($user, $password);
        $mysql = new Mysql();
		$query = "SELECT usr.id_usuario, usr.nombre_usuario, usr.apellido_usuario,usr.login_usuario, usr.email_usuario,usr.contrasena_usuario, per.nombre_permiso 
                  FROM usuario AS usr, permisos AS per, rol AS r, servicio AS serv 
                  WHERE usr.id_usuario=per.id_usuario 
                        AND r.id_servicio=serv.id_servicio
                        AND serv.nombre_servicio='Administracion'
                        AND per.nombre_permiso='Administracion' 
                        AND usr.contrasena_usuario='$password' 
                        AND usr.login_usuario='$user'";   // se realiza la consulta en la BD verificando que tipo de usuario es y que roles tiene
	    $users = $mysql->query($query);
        if($users[0]['per']['nombre_permiso'] ==='Administracion'){  // En caso de que el usuario sea administrador
            $json_data = Array('login'=>$users[0]['usr']['login_usuario'],
                               'password'=>$users[0]['usr']['contrasena_usuario'],
                               'completo'=>true);   
            $_SESSION['idUser'] = $users[0]['usr']['id_usuario'];
            $_SESSION['name'] = $users[0]['usr']['nombre_usuario'];
            $_SESSION['lastName'] = $users[0]['usr']['apellido_usuario'];
            $_SESSION['login'] = $users[0]['usr']['login_usuario'];
            $_SESSION['mail'] = $users[0]['usr']['email_usuario'];
            $_SESSION['password'] = $users[0]['usr']['contrasena_usuario'];
        }else{
            $json_data = Array('completo'=>false);
        }
        return json_encode($json_data);
    }
    
    /*
     * Esta es la funcion que verifica la session del usuario
     */
    
    public function verifySession(){
        session_start();
        $res_session = false;
        if(isset($_SESSION['name']) && isset($_SESSION['login']) && isset($_SESSION['password'])){
            $res_session = true;
        }
        return $res_session;
    }
    
    /*
     * Esta es la funcion que crea la session
     */
    public function iniSession($user, $password){
        session_start();
        $_SESSION['user'] = $user;
        $_SESSION['password'] = $password;
    }
	
	/*
     * Esta es la funcion que cierra la session del usuario
     */
    public function logout_user(){
        session_start();
        session_unset();
        session_destroy();
        header('Location: index.php');
    }
    
}

?>
