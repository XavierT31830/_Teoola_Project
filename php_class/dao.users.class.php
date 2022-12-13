<?php

  require_once ('cnx.class.php');

  class DAO_users {
    private $cnx = null;
    private $openCnx = null;

    const HOST = 'mysql:host=localhost;dbname=traductions';
    const LOGIN = 'root';
    const PASSWORD = '';

    public function cnx() {
      $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
      $this -> openCnx = $this -> cnx -> openConnexion();
    }

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
      $sql = 'SELECT * FROM traductions.users 
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
      $sql = 'SELECT * FROM traductions.users 
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