<?php

  // FOLDERS STUFF //
  $directory = dirname(__DIR__, 1);
  $arrayDirectory = explode('\\', $directory);
  $projectNameDirectory = end($arrayDirectory);
  $folderSeparator = '/';
  $imageFolder = 'uploads/';
  $uploadImgDirectory = $directory . $folderSeparator . $imageFolder;
  $imageDirectory = $projectNameDirectory.$folderSeparator.$imageFolder;
  $arrFiles = scandir($uploadImgDirectory);

?>