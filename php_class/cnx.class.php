





<?php

class Dbcnx {
  protected $connect = null;

  const OPTIONS = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  );

  public function __construct($host, $login, $password) {
    $this -> host = $host;
    $this -> login = $login;
    $this -> password = $password;
  }

  public function openConnexion() {
    if ($this -> connect == null) {
      try {
        $this -> connect = new PDO(
          $this -> host,
          $this -> login,
          $this -> password,
          self::OPTIONS
        );
        return $this -> connect;
      }
      catch (PDOException $error) {
        var_dump($error -> getMessage());
        exit();
      }
    }
  }

  public function closeConnexion() {
    $this -> connect = null;
  }
}

?>