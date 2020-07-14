<?php
  $username = isset($_POST["username"]) ? $_POST["username"] : "";
  $password = isset($_POST["password"]) ? $_POST["password"] : "";

  $json_str = file_get_contents("../data/user.json");
  $data = json_decode($json_str, true);

  $message = "";
  $code = "";
  $shu = array("username" => "");

  foreach ($data["user"] as $key => $value) {
    if ($value["username"] == $username) {
      if ($value["password"] == $password) {
        $code = "200";
        $shu["username"] = $username;
        $message = "登录成功";
      } else {
        $code = "400";
        $message = "密码错误";
      }
    } else {
      $code = "400";
      $message = "用户不存在";
    }
  }

  echo json_encode(array(
      "code" => $code,
      "message" => $message,
      "data" => $shu,
      "quan" => $data["user"]
  ), JSON_UNESCAPED_UNICODE);




