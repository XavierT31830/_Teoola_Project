<?php

function verifPwd($data) {
  $regex = '#^(?=.*?[A-ZÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ])(?=.*?[a-zùúûüũòóôõöéèêëàáâãäçìíîïĩ])(?=.*?[0-9])(?=.*?[\#?!@$%^&*-]).{8,50}$#';
  $pwd = strval($data);
  if (preg_match($regex, $pwd) == 1) {
    $resultat = preg_match($regex, $pwd);
  }
  else {
    $resultat = 'Invalid Password!';
  }
  return $resultat;
}

function verifName($name) {
  $regex = '#^(?=.*[A-z])[a-zA-ZùúûüũòóôõöéèêëàáâãäçìíîïĩÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ -]{2,100}$#';
  $this_name = strval($name);
  if (preg_match($regex, $this_name) == 1) {
    $resultat = preg_match($regex, $this_name);
  }
  else {
    $resultat = 'Invalid Name!';
  }
  return $resultat;
}

function verifEmail($data) {
  $regex = '#^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$#';
  $email = strval($data);
  if (preg_match($regex, $email) == 1) {
    $resultat = preg_match($regex, $email);
  }
  else {
    $resultat = 'Invalid Email!';
  }
  return $resultat;
}

function verifTitleApp($data) {
  $regex = '#^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\dùúûüũòóôõöéèêëàáâãäçìíîïĩÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ ]{4,100}$#';
  $title = strval($data);
  if (preg_match($regex, $title) == 1) {
    $resultat = preg_match($regex, $title);
  }
  else {
    $resultat = 
      'Invalid Title!</br></br>-
      (requires) at least one lower case</br>-
      (requires) at least one upper case</br>-
      (requires) 4 characters minimum</br>
      - accents, numbers, space are allowed</br>
      - 100 characters Maximum';
  }
  return $resultat;
}

?>