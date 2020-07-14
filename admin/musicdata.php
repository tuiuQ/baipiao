<?php
    $name = $_GET["name"];
    $url = "http://music.zhuolin.wang/api.php?callback=jQuery111309133695011351539_1573986211950";
    $curl = curl_init();
    $headers = array(
        "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
        "X-Requested-With" => "XMLHttpRequest"
    );
    $data = array(
        "types" => "search",
        "count" => "50",
        "source" => "netease",
        "pages" => "1",
        "name" => $name
    );
    $data_header = json_encode($headers);
    $data2 = json_encode($data);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Cookie" => "UM_distinctid=16e78e39a261a-00bdab8e1e6168-e343166-100200-16e78e39a27264; CNZZDATA1260050386=560960928-1573981831-null%7C1573981831",
        "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
        "X-Requested-With" => "XMLHttpRequest"
    ));

    $result = curl_exec($curl);
    if(curl_errno($curl)) {
        print curl_error($curl);
    }
    curl_close($curl);
    // $qutop = explode("(", $result);
    // $bot = array_splice($qutop, 1);
    // $qubot = str_replace(")","", $bot[count($bot) - 1]);
    // print_r($qubot);
    $da = str_replace_limit("(", "!@", $result, 1);

    $dd = explode("!@", $da);
    $d = $dd[1];

    $jie = substr($d, 0, strlen($d) - 1);
    echo $jie;


    
    
    
    function str_replace_limit($search, $replace, $subject, $limit=-1) {

        if (is_array($search)) {
            foreach ($search as $k=>$v) {
            $search[$k] = '`' . preg_quote($search[$k],'`') . '`';
            }
        }
        else {
            $search = '`' . preg_quote($search,'`') . '`';
        }
    
        return preg_replace($search, $replace, $subject, $limit);
    }

    /*
        $search:要替换的字符串或者数组

        $replace:要替换的值

        $subject:要替换的文本

        $limit:替换的此数字
    */
