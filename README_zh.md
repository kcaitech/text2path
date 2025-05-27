# Text2Path

Text2Path 基于 Potrace 算法实现，能够在浏览器端将文字转换为 SVG 路径数据

## 安装

```bash
npm install @kcaitech/text2path

```

## 使用方法

```javascript
import { text2path } from '@kcaitech/text2path';

// 获取字符 'A' 的 SVG 路径
const path = text2path('Arial', 32, false, 400, 'A'.charCodeAt(0));

```

## API 文档

### text2path(font, fontSize, italic, weight, charCode)

将单个字符转换为 SVG 路径数据。

#### 参数

- `font` (string): 字体名称
- `fontSize` (number): 字体大小
- `italic` (boolean): 是否使用斜体
- `weight` (number): 字体粗细（如 400 为普通，700 为粗体）
- `charCode` (number): 字符的 Unicode 编码

#### 返回值

返回标准的 SVG 路径数据字符串（path data）。

## 工作原理

1. 在 Canvas 上渲染文字
2. 获取文字的像素数据
3. 使用 Potrace 算法提取轮廓
4. 生成 SVG 路径数据
5. 缓存结果以提升性能

## 许可证

GPL-2.0，继承自potrace-ts