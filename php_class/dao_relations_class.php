<?php

  require_once('cnx_config_class.php');

  class DAO_relations extends Cnx_config {

    public function createAdminRelation($receiveData) {
      $this -> cnx();
      $sql = 'INSERT INTO `relation_app_users_roles` (`app_id`, `user_id`, `role_id`) 
              VALUES (:id_app, :id_user, :id_role)';
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
