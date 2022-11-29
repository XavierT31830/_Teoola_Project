




<?php

  if (isset($_POST['submit'])) {
    if (isset($_FILES['appicon'])) {
      var_dump($_FILES);
      $currentDirectory = getcwd();
      $uploadDirectory = '/uploads/';
    
      $errors = []; // Store errors here
    
      $fileExtensionsAllowed = ['jpeg','jpg','png', 'gif', 'svg']; // These will be the only file extensions allowed 
    
      $separator = '.';
      $fileName = $_FILES['appicon']['name'];
      $fileSize = $_FILES['appicon']['size'];
      var_dump($fileSize);
      $fileTmpName  = $_FILES['appicon']['full_path'];
      var_dump($fileTmpName);
      $fileType = $_FILES['appicon']['type'];
      var_dump($fileType);
      $fileExplode = explode($separator, $fileName);
      $fileExtension = end($fileExplode);
      $fileExtToLower = strtolower($fileExtension);
    
      $uploadPath = $currentDirectory . $uploadDirectory . basename($fileName);

      if (! in_array($fileExtToLower, $fileExtensionsAllowed)) {
        $errors[] = "This file extension is not allowed. Please upload a JPEG, JPG, PNG, GIF or SVG file";
      }
  
      if ($fileSize > 4000000) {
        $errors[] = "File exceeds maximum size (4MB)";
      }
  
      if (empty($errors)) {
        $didUpload = move_uploaded_file($fileTmpName, $uploadPath);
        var_dump($didUpload);
  
        if ($didUpload) {
          echo "The file " . basename($fileName) . " has been uploaded";
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

  // $target_dir = "uploads/";
  // $target_file = $target_dir . basename($_FILES["appicon"]["name"]);
  // $uploadOk = 1;
  // $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

  // // Check if image file is a actual image or fake image
  // if (isset($_POST["submit"])) {
  //   $check = getimagesize($_FILES["appicon"]["tmp_name"]);
  //   if($check !== false) {
  //     echo "File is an image - " . $check["mime"] . ".";
  //     $uploadOk = 1;
  //   } 
  //   else {
  //     echo "File is not an image.";
  //     $uploadOk = 0;
  //   }
  // }

  // // Check if file already exists
  // if (file_exists($target_file)) {
  //   echo "Sorry, file already exists.";
  //   $uploadOk = 0;
  // }

  // // Check file size
  // if ($_FILES["appicon"]["size"] > 500000) {
  //   echo "Sorry, your file is too large.";
  //   $uploadOk = 0;
  // }

  // // Allow certain file formats
  // if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  // && $imageFileType != "gif" && $imageFileType != "svg") {
  //   echo "Sorry, only JPG, JPEG, PNG, GIF & SVG files are allowed.";
  //   $uploadOk = 0;
  // }

  // // Check if $uploadOk is set to 0 by an error
  // if ($uploadOk == 0) {
  //   echo "Sorry, your file was not uploaded.";
  // // if everything is ok, try to upload file
  // } 
  // else {
  //   if (move_uploaded_file($_FILES["appicon"]["tmp_name"], $target_file)) {
  //     echo "The file ". htmlspecialchars( basename( $_FILES["appicon"]["name"])). " has been uploaded.";
  //   } 
  //   else {
  //     echo "Sorry, there was an error uploading your file.";
  //   }
  // }
?>

