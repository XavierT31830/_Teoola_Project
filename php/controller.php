<?php

  require ('../php_class/dao.users.class.php');
  require ('../php_class/dao.applications.class.php');
  require ('../php_class/dao.roles.class.php');
  require ('../php_class/dao.relations.class.php');

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
      $dao_app = new DAO_applications();
      $title = security($receiveData -> title);
      $appdesc = security($receiveData -> appdesc);
      if (verifTitleApp($title) != 1) {
        $msg_insert = verifTitleApp($title);
        echo json_encode($msg_insert);
      }
      else {
        $bool = $dao_app -> insertApp($receiveData);
        if ($bool) {
          $msg_insert = 'New application correctly added!';
          // Now => create relation :
          $dao_user = new DAO_users();
          $dao_role = new DAO_roles();
          $dao_relation = new DAO_relations();
          $data = $dao_app -> getAppByTitle($title);
          $user_infos = $dao_user -> getUserByID($data['user_id']);
          $data['role_id'] = 1; // Auto-assign Admin/Owner rôle on app_creation
          $role = $dao_role -> getRoleByID($data['role_id']);
          $data['email'] = $user_infos['email'];
          $data['role'] = $role['role'];
          $data['msg'] = $msg_insert;
          $relation = $dao_relation -> createAdminRelation($data);
          if (!$relation) {
            $delete = $dao_app -> deleteAppByID($data['id_app']);
            if ($delete) {
              $msg_insert = 'Error at application creation! Please try again...';
            }
            else {
              $msg_insert = 'Unexpected error!!';
            }
            $data['msg'] = $msg_insert;
            echo json_encode($data['msg']);
          }
          else {
            echo json_encode($data);
          }
        }
        else {
          $msg_insert = 'Application-Title already exists!';
          echo json_encode($msg_insert);
        }
      }
      
      break;

    case 'displayapps':
      $dao = new DAO_applications();
      $data = $dao -> getAppsByUserID($receiveData -> id_user);
      echo json_encode($data);
      break;
    
    default:
      # code...
      break;
  }

  ?>