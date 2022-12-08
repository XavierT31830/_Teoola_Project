<?php

require_once ('cnx.class.php');

class DAO_relations {
  private $cnx = null;
  private $openCnx = null;

  const HOST = 'mysql:host=localhost;dbname=traductions';
  const LOGIN = 'root';
  const PASSWORD = '';

  public function cnx() {
    $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
    $this -> openCnx = $this -> cnx -> openConnexion();
  }

  public function createAdminRelation($receiveData) {
    $this -> cnx();
    $sql = 'INSERT INTO `relation_app_users` (`app_id`, `user_id`, `role_id`) VALUES (:id_app, :id_user, :id_role)';
    $request = $this -> openCnx -> prepare($sql);
    $data = array(
      ':id_app' => $receiveData['id_app'],
      ':id_user' => $receiveData['user_id'],
      ':id_role' => $receiveData['role_id'],
    );
    $bool = $request -> execute($data);
    $this -> cnx -> closeConnexion();
    return $bool;
  }

}

?>