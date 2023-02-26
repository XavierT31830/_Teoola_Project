<?php

  require_once('cnx_config_class.php');

  class DAO_roles extends Cnx_config {

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

    public function getRoles() {
      $this -> cnx();
      $sql = 'SELECT * FROM `roles`';
      $request = $this -> openCnx -> prepare($sql);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

  }

?>