# 事件

播放器通过事件调用插件中实现的相应方法，有两种类型的事件：
1. 播放器事件
2. 控件事件

## 播放器事件

由播放器的状态等发生变化时触发的事件，如开始播放、暂停等。
事件定义为插件对象的成员方法，由播放器在相应情况下调用。

### 插件启动

`start`

插件成功初始化后会触发启动事件，注意插件启动并不意味用户点击了插件，此时插件在后台运行。
插件如果是随播放器启动，则在播放器启动过程中会触发插件的 start 事件， 如果插件是手动启用或者刚安装，也会触发 start 事件。
可以在此事件中进行一些插件初始化相关的操作。

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def start(self):      
        return super().start()
```

### 插件停止

`stop`

插件退出或被禁用时会触发插件的 stop 事件

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def stop(self):      
        return super().stop()
```

### 显示

`show`

当用户在主界面或者插件菜单中调用插件时，会触发插件的 show 事件。
一般在 show 事件中显示插件界面。

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def show(self):
        controls = [    
            {'type':'label','name':'text', 'height': 40},
            {'type':'webview','value':'https://www.stellarplayer.com/blog/'}
        ]
        self.doModal('main',600, 500,'测试', controls)
```

### 画面渲染

`onVideoRendered`

当视频画面渲染每帧都会触发此事件，可以在该事件中进行动画绘图操作
绘图相关 API 请参见 [API]

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def onVideoRendered(self, pts):  
        # pts 为当前画面时间，单位毫秒  
        ...
```

### 地址解析

`onUrlInput`

当用户打开 Url 地址失败时，会触发此事件。
可以在事件响应方法中通过 player.dispatchResult 异步返回 url 的解析结果。

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def onUrlInput(self, dispatchId, url):
        # url 为播放器打开失败的 url
        print(url)
        ...
        self.player.dispatchResult(dispatchId, url=url, result=result)
```

### 对话框创建成功后

`onModalCreated`

当插件调用 doModal 创建窗口成功后，会调用此回调

## 控件事件

控件事件指的是当用户操作了插件中的控件时触发的事件，比如点击按钮等。

### 点击

`onClick`

当用户点击了按钮控件时触发，默认会调用插件下的 onClick 方法

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def onClick(self, control):
        # control 为被点击的控件名称，用于业务区分
        print(control)
```

也可以在创建控件时使用 `@click` 的缩写，将点击事件映射到插件对象的特定成员方法上：

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def show(self):
        controls = [
            {
                'type':'button',
                'name':'btn',
                'height': 40, 
                'width': 200, 
                'textColor': '#ffffff', 
                'fontSize': 20,
                'value': 1,
                'matchParent': True,
                '@click': 'on_hello'
            },
            {'type':'space'}
        ]

        self.doModal('main',800, 600,'测试', controls)    

    def on_hello(self, *a, **k):        
        print('hello')
```

### 输入框输入

`onEditInput`

当用户在输入框中输入时，会触发此事件，可以在此事件中进行即时搜索类似操作。

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def onEditInput(self, page, control, value):
        # page 对话框名称
        # control 触发 onEditInput 事件的控件名称
        # value 输入框文字
        print(control)
```


也可以在创建控件时使用 `@input` 的缩写，将点击事件映射到插件对象的特定成员方法上：

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def show(self):
        controls = [    
            {'type':'edit','name':'text', 'height': 40, '@input': 'on_hello'},
            {'type':'space'}
        ]
        self.doModal('main',600, 500,'测试', controls)

    def on_hello(self, page, control, value):
        # page 对话框名称
        # control 触发 onEditInput 事件的控件名称
        # value 输入框文字
        print(value)
```

### 列表项双击

`onListItemDblClick`

当用户双击列表项时，会触发此事件。

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def show(self):
        itemlayout = [
        [
            {
                'type':'image',
                'name':'image',
                'height': 30, 
                'width': 30
            },
            {
                'type': 'space',
                'width': 8
            },
            {
                'type':'label',
                'name':'desp',
                'textColor': '#000000', 
                'fontSize': 15,
                'width': 100
            }
        ]
    ]
    value = [
        {
            'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
            'desp': 'item1'
        },
        {
            'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
            'desp': 'item2'
        }
    ]
    controls = [
        {
            'type':'list',
            'name':'list',
            'itemheight': 30, 
            'itemlayout': itemlayout,
            'height': 200,
            'value': value,
        },
        {'type':'space'}
    ]
        self.doModal('main',600, 500,'测试', controls)

    def onListItemDblClick(self, page, control, item):
        # page 对话框名称
        # control 触发事件的控件名称
        # item 双击的 item 序号
        print(f'onListItemClick, {control=},{item=}')
```

