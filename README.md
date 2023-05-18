@import "~antd/dist/antd.less";

@primary-color: #1890ff; //主题色
@border-radius-base: 2px;
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
@border-radius-base: 2px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色

// 引入
import cookie from 'react-cookies'
// 存
cookie.save(‘token’, "123”,{});
// 取
cookie.load('token’);
// 删除
cookie.remove('token')
// 存数据时设置失效时间
const oneDay = new Date(new Date().getTime() + 24 * 3600 * 1000); 
// 设置失效日期一天
cookie.save("token", "ffffffffff", { expires: oneDay });