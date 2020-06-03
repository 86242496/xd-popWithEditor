# xd-popWithEditor
基于layer和wangeditor的弹出

```html
<h3>参数说明</h3>
editorOpt:为wangeditor的参数配置项，可不传，默认只有[
                'head',
                'bold',
                'italic',
                'underline'
            ]<br>
popClose：点确定关闭弹窗后的，回调值为编辑器里的值


<h3>须注意</h3>

<input class="popWithEditor" type="text" readonly /><br>
需要弹窗部分，加上class="popWithEditor" <br>
```html

$('.popWithEditor').xdPopWithEditor({
                editorOpt:[
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    
                    'justify',  // 对齐方式
                
                ],
                popClose:function(resp){
                console.log(resp,'resp')
            }
        })

