open (FH, ">../js/ImageHelper.js");
print FH "function ImageHelper() {\n";
print FH "\tthis.populate = function() {\n";
print FH "\t\tvar imgDir = 'img';\n";
for (<*.png>) {
    $file = $_;
    print FH "\t\tIMAGELOCATIONS.push(imgDir + '/$file');\n";
}
print FH "\t}\n";
print FH "}\n";
