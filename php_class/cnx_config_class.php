<?php

  require_once('cnx_class.php');

  class Cnx_config {
    protected $cnx = null;
    protected $openCnx = null;

    const HOST = 'mysql:host=localhost;dbname=teoola_translations';
    const LOGIN = 'teoola';
    const PASSWORD = 'Teoola@31';

    protected function cnx() {
      $this -> cnx = new Dbcnx(self::HOST, self::LOGIN, self::PASSWORD);
      $this -> openCnx = $this -> cnx -> openConnexion();
    }
  }

?>