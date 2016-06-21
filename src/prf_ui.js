;(function(){'use strict'
// This file implements the Preferences dialog.
// The contents of individual tabs are in separate files: prf_*.js
// Each of them can export the following properties:
//   name       tab title
//   id         a string used to construct DOM ids, CSS classes, etc
//   init()     called only once, before Preferences is opened for the first time
//   load()     called every time Preferences is opened
//   validate() should return a falsey value on success or a {msg,el} object on failure
//   save()     called when OK or Apply is pressed
//   resize()   called when the Preferences dialog is resized or the tab is selected
//   activate() called when the tab is selected ("activated")
// All tabs' validate() methods are invoked, if they exist, before any attempt to call save()
var tabs=D.prf_tabs=[] // tab implementations self-register here

var $d // dialog instance, lazily initialized
function ok(){apply()&&$d.dialog('close')}
function apply(){ // returns 0 on failure and 1 on success
  var v
  for(var i=0;i<tabs.length;i++)if(v=tabs[i].validate&&tabs[i].validate()){
    setTimeout(function(){$.err(v.msg,v.el?function(){v.el.focus()}:null)},1)
    return 0
  }
  for(var i=0;i<tabs.length;i++)tabs[i].save&&tabs[i].save()
  return 1
}
D.prf_ui=function(tabName){
  if(!$d){
    $d=$(
      '<div id=prf>'+
        '<ul id=prf-tabs-nav>'+
          tabs.map(function(t){return'<li><a href=#prf-tab-'+t.id+'>'+t.name+'</a></li>'}).join('')+
        '</ul>'+
        tabs.map(function(t){return'<div id=prf-tab-'+t.id+'></div>'}).join('')+
      '</div>'
    )
      .tabs({activate:function(e,ui){var t=tabs[$(ui.newTab).index()];t.resize&&t.resize();t.activate&&t.activate()}})
      .keydown(function(e){if(e.which===13&&!e.shiftKey&&e.ctrlKey&&!e.altKey&&!e.metaKey){ok();return!1}})
      .on('dragstart',function(){return!1})
      .dialog({
        autoOpen:0,title:'Preferences',width:600,minWidth:600,height:450,minHeight:450,
        resize:function(){for(var i=0;i<tabs.length;i++)tabs[i].resize&&tabs[i].resize()},
        buttons:[
          {html:'<u>O</u>K'    ,click:function(){ok();return!1}},
          {html:'<u>A</u>pply' ,click:function(){apply();return!1}},
          {html:'<u>C</u>ancel',click:function(){$d.dialog('close')}}
        ]
      })
    for(var i=0;i<tabs.length;i++)tabs[i].init&&tabs[i].init($('#prf-tab-'+tabs[i].id))
  }
  $d.dialog('option','position',{at:'center',of:window}).dialog('open')
  tabName&&$d.tabs({active:$('#prf-tabs-nav a[href="#prf-tab-'+tabName+'"]').parent().index()})
  for(var i=0;i<tabs.length;i++)tabs[i].load&&tabs[i].load()
}

}())