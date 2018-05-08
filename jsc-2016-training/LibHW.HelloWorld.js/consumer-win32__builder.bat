@set dir=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\
@set ProjectName=consumer-win32

@echo %dir%
@echo.

@rem %dir%\jsc /target:winexe /resource:res\%ProjectName%.resources /win32icon:res\%ProjectName%.ico /optimize %ProjectName%.js
@%dir%\jsc /target:winexe %ProjectName%.js

@pause
