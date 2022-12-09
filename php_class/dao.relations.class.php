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
      $sql = 'INSERT INTO `relation_app_users` (`app_id`, `app_title`, `user_id`, `user_email`, `role_id`, `role_role`) VALUES (:id_app, :app_title, :id_user, :user_email, :id_role, :role_role)';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':id_app' => $receiveData['id_app'],
        ':app_title' => $receiveData['title'],
        ':id_user' => $receiveData['user_id'],
        ':user_email' => $receiveData['email'],
        ':id_role' => $receiveData['role_id'],
        ':role_role' => $receiveData['role'],
      );
      $bool = $request -> execute($data);
      $this -> cnx -> closeConnexion();
      return $bool;
    }

  }

?>