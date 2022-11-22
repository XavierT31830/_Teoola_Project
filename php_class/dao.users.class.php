


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

  public function getUser($data) {
    $this -> cnx();
    $sql = 'SELECT * FROM traductions.users 
            INNER JOIN roles 
            ON users.role_id = roles.id_role 
            WHERE BINARY `users`.`email` = :email 
            AND `users`.`pwd` = :pwd';
    $request = $this -> openCnx -> prepare($sql);
    $request -> bindValue(':email', $data -> email);
    $request -> bindValue(':pwd', $data -> pwd);
    $request -> execute();
    $data = $request -> fetch();
    $this -> cnx -> closeConnexion();
    return $data;
  }

}


?>