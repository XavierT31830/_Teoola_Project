<?php
  if (isset($_POST['submit'])) {
    $title = array_keys($_FILES);
    if (isset($_FILES[$title[0]]['name'])) {
      $uploadDirectory = dirname(__DIR__, 1) . '/uploads/';
      $errors = []; // Store errors here
      $fileExtensionsAllowed = ['jpeg','jpg','png', 'gif', 'svg']; // These will be the only file extensions allowed
      $separator = '.';
      $fileName = $_FILES[$title[0]]['name'];
      $fileSize = $_FILES[$title[0]]['size'];
      $fileTempPath  = $_FILES[$title[0]]['full_path'];
      $fileType = $_FILES[$title[0]]['type'];
      $fileExplode = explode($separator, $fileName);
      $fileExtension = end($fileExplode);
      $fileExtToLower = strtolower($fileExtension);
      $fileTempName = $_FILES[$title[0]]['tmp_name'];
      $newFileName = $title[0] . $separator . $fileExtension;
      $uploadPath = $uploadDirectory . basename($newFileName);

      if (!in_array($fileExtToLower, $fileExtensionsAllowed)) {
        $errors[] = "This file extension is not allowed. Please upload a JPEG, JPG, PNG, GIF or SVG file. ||";
      }
      if ($fileSize > 10000000) {
        $errors[] = "File exceeds maximum size (10MB). ||";
      }
      if (empty($errors)) {
        $didUpload = move_uploaded_file($fileTempName, $uploadPath);
        if ($didUpload) {
          $confirm = "The file '" . basename($fileName) . "' has been correctly uploaded into : '" . $uploadPath . "' !";
          var_dump($confirm);
          sleep(1);
          header('location:../#appcreated');
        }
        else {
          echo "An error occurred. Please contact the administrator.";
          sleep(1);
          
          header('location:../#uploadfail');
        }
      } 
      else {
        foreach ($errors as $error) {
          echo "\nThese are the errors\n : " . $error;
          sleep(1);
          header('location:../#uploaderrors');
        }
      }
    }
  }

?>

