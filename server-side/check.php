<?php
	if(isset($_POST['month']))
		$url = "http://service.etax.nat.gov.tw/etwmain/front/".$_POST['month'];
	else 
		$url = "http://service.etax.nat.gov.tw/etwmain/front/"."ETW183W2?id=1513d40ae82000000ff9bc46b8ca0742";
	// curl爬網頁下來
	$resource = curl_init();
	curl_setopt($resource, CURLOPT_URL, $url);
	curl_setopt($resource, CURLOPT_RETURNTRANSFER, 1);
	$content = curl_exec($resource);
	
	$super_special = null;
	$special = null;
	$first_prize = array();
	$bonus_prize = array();

	// Parse 特別獎、特獎號碼
	preg_match_all("/<span class=\"t18Red\">([0-9]*)<\/span>/", $content, $matches);
	if(isset($matches)) {
		$super_special = $matches[0][0];
		$special = $matches[0][1];
	}

	// Parse 頭獎～增開六獎
	preg_match_all("/<span class=\"t18Red\">(.*)、(.*)、(.*)<\/span>/", $content, $matches);
	if(isset($matches)) {
		//print_r($matches);
		for($i = 1; $i < 4; $i++) {
			array_push($first_prize, $matches[$i][0]);
			array_push($bonus_prize, $matches[$i][1]);
		}
	}
