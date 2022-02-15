# API

插件通过 API 调用播放器相关功能，比如播放、停止等。

插件中有以下对象：
* `plugin` 插件对象
* `palyer` 播放器对象
* `canvas` 画布对象

## 插件对象

由 newPlugin 创建的对象，需要继承于 `StellarPlayer.IStellarPlayerPlugin`。

### doModal

显示对话框窗口

```python
StellarPlayer.IStellarPlayerPlugin.doModal(self, pageId:str, width:int, height:int, title:str, controls:list)
```

参数

|参数|类型|说明|
|--|--|--|
|pageId|str|对话框名称，用于区分各对话框，必填|
|width|int|对话框宽度|
|height|int|对话框高度|
|title|str|对话框标题文字|
|controls|obj或array|对话框控件布局对象，参见[layout]|

用户调用此方法显示一个对话框窗口，如果指定名称的窗口已存在，则会唤起之前的窗口。


### updateLayout

更新窗口内容

有时插件需要更新窗口内容，比如搜索结果，此时可以用 updateLayout 更新指定窗口内容

```python
StellarPlayer.IStellarPlayerPlugin.updateLayout(self, pageId:str, controls:list)
```

参数

|参数|类型|说明|
|--|--|--|
|pageId|str|对话框名称，用于区分各对话框，必填|
|controls|obj 或 array|对话框控件布局对象，参见[layout]|

用户调用此方法更新指定对话框窗口内容。

## 播放器对象

插件中大多数 API 都是播放器对象提供的，播放器对象为插件对象的一个属性 `player`，所以在插件中调用播放器对象的方法时需要像这样：

```python
self.player.play(url)
```

下面分别说明 player 对象的各个方法：

### doModal 

显示一个对话框，此方法与 plugin 中的 doModal 参数一致，plugin.doModal 是 player.doModal 的封装。

```python
player.doModal(self, pageId:str, width:int, height:int, title:str, controls:list)
```

参数

|参数|类型|说明|
|--|--|--|
|pageId|str|对话框名称，用于区分各对话框，必填|
|width|int|对话框宽度|
|height|int|对话框高度|
|title|str|对话框标题文字|
|controls|obj或array|对话框控件布局对象，参见[layout]|

用户调用此方法显示一个对话框窗口，如果指定名称的窗口已存在，则会唤起之前的窗口。

### createTab

显示一个 Tab 页，Tab 页显示在 Tab 窗口中，`pageId` 为其名称，如果 `pageId` 已经存在，则切换到该 tab 页。

```python
player.createTab(self, pageId:str, title:str, controls:list)
```

参数

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各页面，必填|
|title|str|Tab 标题文字|
|controls|obj或array|Tab 控件布局对象，参见[layout]|

对话框窗口和 tab 可以互相转换：
* 通过将插件对话框窗口拖放到 Tab 窗口上，可以将其作为 Tab 页面。
* 将 Tab 页面拖动离开 Tab 窗口，可以创建独立插件对话框窗口。

### isModalExist

窗口或 Tab 页是否存在

```python
player.isModalExist(self,pageId)
```

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|

返回值：
`True` 窗口已存在
`False` 窗口不存在

### updateLayout

更新对话框内容
有时插件需要更新窗口内容，比如搜索结果，此时可以用 updateLayout 更新指定窗口内容

```python
player.updateLayout(self, pageId:str, controls:list)
```

参数

|参数|类型|说明|
|--|--|--|
|pageId|str|对话框名称，用于区分各对话框，必填|
|controls|obj 或 array|对话框控件布局对象，参见[layout]|

用户调用此方法更新指定对话框窗口内容。

### closeModal

关闭指定窗口或 Tab 页

```python
player.closeModal(self, pageId:str, ok:bool)
```

参数

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|ok|bool|返回值|

用户调用此方法关闭指定对话框或 Tab 页，关闭时可以指定 Bool 返回值，此值会作为 doModal 的返回值返回。

### getControlValue

获取控件值

```python
player.getControlValue(self, pageId:str,controlName:str)
```

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|controlName|str|待获取的控件名称，必填|

返回值

获取到的控件值，如果获取失败则返回 None

### updateControlValue

更新控件值

```python
player.updateControlValue(self, pageId:str,controlName:str,value)
```

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|controlName|str|待获取的控件名称，必填|
|value|str|待设置的控件值，必填|


### getListItemControlValue

获取 list、grid 子元素值

```python
player.getListItemControlValue(self, pageId:str,listName:str,itemIndex,itemName:str)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|listName|str|待获取的 list 或 grid 控件名称，必填|
|itemIndex|int|待获取的子元素 index，必填|
|itemName|str|待获取的子元素 name，必填|

返回值

获取到的控件值，如果获取失败则返回 None

### showControl

显示隐藏控件

```python
player.showControl(self, pageId:str,controlName:str,visible:bool)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|controlName|str|待设置的控件名称，必填|
|visible|bool|显示或隐藏|

### setControlSize

设置控件大小

