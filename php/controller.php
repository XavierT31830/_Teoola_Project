


<?php

  require ('../php_class/dao.users.class.php');
  require ('../php_class/dao.applications.class.php');

  require ('back_security.php');
  require ('verif_data.php');


  $receiveData = json_decode(file_get_contents('php://input'));
  $action = $receiveData -> action;

  switch ($action) {
    case 'logIn':
      $dao = new DAO_users();
      $email = $receiveData -> email;
      $pwdUser = $receiveData -> pwd;
      if (verifEmail($email) == 1) {
        $data = $dao -> getUserByMail($email);
        if ($data == false) {
          $msg_insert = 'This email doesn\'t exist!';
        }
        else {
          if (verifPwd($pwdUser) == 1) {
            $pwdData = ($data['pwd']);
            $pwdUser = hash('sha256', $receiveData -> pwd);
            if ($pwdUser == $pwdData) {
              echo json_encode($data);
              break;
            }
            else {
              $msg_insert = 'Incorrect Password!';
            }
          }
          else {
            $msg_insert = verifPwd($pwdUser);
          }
        }
      }
      echo json_encode($msg_insert);
      break;

    case 'signUp':
      $dao = new DAO_users();
      $lastname = $receiveData -> lastname;
      $firstname = $receiveData -> firstname;
      $email = $receiveData -> email;
      $pwd = $receiveData -> pwd;
      $pwdConfirm = $receiveData -> pwdConfirm;
      if (verifName($lastname) == 1 && verifName($firstname) == 1 && verifEmail($email) == 1 && verifPwd($pwd) == 1 && verifPwd($pwdConfirm) == 1) {
        if ($pwd != $pwdConfirm) {
          $msg_insert = 'Password confirmation is incorrect!';
        }
        else {
          $lastname = security($receiveData -> lastname);
          $firstname = security($receiveData -> firstname);
          $email = security($receiveData -> email);
          $pwd = security($receiveData -> pwd);
          $receiveData -> pwd = hash('sha256', $receiveData -> pwd);
          $bool = $dao -> insertUser($receiveData);
          if ($bool) {
            $msg_insert = 'New user correctly registered!';
          }
          else {
            $msg_insert = 'User already exists!';
          }
        }
      }
      else {
        if (verifName($lastname) != 1) {
          $msg_insert = verifName($lastname);
        }
        else if (verifName($firstname) != 1) {
          $msg_insert = verifName($firstname);
        }
        else if (verifEmail($email) != 1) {
          $msg_insert = verifEmail($email);
        }
        else if (verifPwd($pwd) != 1) {
          $msg_insert = verifPwd($pwd);
        }
        else if (verifPwd($pwdConfirm) != 1) {
          $msg_insert = 'Invalid Password Confirmation!';
        }
      }
      echo json_encode($msg_insert);
      break;

    case 'createapp':
      $dao = new DAO_applications();
      $title = security($receiveData -> title);
      $appdesc = security($receiveData -> appdesc);
      if (verifTitleApp($title) != 1) {
        $msg_insert = verifTitleApp($title);
      }
      else {
        $bool = $dao -> insertApp($receiveData);
        if ($bool) {
          $msg_insert = 'New application correctly added!';
        }
        else {
          $msg_insert = 'Application-Title already exists!';
        }
      }
      echo json_encode($msg_insert);
      break;
    
    default:
      # code...
      break;
  }

  ?>