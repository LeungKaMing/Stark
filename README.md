# Stark
> 一键生成页面

## 设计思路
左侧菜单 - 存放组件
中间舞台 - 展示预览的页面
右侧面板 - 设置样式

### 左侧菜单
1. 从菜单移动元素到舞台，左侧菜单显示的项不能有所减少 => 舞台监听到有元素进入，就马上补充左侧菜单的项数量至原有数量

### 中间舞台
1. 默认第一层就存在水平/竖直排布概念（？） => 需要给<dragable>标签的元素手动加样式了 【ok, 因为对于整个舞台区来言，得要用一块区域是让这些元素水平/竖直排布，而不是整个舞台都能随心所欲想怎么拖就怎么拖 => 这应该是插件受控的原因】
2. 希望某个区域，同时存在水平/竖直排布概念(css排布元素概念) => 需要通过容器组件来执行（真的需要）
3. 而且用到容器组件最大的好处是：知道页面元素之间的排序顺序，这对渲染是很重要的