```python
player.setControlSize(self, pageId:str,controlName:str,width=None,height=None)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|controlName|str|待设置的控件名称，必填|
|width|float,int,None|宽度|
|height|float,int,None|高度|

说明

宽度值和高度值，为None时，不改变宽度或高度
小于0 自动计算剩余宽度或高度
大于1 为绝对大小
小于1 为权重大小
等于1
    等于整数1时为绝对大小
    浮点1.0时为权重大小

### addControl

添加控件

```python
player.addControl(self, pageId:str,nodeName:str,controls,previous='',weight=-1)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|nodeName|str|在该节点上添加控件，该节点必须是一个容器节点(group,list,grid),根节点名称为root|
|controls|obj 或 array|待添加的控件|
|previous|str|添加的位置,在previous节点后新增节点，为空时，加在末尾|
|weight|float,int,None|参考 setControlSize 的控件大小|


### removeControl

移除控件

```python
player.removeControl(self, pageId:str,controlName:str)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|controlName|str|待移除的控件名称|

### loadingAnimation

显示或隐藏一个 loading 动画

```python
player.loadingAnimation(self, pageId, stop=False, style='default')
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|stop|bool|隐藏或显示动画|
|style|str|动画样式，目前只有默认值 defalut|

### toast

显示一个文字提示，显示 3 秒后自动消失

```python
player.toast(self, pageId, message)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|message|str|文字提示|

### callWebbrowser

弹出系统浏览器

```python
player.callWebbrowser(self, url)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|url|str|待打开的 url 地址|

### showText

在播放器左上角显示一个文字提示

```python
player.showText(self, message)
```

参数 

|参数|类型|说明|
|--|--|--|
|pageId|str|Tab 名称，用于区分各对话框，必填|
|message|str|文字提示|

### showNotify

显示右下角托盘弹出提示

```python
player.showNotify(self, caption, message, timeout=5, quite=True)
```

参数 

|参数|类型|说明|
|--|--|--|
|caption|str|提示标题，必填|
|message|str|提示文字信息|
|timeout|int|超时时间，自动隐藏，现在默认为 windows 自动|
|quite|bool|是否有提示音|

### setCaption

设置播放器标题文字

```python
player.setCaption(self, text)
```

参数 

|参数|类型|说明|
|--|--|--|
|text|str|待设置的标题文字|

### play

播放一个视频

```python
player.play(self,url,caption=None,headers={})
```

参数 

|参数|类型|说明|
|--|--|--|
|url|str|待播放的视频地址|
|caption|str|带设置的播放器标题|
|headers|dict|播放 http url 时，附带的 http 请求头|

### pause

暂停、继续

```python
player.pause(self, play)
```

参数 

|参数|类型|说明|
|--|--|--|
|play|bool|暂停或继续|

### stop

停止播放

```python
player.stop(self)
```

### prev

播放上一个

```python
player.prev(self)
```

### next

播放下一个

```python
player.next(self)
```

### getProgress

获取播放进度

```python
player.getProgress(self)
```

返回值
当前播放进度，总时长


### setProgress

设置当前播放进度

```python
player.setProgress(self, pos)
```

参数 

|参数|类型|说明|
|--|--|--|
|pos|int|待设置的播放进度|


### getSnapshot

获取当前视频的截图

```python
player.getSnapshot(self, params)
```

参数 

|参数|类型|说明|
|--|--|--|
|params['width']|int|截图宽度|
|params['height']|int|截图高度|

返回值
截图的 base64 数据

### getThumbnail

获取视频缩略图

```python
player.getThumbnail(self, params)
```

参数 

|参数|类型|说明|
|--|--|--|
|params['width']|int|截图宽度|
|params['ms']|int|截图位置，毫秒|

返回值
缩略图的 base64 数据

### getQRCodeImg

获取指定内容的二维码图片()

```python
player.getThumbnail(self, params)
```

参数

|参数|类型|说明|
|--|--|--|
|params['content']|string|要生成二维码的内容|
|params['bg']|string|背景色 #rrggbb 形式|
|params['fg']|string|前景色 #rrggbb 形式|

返回值

缩略图的 base64 数据

```python
def show(self):
    img = self.player.getQRCodeImg({
        "content": "https://v2ex.com/-",
        "bg": "#ffffff",
        "fg": "#ff0000"
    })

    controls = [
        {
            'type':'image',
            'name':'img',
            'height': 300, 
            'width': 300, 
            'value': 'data:image/png;base64,' + img
        },
        {'type':'space'}
    ]
    self.doModal('main',500, 500,'测试', controls)
```

### addToPlaylist

添加 url 到播放列表

```python
player.addToPlaylist(self, folder, items, autoPlayIndex=-1)
```

参数 

|参数|类型|说明|
|--|--|--|
|folder|str|播放列表文件夹名称|
|items|array|待添加的记录|
|autoPlayIndex|int|添加完成后自动播放的元素 index|

待添加的记录形式如下

```python
items = [
    {'name': 'test1', 'url': 'http://xxx1.m3u', headers: {'User-Agent': 'xxx'}},
    {'name': 'test2', 'url': 'http://xxx2.m3u', headers: {'User-Agent': 'xxx'}}
]
```

