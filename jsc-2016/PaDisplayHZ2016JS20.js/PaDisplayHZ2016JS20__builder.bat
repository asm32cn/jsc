@set dir=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\
@set ProjectName=PaDisplayHZ2016JS20

@echo %dir%
@echo.

@rem %dir%\jsc /target:winexe %ProjectName%.js
@%dir%\jsc /target:winexe /resource:res\%ProjectName%.resources %ProjectName%.js

@pause
