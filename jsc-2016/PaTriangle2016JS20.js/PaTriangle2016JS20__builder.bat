@set dir=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\
@set ProjectName=PaTriangle2016JS20

@echo %dir%
@echo.

@%dir%\jsc /target:winexe /resource:res\%ProjectName%.resources %ProjectName%.js
@rem %dir%\jsc /target:winexe %ProjectName%.js

@pause
