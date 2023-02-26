<?php

  constructAppIcon();

  function constructAppIcon() {
    if (isset($_POST['submit'])) {
      $title = array_keys($_FILES);
      if (isset($_FILES[$title[0]]['name'])) {
        $uploadDirectory = dirname(__DIR__, 1) . '/uploads/';
        $errors = []; // Store errors here
        $fileExtensionsAllowed = ['jpeg','jpg','png', 'gif', 'svg']; // The only file extensions allowed
        $separator = '.';
        $fileName = $_FILES[$title[0]]['name'];
        $fileSize = $_FILES[$title[0]]['size'];
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
            header('location:../#appcreated');
          }
          else {
            echo "An error occurred. Please contact the administrator.";
            header('location:../#uploadfail');
          }
        } 
        else {
          foreach ($errors as $error) {
            echo "\nThese are the errors\n : " . $error;
            header('location:../#uploaderrors');
          }
        }
      }
    }
  }

?>

