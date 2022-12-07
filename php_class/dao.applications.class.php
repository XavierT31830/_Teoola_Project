


<?php

  require_once ('cnx.class.php');

  class DAO_applications {
    private $cnx = null;
    private $openCnx = null;

    const HOST = 'mysql:host=localhost;dbname=traductions';
    const LOGIN = 'root';
    const PASSWORD = '';

    public function cnx() {
      $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
      $this -> openCnx = $this -> cnx -> openConnexion();
    }

    public function insertApp($receiveData) {
      $this -> cnx();
      $sql = 'INSERT INTO `applications` (`title`, `description`, `user_id`) VALUES (:title, :appdesc, :id_user)';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':id_user' => $receiveData -> id_user,
        ':title' => $receiveData -> title,
        ':appdesc' => $receiveData -> appdesc,
      );
      $bool = $request -> execute($data);
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function getUserApps($id) {
      $this -> cnx();
      $sql = 'SELECT * FROM `applications` WHERE `user_id` = :id_user';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_user', $id);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getAppTitle($title) {
      $this -> cnx();
      $sql = 'SELECT `title` FROM `applications` WHERE `title` = :title';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':title', $title);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

  }

?>