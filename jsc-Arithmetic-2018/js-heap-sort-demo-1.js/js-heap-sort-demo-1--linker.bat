@echo off

set strLinker=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\jsc.exe
set strAppName=js-heap-sort-demo-1

echo %strLinker%
echo.

set strCmd=%strLinker% /target:exe %strAppName%.js
echo #%strCmd%
%strCmd%

pause
