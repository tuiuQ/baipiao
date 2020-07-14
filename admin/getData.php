<?php
  $name = isset($_GET["name"]) ? $_GET["name"] : "";
  $url = "https://api.zhuolin.wang/api.php?callback=jQuery111307498674310462377_1593427570691&types=playlist&id=3778678&_=1593427570692";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  $result = curl_exec($curl);
  curl_close($curl);


  $str = explode("jQuery111307498674310462377_1593427570691(", $result);
  $data = substr($str[1], 0, strlen($str[1]) - 1);
  $data = json_decode($data, true);

  echo json_encode($data, JSON_UNESCAPED_UNICODE);