网格 grid 中的元素被双击时也会触发此事件。

此事件也可通过 `@dblclick` 绑定到指定的方法上

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def show(self):
        itemlayout = [
        [
            {
                'type':'image',
                'name':'image',
                'height': 30, 
                'width': 30
            },
            {
                'type': 'space',
                'width': 8
            },
            {
                'type':'label',
                'name':'desp',
                'textColor': '#000000', 
                'fontSize': 15,
                'width': 100
            }
        ]
    ]
    value = [
        {
            'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
            'desp': 'item1'
        },
        {
            'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
            'desp': 'item2'
        }
    ]
    controls = [
        {
            'type':'list',
            'name':'list',
            'itemheight': 30, 
            'itemlayout': itemlayout,
            'height': 200,
            'value': value,
            '@dblclick': 'on_hello'
        },
        {'type':'space'}
    ]
        self.doModal('main',600, 500,'测试', controls)

    def on_hello(self, page, control, item):
        # page 对话框名称
        # control 触发事件的控件名称
        # item 双击的 item 序号
        print(f'onListItemClick, {control=},{item=}')

```

### 列表控件点击

`onListItemControlClick`

当用户点击了列表项目中的控件时（比如按钮），会触发此事件

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def show(self):
        itemlayout = [
            [
                {
                    'type':'image',
                    'name':'image',
                    'height': 30, 
                    'width': 30
                },
                {
                    'type': 'space',
                    'width': 8
                },
                {
                    'type':'button',
                    'name':'desp',
                    'textColor': '#000000', 
                    'fontSize': 15,
                    'width': 100
                }
            ]
        ]
        value = [
            {
                'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
                'desp': 'item1'
            },
            {
                'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
                'desp': 'item2'
            }
        ]
        controls = [
            {
                'type':'list',
                'name':'list',
                'itemheight': 30, 
                'itemlayout': itemlayout,
                'height': 200,
                'value': value,
            },
            {'type':'space'}
        ]
        self.doModal('main',600, 500,'测试', controls)

    def onListItemControlClick(self, page, listControl, item, itemControl):
        # page 对话框名称
        # listControl 触发事件的控件名称
        # item 双击的 item 序号
        # itemControl 点击的控件名称
        print(f'onListItemControlClick,{page=},{listControl=},{item=},{itemControl=}')
```

此事件也可通过 `@click` 绑定到指定的方法上，注意 `@click` 要定义在 layout 上

```python
class myplugin(StellarPlayer.IStellarPlayerPlugin):
    def show(self):
        itemlayout = [
            [
                {
                    'type':'image',
                    'name':'image',
                    'height': 30, 
                    'width': 30,
                    '@click': 'on_hello'
                },
                {
                    'type': 'space',
                    'width': 8
                },
                {
                    'type':'button',
                    'name':'desp',
                    'textColor': '#000000', 
                    'fontSize': 15,
                    'width': 100
                }
            ]
        ]
        value = [
            {
                'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
                'desp': 'item1'
            },
            {
                'image': 'https://static.coldlake1.com/staticsource/website-master/assets/app-logo.5379c2ba.png',
                'desp': 'item2'
            }
        ]
        controls = [
            {
                'type':'list',
                'name':'list',
                'itemheight': 30, 
                'itemlayout': itemlayout,
                'height': 200,
                'value': value,
            },
            {'type':'space'}
        ]
        self.doModal('main',600, 500,'测试', controls)

    def on_hello(self, page, listControl, item, itemControl):
        # page 对话框名称
        # listControl 触发事件的控件名称
        # item 双击的 item 序号
        # itemControl 点击的控件名称
        print(f'onListItemControlClick,{page=},{listControl=},{item=},{itemControl=}')
```