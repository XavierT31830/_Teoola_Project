<?php

  require ('folders_stuff.php');

  function scanImgAppsDir($arrFiles, $imageFolder, $data) {
    foreach ($arrFiles as $value) {
      $splitValues = explode('.', $value);
      if ($splitValues[1] !== '') {
        $arrValues = $splitValues[0];
        $count = 0;
        if (count($data) != 0) {
          for ($count; $count < count($data); $count++) {
            if ($data[$count]['title'] == $arrValues) {
              $data[$count]['img_link'] = $imageFolder . $value;
            }
          }
        }
      }
    }
    return $data;
  }

  function getImgAppName($arrFiles, $imageFolder, $data) {
    foreach ($arrFiles as $value) {
      $splitValues = explode('.', $value);
      if ($splitValues[1] !== '') {
        $arrValues = $splitValues[0];
        if ($data['title'] === $arrValues) {
          $data['img_link'] = $imageFolder . $value;
          return $data;
        }
      }
    }
  }

  function updateImgAppName($arrFiles, $imageFolder, $data) {
    foreach ($arrFiles as $value) {
      $splitValues = explode('.', $value);
      if ($splitValues[1] !== '') {
        $arrValues = $splitValues[0];
        if ($data['old_title'] === $arrValues) {
          include ('folders_stuff.php');
          $newName = $data['title'] . '.' . $splitValues[1];
          rename($uploadImgDirectory.$value, $uploadImgDirectory.$newName);
          $data['img_link'] = $imageFolder . $newName;
          return $data;
        }
      }
    }
  }

?>