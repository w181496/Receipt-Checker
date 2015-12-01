<?php
	$url = "http://service.etax.nat.gov.tw/etwmain/front/ETW183W1/";

	// curl爬網頁下來
	$resource = curl_init();
	curl_setopt($resource, CURLOPT_URL, $url);
	curl_setopt($resource, CURLOPT_RETURNTRANSFER, 1);
	$content = curl_exec($resource);

	// Parse出含得獎號碼的網址、年、月
	preg_match_all("/<a href=\"(ETW183.*)\" title=\".*\">(.*)年(.*)月、(.*)月<\/a>/", $content, $matches);

	// 將Parse出的資料塞成陣列，轉JSON
	if(isset($matches[0])) {
		$receipt_obj = null;
		$len = count($matches[0]);	// 總共筆數

		$receipt_arr = array();		// 發票資訊物件陣列
		for($i = 0; $i < $len; $i++) {
			$receipt_obj = array("url" => $matches[1][$i], "year" => $matches[2][$i], "month_from" => $matches[3][$i], "month_to" => $matches[4][$i]);
			array_push($receipt_arr, $receipt_obj);
		}
		echo json_encode($receipt_arr, JSON_UNESCAPED_UNICODE);
	} else {
		echo "無法取得資料!";
	}
