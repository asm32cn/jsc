@set dir=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\
@set ProjName=_CreateResource

@echo %dir%
@echo.

@%dir%\jsc /target:exe %ProjName%.js

@pause
