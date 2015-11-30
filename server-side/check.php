<?php
	$flag = -100;

	if(isset($_POST['month'])) $url = "http://service.etax.nat.gov.tw/etwmain/front/".$_POST['month'];
	else $url = "http://service.etax.nat.gov.tw/etwmain/front/"."ETW183W2?id=1513d40ae82000000ff9bc46b8ca0742";
	
	if(isset($_POST['num'])) $num = $_POST['num'];

	$len = strlen($num);

	if($len > 8 || $len < 3) {
		echo "-1";
	} else {
	
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
			$super_special = $matches[1][0];
			$special = $matches[1][1];
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

		#=======================#
		/*
		*	7 增開六獎
		*	6 六獎       8 特獎
		*   5 五獎       9 特別獎
		*   4 四獎       10 可能頭獎
		*   3 三獎       11 可能特獎
		*   2 二獎       12 可能特別獎
		*   1 頭獎
		*/
		
		# 判斷特別獎、特獎
		if($num === substr($special, -$len)) $flag = 11;
		if($num === substr($super_special, -$len)) $flag = 12;

		if($num === $super_special) $flag = 9;
		if($num === $special) $flag = 8;


		# 判斷頭獎、二到六獎
		foreach($first_prize as $val) {
			if($len === 8) {
				if($num === $val) {
					$flag = 1;
					break;
				} else if(substr($num, -7) === substr($val, -7)) {
					$flag = 2;
					break;
				} else if(substr($num, -6) === substr($val, -6)) {
					$flag = 3;
					break;
				} else if(substr($num, -5) === substr($val, -5)) {
					$flag = 4;
					break;
				} else if(substr($num, -4) === substr($val, -4)) {
					$flag = 5;
					break;
				} else if(substr($num, -3) === substr($val, -3)) {
					$flag = 6;
					break;
				}
			} else if($len === 7) {
				if($num === substr($val, -7)) {
					$flag = 10;
					break;
				} else if(substr($num, -6) === substr($val, -6)) {
					$flag = 3;
					break;
				} else if(substr($num, -5) === substr($val, -5)) {
					$flag = 4;
					break;
				} else if(substr($num, -4) === substr($val, -4)) {
					$flag = 5;
					break;
				} else if(substr($num, -3) === substr($val, -3)) {
					$flag = 6;
					break;
				}
			} else if($len === 6) {
				if($num === substr($val, -6)) {
					$flag = 10;
					break;
				} else if(substr($num, -5) === substr($val, -5)) {
					$flag = 4;
					break;
				} else if(substr($num, -4) === substr($val, -4)) {
					$flag = 5;
					break;
				} else if(substr($num, -3) === substr($val, -3)) {
					$flag = 6;
					break;
				}
			} else if($len === 5) {
				if($num === substr($val, -5)) {
					$flag = 10;
					break;
				} else if(substr($num, -4) === substr($val, -4)) {
					$flag = 5;
					break;
				} else if(substr($num, -3) === substr($val, -3)) {
					$flag = 6;
					break;
				}	
			} else if($len === 4) {
				if($num === substr($val, -4)) {
					$flag = 10;
					break;
				} else if(substr($num, -3) === substr($val, -3)) {
					$flag = 6;
					break;
				}
			} else if($len === 3) {
				if($num === substr($val, -3)) {
					$flag = 10;
					break;
				}
			}
		}

		# 判斷增開六獎
		foreach($bonus_prize as $val) {
			if(substr($num, -3) == $val) {
				$flag = 7;
				break;
			}
		}

		# 輸出得獎代號
		echo $flag;
		#=======================#
	}
