# WebGL Funny

## [cat](https://g-weld.vercel.app/cat/cat.html)
inspired by [alone](https://codepen.io/ge1doot/pen/ooomdy)  
用webglfundamentals的方式重新实现了，原来的代码将3d转2d太变态看不懂QAQ

## [slider](https://g-weld.vercel.app/slider/index.html)
inspired by [Slider](https://codepen.io/ashthornton/pen/KRQbMO)  
寡妇太好看了

## [noise](https://g-weld.vercel.app/noise/index.html)
inspired by [WebGL进阶——走进图形噪声](https://juejin.cn/post/6844903862298476557#heading-11)  
噪声，就是模拟自然纹理，如大理石纹理，水纹，烟雾，`noise`这个名起得蛮有意思的  
1. 梯度噪声 [Gradient](https://g-weld.vercel.app/noise/gradient.html)
2. 细胞噪声 [Celluar](https://g-weld.vercel.app/noise/cell.html)
3. 翘曲域 [Domain Wrapping](https://g-weld.vercel.app/noise/wrapping.html) （名字听着就牛逼哄哄）

## [particle](https://g-weld.vercel.app/particle/index2.html) 
inspired by [gl particle sns icons](https://codepen.io/kenjiSpecial/pen/wavooR?editors=1010)  
爆炸的粒子效果  
**实现方案**  
1. 定义粒子数量 `numLines` [Array]
2. 计算图片每个像素的位置(作者对x/y坐标都除以图片宽/高，所以坐标大小被限制在0~1之间，所以要注意将相机调近，不然啥也看不到，别问我怎么知道的T T)
3. 随机取x/y坐标插入粒子数组中  
关键是步骤3，随机插入的算法，没看懂
```javascript
var coefficient = 0.4
var targetCoefficient = 0.01
function draw() {
  var i,
    n = vertices_temp.length,
    p,
    bp
  var px, py
  var pTheta
  var rad
  var num
  // numLines是粒子长度
  // vertices_temp 顶点坐标（粒子数组）
  coefficient += (targetCoefficient - coefficient) * 0.1
  for (i = 0; i < numLines * 1; i += 2) {
    count += 0.3
    bp = i * 3

    vertices_temp[bp] = vertices_temp[bp + 3]
    vertices_temp[bp + 1] = vertices_temp[bp + 4]

    num = parseInt(i / 2)

    var targetPosX = randomTargetXArr[num]
    var targetPosY = randomTargetYArr[num]

    px = vertices_temp[bp + 3]
    px +=
      (targetPosX - px) * coefficient + (Math.random() - 0.5) * coefficient
    vertices_temp[bp + 3] = px

    py = vertices_temp[bp + 4]
    py +=
      (targetPosY - py) * coefficient + (Math.random() - 0.5) * coefficient
    vertices_temp[bp + 4] = py
  }     
```
