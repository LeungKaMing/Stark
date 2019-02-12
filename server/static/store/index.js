// react-redux
// every request is to create a new Redux store instance
import {createStore} from 'redux'
import { Provider } from 'react-redux'  // 用于将redux注入到react
import {rootReducer} from './reducers'

// 都写在这里，自行抽离吧
// server
// 创建store
const serverStore = createStore(rootReducer)
/**
 * renderToString(<Provider store={serverStore}>
 *   <App />
 * </Provider>)
 */
// 获取store的初始化state => store.getState()
// 然后导出赋值给window
window.__STATE__ = serverStore.getState()

// client
const clientStore = createStore(rootReducer, window.__STATE__)
/**
 * hydrate(<Provider store={serverStore}>
 *   <App />
 * </Provider>, document.getElementById('root'))
 */