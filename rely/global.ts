// 跳转页面组件
export { default as Link } from 'next/link'
// 图表组件
export { default as Image } from 'next/image'
// 路由相关
import { redirect,useRouter,useParams } from 'next/navigation';
// 消息提示
export { default as toast } from 'react-hot-toast';
// 上传图片
export { uploadFile } from '@/lib/request'
// 处理类名
export { cn } from '@/lib/utils'
/**
 * @description 处理日期
 * @example format(field.value, 'PPP', { locale: zhCN }
 */
export { format } from 'date-fns'
// 将日期处理成中文
export { zhCN } from 'date-fns/locale'



// 仓库
export { default as useSystemStore, onChangeMenuGroupKeys, onChangeCollapsed } from '@/store/system'