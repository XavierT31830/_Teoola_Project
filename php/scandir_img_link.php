<?php

  require ('folders_stuff.php');

  function scanImgAppsDir($arrFiles, $imageFolder, $data) {
    $count = 0;
    foreach ($arrFiles as $value) {
      $splitValues = explode('.', $value);
      if ($splitValues[1] !== '') {
        $arrValues = $splitValues[0];
        foreach ($data as $app) {
          if ($app['title'] == $arrValues) {
            $app['img_link'] = $imageFolder . $value;
            if (count($data) > 1) {
              $data[$count]['img_link'] = $app['img_link'];
            }
            else {
              $data[0]['img_link'] = $app['img_link'];
            }
          }
        }
        $count++;
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