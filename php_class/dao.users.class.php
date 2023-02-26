<?php

  require_once('cnx.config.class.php');

  class DAO_users extends Cnx_config {

    public function insertUser($receiveData) {
      $this -> cnx();
      $sql = 'INSERT INTO `users` (`last_name`, `first_name`, `email`, `pwd`) 
              VALUES (:lastname, :firstname, :email, :pwd)';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':lastname', $receiveData -> lastname);
      $request -> bindValue(':firstname', $receiveData -> firstname);
      $request -> bindValue(':email', $receiveData -> email);
      $request -> bindValue(':pwd', $receiveData -> pwd);
      $bool = $request -> execute();
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function getUserByMail($email) {
      $this -> cnx();
      $sql = 'SELECT * FROM teoola_translations.users 
              WHERE BINARY `users`.`email` = :email';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':email', $email);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getUserByID($id) {
      $this -> cnx();
      $sql = 'SELECT * FROM teoola_translations.users 
              WHERE BINARY `users`.`id_user` = :id_user';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_user', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getUsers() {
      $this -> cnx();
      $sql = 'SELECT `id_user`, `last_name`, `first_name`, `email` FROM `users`';
      $request = $this -> openCnx -> prepare($sql);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

  }

?>