其中
* name 为添加的记录名称;
* url 为添加的记录 url;
* headers 为 url 对应的 http 请求头;

### getPlaylist

获取播放列表

```python
player.getPlaylist(self)
```

返回值

播放列表数据，形如：

```python
{
    "playingIndex": 0,
    "items": [
        {"name": "file1", "path": "http://test.com/1.m3u8", "index": 1},
        {"name": "file2", "path": "http://test.com/2.m3u8", "index": 2}
    ],
    "cateIndex": 0,
    "cates": ["cate1", "cate2"]
}
```

其中：
* playingIndex 为当前正在播放项目的 index
* items 为当前播放列表项目（不包含文件夹）
    - name 列表项目名称
    - path 列表项目地址
    - index 列表项目序号
* cateIndex 当前分类序号
* cates 所有分类

### playPlaylist

播放当前播放列表中的指定项目

```python
player.playPlaylist(self, index）
```

参数 

|参数|类型|说明|
|--|--|--|
|index|int|待播放的项目序号|

### setPlaylistCate

切换播放列表类别

```python
player.setPlaylistCate(self, index)
```

参数 

|参数|类型|说明|
|--|--|--|
|index|int|待切换的播放列表类别序号|

### addDanmu

以弹幕形式显示一行文字

```python
player.addDanmu(self, message)
```

参数 

|参数|类型|说明|
|--|--|--|
|message|str|弹幕文字|

### showDanmu

切换弹幕的显示、隐藏。

```python
player.showDanmu(self, show)
```

参数 

|参数|类型|说明|
|--|--|--|
|show|bool|是否显示弹幕|

### clearDanmu

清除所有弹幕。

```python
player.clearDanmu(self)
```

调用后清除所有弹幕，当有新弹幕加入时会重新显示。

### dispatchResult

返回 dispatch 异步结果

```python
player.dispatchResult(self, dispatchId, **kwarg)
```

参数 

|参数|类型|说明|
|--|--|--|
|dispatchId|int|dispatch 请求的 id|
|kwarg|dict|结果|

此接口是播放器异步调用插件事件时，插件用来返回结果的接口，异步事件包括：

* onUrlInput
* onSearch

### setShaderSelectorShaders

设置自定义着色器

```python
player.setShaderSelectorShaders(self, shaders, stage)
```

参数 

|参数|类型|说明|
|--|--|--|
|shaders|array|着色器文件数组，按文件顺序，依次执行每个着色器文件|
|stage|str|着色器应用的渲染时机，prescale(缩放前)、scaled(缩放后)、interpolation(插帧)|

### setShaderSelectorEnable

设置自定义着色器是否启用

```python
player.setShaderSelectorEnable(self, stage, enable, debug=False)
```

参数 

|参数|类型|说明|
|--|--|--|
|stage|str|着色器应用的渲染时机，prescale(缩放前)、scaled(缩放后)、interpolation(插帧)|
|enable|bool|是否启用|
|debug|bool|是否调试|

## 画布对象

画布对象提供了在视频画面上叠加自定义图案的功能。

### newCanvas

创建一个画布对象

```python
player.newCanvas(self, fps)
```

参数

|参数|类型|说明|
|--|--|--|
|fps|int|画布的刷新帧率|

一个画布对应播放窗口上的一块显示区域，插件中可以创建多个 canvas 对象，相应的内容会依次绘制到视频画面上。

### destroyCanvas

销毁一个画布对象

```python
player.destroyCanvas(self, canvas:Canvas)
```

参数

|参数|类型|说明|
|--|--|--|
|canvas|Canvas|待销毁的 Canvas 对象|

### drawBuffer

在画布上绘制内容

```python
canvas.drawBuffer(self, imageBuffer:bytes, imageWidth, imageHeight, x, y, w, h)
```

参数

|参数|类型|说明|
|--|--|--|
|imageBuffer|bytes|绘制内容（RGBA）的字节数组|
|imageWidth|int|绘制内容的宽度|
|imageHeight|int|绘制内容的高度|
|x|int|绘制内容在视频画面的位置 x|
|y|int|绘制内容在视频画面的位置 y|
|w|int|绘制内容在视频画面的大小 w|
|h|int|绘制内容在视频画面的大小 h|

注意此接口是 canvas 对象的方法，绘制的内容会被拉伸到 w x h 大小

### drawBuffers

在画布上绘制多个内容

```python
canvas.drawBuffers(self,imageWidth,imageHeight,x,y,w,h,images:List[ImageDrawingDescription],clear=True)
```

参数

|参数|类型|说明|
|--|--|--|
|imageWidth|int|最终绘制内容的宽度， 超出的部分会被裁剪|
|imageHeight|int|最终绘制内容的高度|
|images|List[ImageDrawingDescription]|绘制的内容|
|clear|bool|是否清除整混合图像|

其中 `ImageDrawingDescription` 的定义如下

```python
{
    "width": 1,
    "height": 1,
    "buffer": b'\xff\xff\xff\xff',
    "x": 100,
    "y": 100,
    "w": 10,
    "h": 10
}
```

其参数定义同 `drawBuffer`