<head>
<title>Lab2</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
<div id="table">
</div>
<form id="forma" method='post'>
Name:<input name='name' type='text'><br><br>
Email:<input name='email' type='email'><br><br>
Message:<textarea name="message"></textarea>
<input type='submit' name='ok' value='siųsti'>
</form>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
<script>
$(document).ready(function () {
//nuskaitomos žinutės užkrovus puslapį
readMessages();
// paspaudus siųsti ant formos, siunčiami duomenys į serverį
$("#forma").submit(function() {
var datastring = $("#forma").serialize(); // formos duomenys paruošiami siuntimui
$.ajax({
url: 'write.php',
type: 'POST',
data: datastring,
success: function (data) {
// sėkmės atveju iš naujo nuskaitoma lentelė
readMessages();
}
});
return false;
})
});
// funkcija atsakinga už žinučių nuskaitymą iš read failo
function readMessages()
{
$.ajax({
url: 'read.php',
type: 'GET',
data: { },
success: function (data) {
var table = '<table class="table table-striped">';
for (var i=0;i<data.length;++i)
{
table = table + '<tr><td>' + data[i].studentname + '</td><td>' + data[i].email + '</td><td>' + data[i].created + ' (' + data[i].ip + ')</td><td>' + data[i].message + '</td></tr>';
}
table = table + '</table>';
$('#table').html(table);
}
});
}
</script>
</body>
</html>