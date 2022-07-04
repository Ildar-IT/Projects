<?php

	$json = file_get_contents('php://input');
	$error = json_encode(["message" => "Ошибка"]);
	if ($_SERVER['REQUEST_METHOD'] != "POST") die($error);

	$json = json_decode($json);

	$email = trim($json->email);
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) die($error);

	$data = [
		"pointOfContact" => "silalanding",
		"customer" => [
			"email" => $email,
			"subscriptions" => [
				(object)[
					"brand" => "Zarina",
					"pointOfContact" => "Email"
				]
			]
		]
	];

	$ch = curl_init('https://api.mindbox.ru/v3/operations/sync?endpointId=Zarina&operation=optin');
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json', 'Authorization: Mindbox secretKey="Feb8AEYBTMKvztwLQC9N"'));
	$html = curl_exec($ch);
	curl_close($ch);

	echo $html;
