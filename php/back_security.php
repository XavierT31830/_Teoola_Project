

<?php

function security($val) {
  $val = trim($val); // suppr les blancs
  $val = stripslashes($val); // suppr les backslash
  $val = htmlspecialchars($val); // suppr caractères html
  $val = strip_tags($val); // suppr balises html et php d'une chaîne
  return $val;
}

?>