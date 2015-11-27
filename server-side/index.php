<?php
	//特別獎、特獎、頭獎、增開六獎
	$month = null;
	$num = -100;
	$flag = 0;
	if(isset($_POST['month'])) $month = $_POST['month'];
	if(isset($_POST['num'])) $num = $_POST['num'];
	$len = strlen($num);						  	    //長度
	if($len < 3 || $len > 8) {
		echo "-1";
	} else if($month === "9and10") {
		$arr = ["096", "819", "105"];					//增開六獎
		$arr2 = ["76833937", "28338875", "83689131"];   //頭獎
		$lucky = "20119263"; 							//特獎
		$super_lucky = "07332260";						//特別獎

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
		for($i = 3; $i <= 8; $i++) {
			if($len < $i) break;
			if(substr($num, -1 * $i) === substr($lucky, -1 * $i)) $flag = 11;
			else $flag = -100;
		}
		for($i = 3; $i <= 8; $i++) {
			if($len < $i) break;
			if(substr($num, -1 * $i) === substr($super_lucky, -1 * $i)) $flag = 12;
			else $flag = -100;
		}
		if($num === $super_lucky) $flag = 9;

		if($num === $lucky) $flag = 8;

		# 判斷增開六獎
		foreach($arr as $val) {
			if(substr($num, -3) === $val) {
				$flag = 7;
				break;
			}
		}

		# 判斷頭獎、二到六獎
		foreach($arr2 as $val) {
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

		echo $flag;
	}
?>
