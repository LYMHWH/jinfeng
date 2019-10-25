UE.registerUI('浏览模式切换',function(editor,uiName){
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:uiName,
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-image: url("/static/images/imgtext.svg") !important;background-size: 15px 15px;background-repeat: no-repeat;background-position: center;',
        //点击时执行的命令
        onclick:function () {
            var oldstr = editor.getContent();
			if(!btn.imgtext) {
				var patt = new RegExp("<(img[\\s]+[^>]+)>","gm");
                oldstr = oldstr.replace(/\s/gm, " ");
                var newstr = oldstr.replace(patt, "&lt;$1&gt;");
			} else {
                var patt = new RegExp("&lt;img[\\s]+.*?&gt;","gm");
                oldstr = oldstr.replace(/\s/gm, " ");
                var newstr = oldstr.replace(patt, function(str){
                   str = str.replace(/&lt;/mg, "<").replace(/&gt;/mg,">").replace(/&quot;/mg, '"').replace(/&nbsp;/mg," ");
				   return str;
			    });
			}
            if(oldstr == newstr) {
                
            } else {
           	    editor.setContent(newstr);
                btn.imgtext = !btn.imgtext;
            }
        }
    });
    btn.imgtext = false;
    //因为你是添加button,所以需要返回这个button
    return btn;
},0);

function getContent(ue) {
    var str = ue.getContent();
    str = str.replace(/\s/gm, " ");
    var patt = new RegExp("&lt;img[\\s]+.*?&gt;","gm");
    str = str.replace(patt, function(str){
        str = str.replace(/&lt;/mg, "<").replace(/&gt;/mg,">").replace(/&quot;/mg, '"').replace(/&nbsp;/mg," ");
        return str;
    });
    return str; 
}