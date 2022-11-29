


<?php 
  if (isset($_POST['uploadappiconform'])) {
    if (is_uploaded_file($_FILES['appicon']['tmp_name'])) {
      // First, Validate the file name
      if(empty($_FILES['appicon']['name'])) {
        var_dump('1');
        echo '<script type="text/javascript">
                msg_insert = "File name is empty!";
                window.location.href = "../index.htm";
                uploadAppIconResult(msg_insert);
              </script>';
        exit;
      }

      $upload_file_name = $_FILES['appicon']['name'];
      // Too long file name?
      if(strlen ($upload_file_name) > 100) {
        var_dump('2');
        echo '<script type="text/javascript">
                msg_insert = "Too long file name!";
                window.location.href = "../index.htm";
                uploadAppIconResult(msg_insert);
              </script>';
        exit;
      }

      // Replace any non-alpha-numeric cracters in the file name
      $upload_file_name = preg_replace('/[^A-Za-z0-9 \.\-_]/', '', $upload_file_name);

      // set a limit to the file upload size
      if ($_FILES['appicon']['size'] > 1000000) {
        var_dump('3');
        echo '<script type="text/javascript">
                msg_insert = "Too big file!";
                window.location.href = "../index.htm";
                uploadAppIconResult(msg_insert);
              </script>';
        exit;
      }

      // Save the file
      $dest=__DIR__.'/uploads/'.$upload_file_name;
      if (move_uploaded_file($_FILES['appicon']['tmp_name'], $dest)) {
        var_dump('4');
        echo '<script type="text/javascript">
                msg_insert = "File Has Been Uploaded!";
                window.location.href = "../index.htm";
                uploadAppIconResult(msg_insert);
              </script>';
      }
    }
  }

?>