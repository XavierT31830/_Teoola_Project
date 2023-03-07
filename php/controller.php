<?php

  require ('../php_class/dao_users_class.php');
  require ('../php_class/dao_applications_class.php');
  require ('../php_class/dao_roles_class.php');
  require ('../php_class/dao_relations_class.php');

  require ('folders_stuff.php');
  require ('back_security.php');
  require ('verif_data.php');
  require ('scandir_img_link.php');

  $receiveData = json_decode(file_get_contents('php://input'));
  $action = $receiveData -> action;

  switch ($action) {
    //-----------------------------------------------------------------------------------------------//
    case 'logIn':
      $msg_insert = logIn($receiveData, 'DAO_users', 'getUserByMail');
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
    case 'signUp':
      $msg_insert = signUp($receiveData, 'DAO_users', 'insertUser');
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
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
        $appTitles = $dao_app -> getAppTitles();
        $titleIsNew = true;
        foreach ($appTitles as $value) {
          if ($title == $value['title']) {
            $titleIsNew = false;
          }
        }
        if (!$titleIsNew) {
          $msg_insert = 'Application-Title already exists!';
        }
        else {
          // Insert New App :
          $bool = $dao_app -> insertApp($receiveData);
          if (!$bool) {
            $msg_insert = 'Error on creating new Application!';
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
              $msg = 'New application correctly added!';
              $data['msg'] = $msg;
              $msg_insert = $data;
            }
            else {
              $msg_insert = 'Fatal Error!!';
            }
          }
        }
      }
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
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
    case 'getRoles':
      $data = dataAll('DAO_roles', 'getRoles');
      $msg_insert = dataOrMsg($data, $action);
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
    case 'getUsers':
      $data = dataAll('DAO_users', 'getUsers');
      $msg_insert = dataOrMsg($data, $action);
      echo json_encode($msg_insert);
      break;
    //-----------------------------------------------------------------------------------------------//
    case 'manageApp':
      $dao_app = new DAO_applications();
      $dao_role = new DAO_roles();
      $dao_user = new DAO_users();
      $dao_relation = new DAO_relations();
      $title = security($receiveData -> title);
      if (verifTitleApp($title) != 1) {
        $msg_insert = verifTitleApp($title);
      }
      else {
        $title = str_replace(' ', '_', $title);
        $receiveData -> title = $title;
        $old_title = $receiveData -> old_title;
        $appTitles = $dao_app -> getAppTitles();
        $titleIsNew = true;
        foreach ($appTitles as $value) {
          if ($title == $value['title']) {
            $titleIsNew = false;
          }
        }
        $id = $receiveData -> id_app;
        $data = $dao_app -> getAppTitleByID($id);
        $newData = '';
        if ($titleIsNew === false) {
          if ($data['title'] === $title) {
            $msg = 'App. correctly modified with same Title!';
            $newData = $dao_app -> updateAppWithoutTitle($receiveData);
          }
          else {
            $msg_insert = 'This Title already exists in another application!';
          }
        }
        else {
          $msg = 'App. correctly modified!';
          $newData = $dao_app -> updateApp($receiveData);
        }
        if ($newData !== '') {
          $updateDataAndImg = $dao_app -> getAppByID($id);
          $updateDataAndImg['old_title'] = $old_title;
          $updateDataAndImg['msg'] = $msg;
          $msg_insert = updateImgAppName($arrFiles, $imageFolder, $updateDataAndImg);
        }
        else {
          $msg_insert = 'Fatal Error!';
        }
      }
      echo json_encode($msg_insert);
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
    else {
      $msg = verifEmail($email);
    }
    return $msg;
  }

  function signUp($receiveData, $class, $func) {
    $dao = new $class();

    $last_name = $receiveData -> last_name;
    $first_name = $receiveData -> first_name;
    $email = $receiveData -> email;
    $pwd = $receiveData -> pwd;
    $pwdConfirm = $receiveData -> pwdConfirm;

    if (verifName($last_name) == 1 && verifName($first_name) == 1 && verifEmail($email) == 1 && verifPwd($pwd) == 1 && verifPwd($pwdConfirm) == 1) {
      if ($pwd != $pwdConfirm) {
        $msg = 'Password confirmation is incorrect!';
      }
      else {
        $last_name = security($receiveData -> last_name);
        $first_name = security($receiveData -> first_name);
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
      if (verifName($last_name) != 1) {
        $msg = verifName($last_name);
      }
      else if (verifName($first_name) != 1) {
        $msg = verifName($first_name);
      }
      else if (verifEmail($email) != 1) {
        $msg = verifEmail($email);
      }
      else if (verifPwd($pwd) != 1) {
        $msg = verifPwd($pwd);
      }
      else if (verifPwd($pwdConfirm) != 1) {
        $msg = 'Password Confirmation Invalid!';
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