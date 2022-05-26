<?php
if(!isset($_REQUEST['file'])) {
die("No filename specified");
}
$filename2 = $_REQUEST['file'];
$filename2 = preg_replace("/\.\./","",$filename2);
$filename2 = preg_replace("/%2e/","",$filename2);
$filename2 = preg_replace("/\/\*/","/",$filename2);

$filename2 = "/var/spool/asterisk/monitor/".$filename2;

// required for IE, otherwise Content-disposition is ignored
if(ini_get('zlib.output_compression')) {
  ini_set('zlib.output_compression', 'Off');
}

//$file_extension = strtolower(substr(strrchr($filename2,"."),1));

if( $filename2 == "" ) {
  echo "ERROR: download file NOT SPECIFIED. USE download.php?file=filepath";
  exit;
} elseif ( ! file_exists( $filename2 ) ) {
  echo "ERROR: File $filename2 not found. USE download.php?file=filepath";
  exit;
}

header("Pragma: public"); // required
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false); // required for certain browsers 
header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"".basename($filename2)."\";" );
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($filename2));
readfile("$filename2");
exit();
?>
