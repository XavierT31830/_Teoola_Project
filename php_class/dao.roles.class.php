<?php

require_once ('cnx.class.php');

  class DAO_roles {
    private $cnx = null;
    private $openCnx = null;

    const HOST = 'mysql:host=localhost;dbname=traductions';
    const LOGIN = 'root';
    const PASSWORD = '';

    public function cnx() {
      $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
      $this -> openCnx = $this -> cnx -> openConnexion();
    }

    public function getRoleByID($id) {
      $this -> cnx();
      $sql = 'SELECT * FROM `roles` WHERE `id_role` = :id_role';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_role', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

  }

?>