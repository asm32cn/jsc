@set dir=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\
@set ProjectName=LibHW.HelloWorld

@echo %dir%
@echo.

@rem %dir%\jsc /target:library /resource:res\%ProjectName%.resources /win32icon:res\%ProjectName%.ico /optimize %ProjectName%.js
@%dir%\jsc /target:library %ProjectName%.js

@pause
