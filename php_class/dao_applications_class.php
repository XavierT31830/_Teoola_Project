<?php

  require_once('cnx_config_class.php');

  class DAO_applications extends Cnx_config {

    public function insertApp($receiveData) {
      $this -> cnx();
      $sql = 'INSERT INTO `applications` (`title`, `description`, `user_id`) 
              VALUES (:title, :appdesc, :id_user)';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':id_user' => $receiveData -> id_user,
        ':title' => $receiveData -> title,
        ':appdesc' => $receiveData -> appdesc,
      );
      $bool = $request -> execute($data);
      $result = $bool ? $this -> openCnx -> lastInsertId() : $bool;
      $this -> cnx -> closeConnexion();
      return $result;
    }

    public function getAppsByUserID($id) {
      $this -> cnx();
      $sql = 'SELECT * 
              FROM `applications` 
              WHERE `user_id` = :id_user';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_user', $id);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getAppTitles() {
      $this -> cnx();
      $sql = 'SELECT `title` 
              FROM `applications`';
      $request = $this -> openCnx -> prepare($sql);
      $request -> execute();
      $data = $request -> fetchAll();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getAppByTitle($title) {
      $this -> cnx();
      $sql = 'SELECT * 
              FROM `applications` 
              WHERE `title` = :title';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':title', $title);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getAppByID($id) {
      $this -> cnx();
      $sql = 'SELECT * 
              FROM `applications` 
              WHERE `id_app` = :id';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function getAppTitleByID($id) {
      $this -> cnx();
      $sql = 'SELECT `title` 
              FROM `applications` 
              WHERE `id_app` = :id';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id', $id);
      $request -> execute();
      $data = $request -> fetch();
      $this -> cnx -> closeConnexion();
      return $data;
    }

    public function deleteAppByID($id) {
      $this -> cnx();
      $sql = 'DELETE FROM `applications` 
              WHERE `id_app` = :id_app';
      $request = $this -> openCnx -> prepare($sql);
      $request -> bindValue(':id_app', $id);
      $bool= $request -> execute($request);
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function updateApp($receiveData) {
      $this -> cnx();
      $sql = 'UPDATE `applications` 
              SET `title` = :title, `description` = :appdesc, `content` = :content 
              WHERE `id_app` = :id_app';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':title' => $receiveData -> title,
        ':appdesc' => $receiveData -> description,
        ':content' => $receiveData -> content,
        ':id_app' => $receiveData -> id_app,
      );
      $bool = $request -> execute($data);
      $this -> cnx -> closeConnexion();
      return $bool;
    }

    public function updateAppWithoutTitle($receiveData) {
      $this -> cnx();
      $sql = 'UPDATE `applications` 
              SET `description` = :appdesc, `content` = :content 
              WHERE `id_app` = :id_app';
      $request = $this -> openCnx -> prepare($sql);
      $data = array(
        ':appdesc' => $receiveData -> description,
        ':content' => $receiveData -> content,
        ':id_app' => $receiveData -> id_app,
      );
      $bool = $request -> execute($data);
      $this -> cnx -> closeConnexion();
      return $bool;
    }

  }
