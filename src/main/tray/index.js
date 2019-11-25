import { Menu, Tray, app, dialog } from 'electron'
import { getWin } from '../index'

let tray = null

// 激活窗口
function activeMainWin () {
  let win = getWin()
  if ( win ) {
    if (win.isVisible()) {
      win.focus()
    }
  }
}

// 退出销毁对象
app.on('quit', () => {
  tray && tray.destroy()
  tray = null
})

// 新建非模态窗口


// 创建系统托盘
export function creatTray () {
  // new Tray
  tray = new Tray('./static/resource/win/icon.ico')

  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '关于',
      click (menuItem, win, event) {
        console.log('menuItem:', menuItem)
        console.log('win:', win) // win: null
        console.log('event:', event) // { shiftKey: true, ctrlKey: true, altKey: true, metaKey: false }

        dialog.showMessageBox ({
          message: 'this is a test project by eric xin.'
        })
      }
    },
    { type: 'separator' }, // 分割线
    { 
      label: '退出',
      click (menuItem, win, event) {
        app.quit()
      }
    }
  ])

  tray.setToolTip('This is my test project')

  tray.on('click', (event, bounds, pos) => { // 左键点击
    try {
      // 激活窗口
      activeMainWin()
    } catch (err) {
      console.error(err)
    }
  })
  .on('right-click', (event) => { // 右键点击
    // 弹出菜单
    tray.popUpContextMenu(contextMenu)
  })
}


