do ->
  D.nwjs = process?
  if D.nwjs
    nww = require('nw.gui').Window.get()
    if !opener # restore window state:
      winProps = 'x y width height isFullscreen'.split ' '
      do -> if winInfo = (try JSON.parse localStorage.winInfo) then for p in winProps then nww[p] = winInfo[p]
    nww.show()
    nww.on 'close', ->
      if !opener # save window state:
        winInfo = {}; (for p in winProps then winInfo[p] = nww[p]); localStorage.winInfo = JSON.stringify winInfo
      window.onbeforeunload?(); window.onbeforeunload = null; nww.close true; return
    D.zoomIn    = -> nww.zoomLevel++;   return
    D.zoomOut   = -> nww.zoomLevel--;   return
    D.resetZoom = -> nww.zoomLevel = 0; return
    $(document).on 'keydown', '*', 'f12', -> nww.showDevTools(); false
  D.urlParams = {}
  for kv in (location + '').replace(/^[^\?]*($|\?)/, '').split '&'
    [_, k, v] = /^([^=]*)=?(.*)$/.exec kv; D.urlParams[unescape(k or '')] = unescape(v or '')
  if opener && (win = D.urlParams.win)? # are we running in a floating editor window?
    $ ->
      wins = opener.D.wins
      $('body').html('<div class="ui-layout-center"></div>').layout
        defaults: enableCursorHotkey: 0
        center: onresize: -> ed?.updateSize(); return
        fxName: ''
      ed0 = wins[win]; ed = wins[win] = D.Editor $('.ui-layout-center'), ed0.getOpts()
      ed.setValue ed0.getValue(); ed.setCursorIndex ed0.getCursorIndex(); ed.updateSize(); ed.focus(); ed0 = null
      window.onbeforeunload = -> ed.saveAndClose(); return
      return
  else
    if D.nwjs
      class LocalSocket
        emit: (a...) -> @other.onevent data: a
        onevent: ({data}) -> (for f in @[data[0]] or [] then f data[1..]...); return
        on: (e, f) -> (@[e] ?= []).push f; @
      socket = new LocalSocket; socket1 = new LocalSocket; socket.other = socket1; socket1.other = socket
      setTimeout (-> require('./proxy').Proxy() socket1), 1
      D.quit = -> require('nw.gui').Window.get().close(); return
    else
      socket = io()
      D.quit = close
    D.socket = socket
    $ -> D.connectPage(); return

  $ ->
    # https://nodejs.org/api/process.html#process_process_platform
    # https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
    # The theme can be overridden through localStorage.theme or an environment variable $DYALOG_IDE_THEME
    $('body').addClass "theme-#{
      localStorage?.theme || process?.env?.DYALOG_IDE_THEME || do ->
        p = (process ? navigator).platform
        if /^(darwin|mac|ipad|iphone|ipod)/i.test p then 'cupertino'
        else if /^(linux|x11|android)/i.test p then 'freedom'
        else 'redmond'
    }"
    return

  return
