<?php
  $id =isset($_GET["id"]) ? $_GET["id"] : "";
  $url = "https://api.zhuolin.wang/api.php?callback=jQuery111307498674310462377_1593427570703&types=url&id=".$id."&source=netease&_=1593427570707";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  $result = curl_exec($curl);
  curl_close($curl);
  $str = explode("jQuery111307498674310462377_1593427570703(", $result);
  $data = substr($str[1], 0, strlen($str[1]) - 1);
  $data = json_decode($data, true);

  echo json_encode($data, JSON_UNESCAPED_UNICODE);

//  print_r($data);