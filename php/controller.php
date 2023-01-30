<?php

  require ('../php_class/dao.users.class.php');
  require ('../php_class/dao.applications.class.php');
  require ('../php_class/dao.roles.class.php');
  require ('../php_class/dao.relations.class.php');

  require ('folders_stuff.php');
  require ('back_security.php');
  require ('verif_data.php');
  require ('scandir_img_link.php');

  $receiveData = json_decode(file_get_contents('php://input'));
  $action = $receiveData -> action;

  // THE BIG LEBOWSWITCH //
  switch ($action) {
    // LOGIN
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

    // SIGNUP
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

    // CREATE APP
    case 'createApp':
      $dao_app = new DAO_applications();
      $title = security($receiveData -> title);
      $appdesc = security($receiveData -> appdesc);
      if (verifTitleApp($title) != 1) {
        $msg_insert = verifTitleApp($title);
      }
      else {
        $bool = $dao_app -> insertApp($receiveData);
        if (!$bool) {
          $msg_insert = 'Application-Title already exists!';
        }
        else {
          // Now => create relation :
          $dao_relation = new DAO_relations();
          $data = $dao_app -> getAppById(intVal($bool));
          $data['role_id'] = 1; // Auto-assign to Admin/Owner rôle on app_creation
          $relation = $dao_relation -> createAdminRelation($data);
          if (!$relation) {
            $delete = $dao_app -> deleteAppByID($data['id_app']);
            if ($delete) {
              $msg_insert = 'Error when creating relation! Application correctly deleted, please try again...';
            }
            else {
              $msg_insert = 'Error when creating relation, then, error on deleting application!!';
            }
          }
          else if ($relation) {
            $msg_insert = 'New application correctly added!';
            $data['msg'] = $msg_insert;
            echo json_encode($data);
            exit;
          }
          else {
            $msg_insert = 'Fatal Error!!';
          }
        }
      }
      echo json_encode($msg_insert);
      break;

    // DISPLAY USER APPS BY USER_ID
    case 'getUserApps':
      $dao = new DAO_applications();
      $data = $dao -> getAppsByUserID($receiveData -> id_user);
      if ($data !== 'empty') {
        echo json_encode(scanImgAppsDir($arrFiles, $imageFolder, $data));
      }
      else {
        $msg_insert = 'Folder doesn\'t exists!';
        echo json_encode($msg_insert);
      }

      break;

    // GET APP BY APP_ID
    case 'getApp':
      $dao = new DAO_applications();
      $data = $dao -> getAppByID($receiveData -> id_app);
      if ($data) {
        $msg_insert = 'App. getted!';
        $data['msg'] = $msg_insert;
        echo json_encode(getImgAppName($arrFiles, $imageFolder, $data));
      }
      else {
        $msg_insert = 'Error on getting app!';
        echo json_encode($msg_insert);
      }
      break;

    // GET ROLES
    case 'getRoles':
      $dao = new DAO_roles();
      $data = $dao -> getRoles();
      if ($data) {
        $msg_insert = 'Roles getted!';
        $data['msg'] = $msg_insert;
        echo json_encode($data);
      }
      else {
        $msg_insert = 'Error on getting roles!';
      }
      break;

    // GET USERS
    case 'getUsers':
      $dao = new DAO_users();
      $data = $dao -> getUsers();
      if ($data) {
        $msg_insert = 'Users getted!';
        $data['msg'] = $msg_insert;
        echo json_encode($data);
      }
      else {
        $msg_insert = 'Error on getting users!';
      }
      break;

    // MANAGE APP
    case 'manageApp':
      $dao_app = new DAO_applications();
      $dao_role = new DAO_roles();
      $dao_user = new DAO_users();
      $dao_relation = new DAO_relations();

      $title = $receiveData -> title;
      $old_title = $receiveData -> old_title;
      $titleApps = $dao_app -> getTitleApps();
      for ($i = 0; $i <= count($titleApps) - 1 ; $i++) {
        if ($title === $titleApps[$i]['title']) {
          $msg_insert = 'This Title already exists!';
          echo json_encode($msg_insert);
          break 2;
        }
      }
      if (verifTitleApp($title) != 1) {
        $msg_insert = verifTitleApp($title);
        echo json_encode($msg_insert);
      }
      else {
        // $title is OK
        $data = $dao_app -> updateApp($receiveData);
        $updateData = $dao_app -> getAppByID($receiveData -> id_app);
        $updateData['old_title'] = $old_title;
        $updateData['msg'] = 'App. correctly modified!';
        echo json_encode(updateImgAppName($arrFiles, $imageFolder, $updateData));
      }
      break;
    
    // DEFAULT
    default:
      # code...
      break;
  }

  ?>