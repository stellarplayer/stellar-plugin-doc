# 沙盒

出于安全方面的考虑，恒星播放器的 Python 运行环境对于某些行为进行了限制。

## 文件读写

仅允许读写相对路径下的文件，文件被重定向到 `%appdata%/pyplugin_data/<插件名称>` 文件夹下。

## 调用外部程序

禁止调用外部程序或模块，比如：
* os.system
* subprocess
* ctypes
* import pyd

> 以上限制可能会导致某些第三方库出现异常，开发时需要注意日志中的异常信息。