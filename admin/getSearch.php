<?php
  $name = $_GET["name"];
  $page = $_GET["page"];
  $url = "https://api.zhuolin.wang/api.php?callback=jQuery111309194544155931761_1593509087669&types=search&count=20&source=netease&pages=".$page."&name=".$name."&_=1593509087685";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  $result = curl_exec($curl);
  curl_close($curl);


  $str = explode("jQuery111309194544155931761_1593509087669(", $result);
  $data = substr($str[1], 0, strlen($str[1]) - 1);
  $data = json_decode($data, true);

  echo json_encode($data, JSON_UNESCAPED_UNICODE);
