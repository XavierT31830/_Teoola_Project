<?php

  if (isset($_POST['submit'])) {
    if (isset($_FILES['appicon']['name'])) {
      $uploadDirectory = dirname(__DIR__, 1) . '/uploads/';
      $errors = []; // Store errors here
      $fileExtensionsAllowed = ['jpeg','jpg','png', 'gif', 'svg']; // These will be the only file extensions allowed
      $separator = '.';
      var_dump($_FILES);
      $fileName = $_FILES['appicon']['name'];
      $fileSize = $_FILES['appicon']['size'];
      $fileTempName = $_FILES['appicon']['tmp_name'];
      $fileTempPath  = $_FILES['appicon']['full_path'];
      $fileType = $_FILES["appicon"]["type"];
      $fileExplode = explode($separator, $fileName);
      $fileExtension = end($fileExplode);
      $fileExtToLower = strtolower($fileExtension);
      $uploadPath = $uploadDirectory . basename($fileName);

      if (!in_array($fileExtToLower, $fileExtensionsAllowed)) {
        $errors[] = "This file extension is not allowed. Please upload a JPEG, JPG, PNG, GIF or SVG file";
      }
      if ($fileSize > 10000000) {
        $errors[] = "File exceeds maximum size (10MB)";
      }
      if (empty($errors)) {
        $didUpload = move_uploaded_file($fileTempName, $uploadPath);
        if ($didUpload) {
          $confirm = "The file '" . basename($fileName) . "' has been correctly uploaded into : '" . $uploadPath . "' !";
          var_dump($confirm);
          sleep(2);
          header('location:../#appcreated');
        }
        else {
          echo "An error occurred. Please contact the administrator.";
        }
      } 
      else {
        foreach ($errors as $error) {
          echo $error . "These are the errors" . "\n";
        }
      }
    }
  }

?>

