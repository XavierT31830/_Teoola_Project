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

  switch ($action) {
    // LOGIN
    case 'logIn':
      $msg_insert = logIn($receiveData, 'DAO_users', 'getUserByMail');
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
    // SIGNUP
    case 'signUp':
      $msg_insert = signUp($receiveData, 'DAO_users', 'insertUser');
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
    // CREATE APP
    case 'createApp':
      $dao_app = new DAO_applications();
      $title = security($receiveData -> title);
      $appdesc = security($receiveData -> appdesc);
      if (verifTitleApp($title) != 1) {
        $msg_insert = verifTitleApp($title);
      }
      else {
        $title = str_replace(' ', '_', $title);
        $receiveData -> title = $title;
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
    //-----------------------------------------------------------------------------------------------//
    // DISPLAY USER APPS BY USER_ID
    case 'getUserApps':
      $data = dataById($receiveData, 'DAO_applications', 'getAppsByUserID', 'id_user');
      $msg = dataOrMsg($data, $action);
      if ($data !== 'empty') {
        $images = scanImgAppsDir($arrFiles, $imageFolder, $data);
        echo json_encode($images);
      }
      else {
        echo json_encode($msg);
      }
      break;
    //-----------------------------------------------------------------------------------------------//
    // GET APP BY APP_ID
    case 'getApp':
      $data = dataById($receiveData, 'DAO_applications', 'getAppByID', 'id_app');
      $msg = dataOrMsg($data, $action);
      if (!is_string($msg)) {
        $img = getImgAppName($arrFiles, $imageFolder, $msg);
        echo json_encode($img);
      }
      else {
        echo json_encode($msg);
      }
      break;
    //-----------------------------------------------------------------------------------------------//
    // GET ROLES
    case 'getRoles':
      $data = dataAll('DAO_roles', 'getRoles');
      $msg_insert = dataOrMsg($data, $action);
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
    // GET USERS
    case 'getUsers':
      $data = dataAll('DAO_users', 'getUsers');
      $msg_insert = dataOrMsg($data, $action);
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
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
    //-----------------------------------------------------------------------------------------------//    
    default:
      $msg_insert = 'Controller -> Switch Case null! (dflt msg)';
      echo json_encode($msg_insert);
      break;
      //-----------------------------------------------------------------------------------------------//
  }

  function logIn($receiveData, $class, $func) {
    $dao = new $class();
    $email = $receiveData -> email;
    $pwdUser = $receiveData -> pwd;
    if (verifEmail($email) == 1) {
      $data = $dao -> $func($email);
      if ($data == false) {
        $msg = 'This email doesn\'t exist!';
      }
      else {
        if (verifPwd($pwdUser) == 1) {
          $pwdData = ($data['pwd']);
          $pwdUser = hash('sha256', $receiveData -> pwd);
          if ($pwdUser == $pwdData) {
            $msg = $data;
          }
          else {
            $msg = 'Incorrect Password!';
          }
        }
        else {
          $msg = verifPwd($pwdUser);
        }
      }
    }
    return $msg;
  }

  function signUp($receiveData, $class, $func) {
    $dao = new $class();
    $lastname = $receiveData -> lastname;
    $firstname = $receiveData -> firstname;
    $email = $receiveData -> email;
    $pwd = $receiveData -> pwd;
    $pwdConfirm = $receiveData -> pwdConfirm;
    if (verifName($lastname) == 1 && verifName($firstname) == 1 && verifEmail($email) == 1 && verifPwd($pwd) == 1 && verifPwd($pwdConfirm) == 1) {
      if ($pwd != $pwdConfirm) {
        $msg = 'Password confirmation is incorrect!';
      }
      else {
        $lastname = security($receiveData -> lastname);
        $firstname = security($receiveData -> firstname);
        $email = security($receiveData -> email);
        $pwd = security($receiveData -> pwd);
        $receiveData -> pwd = hash('sha256', $receiveData -> pwd);
        $bool = $dao -> $func($receiveData);
        if ($bool) {
          $msg = 'New user correctly registered!';
        }
        else {
          $msg = 'User already exists!';
        }
      }
    }
    else {
      if (verifName($lastname) != 1) {
        $msg = verifName($lastname);
      }
      else if (verifName($firstname) != 1) {
        $msg = verifName($firstname);
      }
      else if (verifEmail($email) != 1) {
        $msg = verifEmail($email);
      }
      else if (verifPwd($pwd) != 1) {
        $msg = verifPwd($pwd);
      }
      else if (verifPwd($pwdConfirm) != 1) {
        $msg = 'Invalid Password Confirmation!';
      }
    }
    return $msg;
  }

  function dataAll($class, $func) {
    $dao = new $class();
    $data = $dao -> $func();
    return $data;
  }

  function dataById($receiveData, $class, $func, $id) {
    $dao = new $class();
    $data = $dao -> $func($receiveData -> $id);
    return $data;
  }

  function dataOrMsg($data, $action) {
    switch ($action) {
      //------------------------------------------------------------------//
      case 'getUserApps':
        $success = 'User App. List getted!';
        $error = 'Folder doesn\'t exists!';
      break;
      //------------------------------------------------------------------//
      case 'getApp':
        $success = 'App. getted!';
        $error = 'Error on getting App!';
      break;
      //------------------------------------------------------------------//
      case 'getRoles':
          $success = 'Roles getted!';
          $error = 'Error on getting roles!';
        break;
      //------------------------------------------------------------------//
      case 'getUsers':
          $success = 'Users getted!';
          $error = 'Error on getting users!';
        break;
      //------------------------------------------------------------------//
      default:
        $msg = 'Error : #dataOrMsg($data, $case)';
        break;
      //------------------------------------------------------------------//
    }
    if ($data && $data !== 'empty') {
      $data['msg'] = $success;
      $msg = $data;
    }
    else {
      $msg = $error;
    }
    return $msg;
  }

  ?>