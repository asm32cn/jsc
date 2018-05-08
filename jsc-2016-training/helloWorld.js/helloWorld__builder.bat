@set dir=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\
@set ProjectName=helloWorld

@echo %dir%
@echo.

@rem %dir%\jsc /target:exe /resource:res\%ProjectName%.resources /win32icon:res\%ProjectName%.ico /optimize %ProjectName%.js
@%dir%\jsc /target:exe %ProjectName%.js

@pause
