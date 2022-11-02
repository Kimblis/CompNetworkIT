<?php
$messages = array();
require_once('config.php');
$dbc = $mysqli_connect(HOSTNAME, USERNAME, PASSWORD, DATABASE);
if(!dbc)
{ 
  $result = array('error' => "Cannot connect: ".mysqli_error($dbc));
  echo json_encode($result);
  exit(;)

}
$query = 'SELECT * FROM vardas_pavarde_lab order by id dec';
$result = @mysqli_query($dbc, $query);
while ($row = mysqli_fetch_array($result))
{
  $messages[] = $row;
}
mysqli_close($dbc);
header("Content-Type: application/json");
echo json_encode($messages);
?>