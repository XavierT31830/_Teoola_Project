


<?php

function verifPwd($data) {
  $regex = '#^(?=.*?[A-ZÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ])(?=.*?[a-zùúûüũòóôõöéèêëàáâãäçìíîïĩ])(?=.*?[0-9])(?=.*?[\#?!@$%^&*-]).{8,100}$#';
  $pwd = strval($data);

  if (preg_match($regex, $pwd) == 1) {
    return preg_match($regex, $pwd);
  }
  else {
    $resultat = 'Invalid Password!';
    return $resultat;
  }
}

function verifName($name) {
  $regex = '#^(?=.*[A-z])[a-zA-ZùúûüũòóôõöéèêëàáâãäçìíîïĩÙÚÛÜŨÒÓÔÕÖÉÈÊËÀÁÂÃÄÇÌÍÎÏĨ -]{2,100}$#';
  $this_name = strval($name);

  if (preg_match($regex, $this_name) == 1) {
    return preg_match($regex, $this_name);
  }
  else {
    $resultat = 'Invalid Name!';
    return $resultat;
  }
}

function verifEmail($data) {
  $regex = '#^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$#';
  $email = strval($data);

  if (preg_match($regex, $email) == 1) {
    return preg_match($regex, $email);
  }
  else {
    $resultat = 'Invalid Email!';
    return $resultat;
  }
}

?>