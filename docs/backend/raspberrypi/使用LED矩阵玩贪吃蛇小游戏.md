---
lang: zh-CN  
title: 使用LED矩阵玩贪吃蛇小游戏         
description: 页面的描述
---

# 使用LED矩阵玩贪吃蛇小游戏

[[toc]]

### 本文必看

1、请小伙伴先完成[通过MAX7219模块驱动矩阵屏](通过MAX7219模块驱动矩阵屏.md)  
2、由于精力有限，Python版本暂不提供了，对应逻辑可以参考如下代码即可。

### 所需材料

- 树莓派
- MAX7219芯片
- 若干Led（最低不少于64个）/ 整体矩阵屏
- 万能板（焊接Led）
- 轻触开关5个

### 实现方案

通过控制电路，点亮/熄灭Led灯实现，Led矩阵地图如下

```text:no-line-numbers
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
```

模拟贪吃蛇动画

- 0：空白地图  
- 1：蛇的身体（点亮Led灯）  
- 2：食物（点亮Led灯）

```text:no-line-numbers
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  1  0  0  0  
0  0  0  0  1  0  0  0  
0  0  0  0  1  0  0  0  
0  0  0  0  0  0  0  0  
0  2  0  0  0  0  0  0  
```

向上走一步

```text:no-line-numbers
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  1  0  0  0  
0  0  0  0  1  0  0  0  
0  0  0  0  1  0  0  0  
0  0  0  0  0  0  0  0  
0  0  0  0  0  0  0  0  
0  2  0  0  0  0  0  0  
```

### 电路连接图

树莓派、轻触开关、MAX7219芯片连接图

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/MAX7219贪吃蛇.drawio.png" alt="none" style="width: 70%;height: 70%;border-radius: 6px;">

### 启用SPI

[启用树莓派的SPI接口](启用树莓派的SPI接口.md)


### 游戏程序

坐标类，标记蛇的身体，与食物的坐标系。

```java
public class Coordinate {
    int x;
    int y;

    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "Coordinate{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
```

贪吃蛇类，目前游戏规则蛇碰到右侧墙壁，头从左侧出来，如果设置碰到墙直接游戏结束，可以修改下面`if (newX > 7){游戏结束}`处代码， 并且此类可以不需要矩阵屏单独运行调试，通过不停的调用`debugPrintMap()`方法，
在控制台打印游戏动画。

```java
public class Snake {

    /**
     * 初始化地图
     */
    public int[][] map = new int[8][8];

    /**
     * 当前食物位置
     */
    public Coordinate food;

    /**
     * x y 蛇的身体  模拟被点亮的灯坐标
     */
    public List<Coordinate> body = new ArrayList<>();

    /**
     * 爬行速度
     */
    public int walkingSpeed;

    /**
     * 当前行走方向
     */
    public volatile int direction = 1;

    /**
     * 0 正在爬行  1 蛇已经死亡  2 蛇完成挑战
     */
    public volatile int status = 0;

    public Snake(int walkingSpeed, int direction) {
        this.walkingSpeed = walkingSpeed;
        this.direction = direction;

        // 初始化身体
        body.add(new Coordinate(4, 4));
        body.add(new Coordinate(4, 5));
        body.add(new Coordinate(4, 6));
        // 初始化食物
        food = this.randomFood();
    }

    public synchronized void upper() {
        if (direction == 2) {
            // 不可回头
            return;
        }
        direction = 1;
    }

    public synchronized void lower() {
        if (direction == 1) {
            return;
        }
        direction = 2;
    }

    public synchronized void right() {
        if (direction == 3) {
            return;
        }
        direction = 4;
    }

    public synchronized void left() {
        if (direction == 4) {
            return;
        }
        direction = 3;
    }

    public synchronized void move() {
        // 获取头部坐标
        Coordinate st = this.body.get(0);
        int newY = st.y;
        int newX = st.x;
        switch (direction) {
            case 1:
                // 上
                newY = st.y - 1;
                break;
            case 2:
                // 下
                newY = st.y + 1;
                break;
            case 3:
                // 左
                newX = st.x - 1;
                break;
            case 4:
                // 右
                newX = st.x + 1;
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + direction);
        }
        // 碰到右侧墙壁，头从左侧出来
        if (newX > 7) {
            newX = 0;
        }
        // 碰到左侧侧墙壁，头从右侧出来
        if (newX < 0) {
            newX = 7;
        }
        if (newY > 7) {
            newY = 0;
        }
        if (newY < 0) {
            newY = 7;
        }
        // 是否吃到了自己
        boolean hitSelf = this.hitSelf(newX, newY);
        if (hitSelf) {
            System.out.println("吃到自己，游戏结束");
            this.status = 1;
            return;
        }
        // 可以走
        this.body.add(0, new Coordinate(newX, newY));
        // 是否吃到了食物
        if (food.x == newX && food.y == newY) {
            // 吃到了食物,食物的位置重新随机
            food = this.randomFood();
        } else {
            this.body.remove(this.body.size() - 1);
        }
        if (this.body.size() >= 55) {
            System.out.println("你赢了");
            this.status = 2;
        }
    }

    /**
     * 坐标是否为自己身体某一部分
     *
     * @param x x
     * @param y y
     * @return true 是
     */
    public boolean hitSelf(int x, int y) {
        for (Coordinate s : body) {
            if (s.x == x && s.y == y) {
                return true;
            }
        }
        return false;
    }


    /**
     * 随机一个食物
     */
    public Coordinate randomFood() {
        List<Coordinate> foods = new ArrayList<>();
        for (int y = 0; y < map.length; y++) {
            for (int x = 0; x < map[y].length; x++) {
                // 排除掉自己，不会在自己身上出现食物
                if (this.hitSelf(x, y)) {
                    continue;
                }
                foods.add(new Coordinate(x, y));
            }
        }
        return foods.remove(ThreadLocalRandom.current().nextInt(0, foods.size()));
    }


    /**
     * debug
     */
    public void debugPrintMap() {
        System.out.println();
        System.out.println();
        for (int y = 0; y < map.length; y++) {
            for (int x = 0; x < map[y].length; x++) {
                // 食物坐标
                if (food.x == x && food.y == y) {
                    System.out.print("2  ");
                    continue;
                }
                // 蛇身体
                if (this.hitSelf(x, y)) {
                    System.out.print("1  ");
                    continue;
                }
                System.out.print("0  ");
            }
            System.out.println();
        }
    }

}
```

完整代码见：[pi4j-demo](https://gitee.com/qwding/pi4j-demo)


<Comment></Comment>
