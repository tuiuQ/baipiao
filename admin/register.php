<?php
  $username = isset($_POST["username"]) ? $_POST["username"] : "";
  $password = isset($_POST["password"]) ? $_POST["password"] : "";

  $json_str = file_get_contents("../data/user.json");
  $data = json_decode($json_str, true);

  $message = "";
  $code = "";
  $shu = array("username" => "");

  for ($i = 0; $i < count($data["user"]); $i++) {
    if ($data["user"][$i]["username"] == $username) {
      $code = "400";
      $message = "该用户已注册，请直接登录";
    }
  }
  if ($code != "400") {
    array_push($data["user"], array("username" => $username, "password" => $password));
    file_put_contents("../data/user.json", json_encode($data));
    $code = "200";
    $message = "注册成功";
    $shu["username"] = $username;
  }


  echo json_encode(array(
      "code" => $code,
      "message" => $message,
      "data" => $shu
  ), JSON_UNESCAPED_UNICODE);
  //
  //  echo json_encode($data["user"], JSON_UNESCAPED_UNICODE);
