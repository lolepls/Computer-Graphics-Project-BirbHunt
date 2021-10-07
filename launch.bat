set folder="C:\xampp\htdocs\cgproject\src"
cd /d %folder%
for /F "delims=" %%i in ('dir /b') do (rmdir "%%i" /s/q || del "%%i" /s/q)

xcopy /s /i /y "C:\Users\gio_m\Desktop\Computer-Graphics-Project-BirbHunt\src\" "C:\xampp\htdocs\cgproject\src"
start http://127.0.0.1/cgproject/src/index.html