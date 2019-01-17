// 专门用于插入demo数据
const utils = require('./index')
const nanoid = require('nanoid')

utils.test({
    global: {
		name: 'test',
		onlineTime: new Date().getTime(),
		offlineTime: new Date().getTime('2019-01-31')
	},
    layers: {},
    pages: {},
    events: {},
    compons: [
      {
        id: nanoid(),
        name: 'button',
        data: {
            style: {
              width: '100%',
              height: '100px',
              backgroundColor: 'blue',
              fontSize: '12px',
              textAlign: 'center',
              border: '',
              borderRadius: '',
              icon: '',
              float: '',
            },
            props: {
              text: 'I am button.'
            }
        }
      },
      {
        id: nanoid(),
        name: 'image',
        data: {
            style: {
              width: '100%',
              height: '100px',
              backgroundColor: 'green',
              fontSize: '12px'
            },
            props: {
              imgSrc: 'https://avatars3.githubusercontent.com/u/18412359?s=40&v=4'
            }
        }
      },
      {
        id: nanoid(),
        name: 'text',
        data: {
            style: {
              width: '100%',
              height: '100px',
              lineHeight: '100px',
              backgroundColor: 'green',
              fontSize: '12px',
              textAlign: 'center'
            },
            props: {
              text: 'I am text.'
            }
        }
      },
      {
        id: nanoid(),
        name: 'container',
        data: {
            compons: [
              {
                id: nanoid(),
                name: 'button',
                data: {
                  style: {
                    display: 'block',
                    width: '100%',
                    height: '100px',
                    backgroundColor: 'pink',
                    fontSize: '12px',
                    color: '#fff'
                  },
                  props: {
                    text: 'I am inner button.'
                  }
                }
              }
            ]
        }
      }
    ]
  }, 'activity')