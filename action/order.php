<?php
header("Content-type: text/html; charset=utf-8");
require_once('Controller.controller.php');

$name = getPost('name');
$type = getPost('type');
$address = getPost('address');
$price = getPost('price');
$phone = getPost('phone');
$info = getPost('info');



function getPost($name){
	$res = isset($_POST[$name])? $_POST[$name] : null;
	return $res;
}

?>