# Javascript API

恒星播放器插件中可以使用 [webview 控件]，相应也提供了 Javascript API，可以实现 js 对播放器的控制。

javascript 中提供了原生对象 `stellar`，该对象有以下方法或属性：

## showText

在视频画面上显示一行文字，3 秒后自动消失

```javascript
stellar.showText(message)
```

## showNotify

显示右下角消息通知

```javascript
stellar.showNotify({
    "caption": "通知",
    "message": "新影片上映",
    "timeout": 5000,
    "quite": true
})
```

其中：
* caption 消息通知标题
* message 消息通知内容
* timeout 消息通知持续时间
* quite 弹出消息时是否有提示音

## setCaption

设置播放器标题

```javascript
stellar.setCaption(title)
```

## play

播放视频

```javascript
stellar.play({
    "url": "http://test.com/1.m3u8",
    "caption": "影片1",
    "headers": {
        "referer": "http://test.com/"
    }
})
```

其中：
* url 要播放的影片地址
* caption 播放影片时播放器标题
* headers 影片的 http 请求头

## pause

暂停、继续播放视频

```javascript
stellar.pause(flag)
```

其中：
* flag = true 暂停播放
* falg = false 继续播放

## stop

停止播放

```javascript
stellar.stop()
```

## prev

播放播放列表中的上一个视频

```javascript
stellar.prev()
```

## next

播放播放列表中的下一个视频

```javascript
stellar.next()
```

## addToPlaylist

添加项目到播放列表

```javascript
stellar.addToPlaylist({
    "folder": "文件夹",
    "items": [
        {
            "name": "文件",
            "url": "http://test.com/1.m3u8",
            "headers": {
                "referer": "http://test.com/"
            }
        }
    ],
    "autoPlayIndex": -1
})
```

其中：
* folder 文件夹名称
* items 待添加的项目
    - name 项目名称
    - url 项目影片地址
    - headers 项目的 http 请求头
* autoPlayIndex 自动播放的影片序号，-1 表示不自动播放

## playPlaylist

播放播放列表中的项目

```javascript
stellar.playPlaylist(index)
```

其中：
* index 为要播放的项目序号

## setPlaylistCate

选择播放列表类别

```javascript
stellar.setPlaylistCate(index)
```

其中：
* index 为要切换的类别 index

## getSnapshot

获取当前视频截图

```javascript
stellar.getSnapshot({
    "width": 200,
    "height": 200,
    "callback": function(ret) {

    }
})
```
其中：
* width 为截图宽度；
* height 为截图高度；
* callback 为截图成功后的回调函数，回调函数参数即为截取图片的 base64；


## getThumbnail

获取当前视频指定位置缩略图

```javascript
stellar.getThumbnail({
    "width": 200,
    "ms": 60000,
    "callback": function(ret) {

    }
})
```

其中：
* width 为截图宽度；
* ms 为目标位置，单位毫秒；
* callback 为截图成功后的回调函数，回调函数参数即为截取图片的 base64；

## totalTime

属性，当前视频总时长，毫秒
只读


## currentPlayTime

属性，当前视频播放位置，毫秒
读写




