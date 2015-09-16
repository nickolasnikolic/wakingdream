<?php
require 'vendor/autoload.php';

error_reporting(-1);//tell me stuff

$app = new \Slim\Slim();

$app->get('/home', function(){

  $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

  $server = $url["host"];
  $user = $url["user"];
  $pass = $url["pass"];
  $database = substr($url["path"], 1);

  $db = new PDO("mysql:host=$server;dbname=$database;charset=utf8", $user, $pass);

  $stmtUserId = $db->prepare('SELECT * FROM stories ORDER BY stories.id DESC LIMIT 200;');
  $stmtUserId->execute();
  $resultUserId = $stmtUserId->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($resultUserId);
});

$app->post('/home', function(){

  $title = $_POST['title'];
  $text = $_POST['text'];

  $title = htmlentities($title);
  $text = htmlentities($text);


  $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

  $server = $url["host"];
  $user = $url["user"];
  $pass = $url["pass"];
  $database = substr($url["path"], 1);

  $db = new PDO("mysql:host=$server;dbname=$database;charset=utf8", $user, $pass);

  $stmtUserId = $db->prepare('INSERT INTO stories (title,text) VALUES (:title,:text);');
  $stmtUserId->bindParam( ':title', $title );
  $stmtUserId->bindParam( ':location', $text );
  $stmtUserId->execute();
});

$app->run();
