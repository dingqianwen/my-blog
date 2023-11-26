---
lang: zh-CN
title: C语言控制台实现贪吃蛇  
description: 页面的描述
head:

- [ meta, { name: keywords, content: 'C语言控制台实现贪吃蛇' } ]
- [ meta, { name: description, content: 'C语言控制台实现贪吃蛇' } ]

---

# C语言控制台实现贪吃蛇  

控制台打印如下，`1`表示蛇的身体，`2`表示食物，`0`表示空白。

```shell
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  1  0  0  0
0  0  0  2  1  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0

0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  1  1  0  0  0
0  0  0  2  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0

0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  1  1  0  0  0  0
0  0  0  2  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0

x=2,y=3
x=3,y=3
food x=3,y=4

```

源码如下

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>


typedef struct {
    int x;
    int y;
} Point;

typedef struct {
    Point *data;
    int size;
    int capacity;
} ArrayList;

void init(ArrayList *list) {
    list->size = 0;
    list->capacity = 1;
    list->data = (Point *) malloc(sizeof(Point) * list->capacity);
}

void add(ArrayList *list, int x, int y) {
    if (list->size == list->capacity) {
        // 容量不足，重新分配内存
        list->capacity *= 2;
        list->data = (Point *) realloc(list->data, sizeof(Point) * list->capacity);
    }
    Point point;
    point.x = x;
    point.y = y;
    list->data[list->size] = point;
    list->size++;
}


Point random_element(ArrayList *list) {
    srand((unsigned) time(NULL));
    int index = rand() % list->size;
    return list->data[index];
}


void insert(ArrayList *list, int index, int x, int y) {
    if (index < 0 || index > list->size) {
        return;  // 索引无效
    }
    if (list->size == list->capacity) {
        // 容量不足，重新分配内存
        list->capacity *= 2;
        list->data = (Point *) realloc(list->data, sizeof(Point) * list->capacity);
    }
    // 移动元素，为新元素腾出位置
    for (int i = list->size; i > index; i--) {
        list->data[i] = list->data[i - 1];
    }
    Point point;
    point.x = x;
    point.y = y;
    list->data[index] = point;
    list->size++;
}

Point get(ArrayList *list, int index) {
    Point invalid_point;
    invalid_point.x = -1;
    invalid_point.y = -1;

    if (index >= 0 && index < list->size) {
        return list->data[index];
    }
    return invalid_point;  // 索引无效
}

void removeElement(ArrayList *list, int index) {
    if (index < 0 || index >= list->size) {
        return;  // 索引无效
    }

    // 移动元素
    for (int i = index; i < list->size - 1; i++) {
        list->data[i] = list->data[i + 1];
    }
    list->size--;

    // 如果元素个数较少，可以缩小容量
    if (list->size > 0 && list->size <= list->capacity / 4) {
        list->capacity /= 2;
        list->data = (Point *) realloc(list->data, sizeof(Point) * list->capacity);
    }
}

void destroy(ArrayList *list) {
    free(list->data);
}


typedef struct {
    int map[8][8];
    Point food;
    ArrayList body;
    int walkingSpeed;
    int direction;
    int status;
} Snake;

Snake snake;

Point random_food();

void initializeSnake(int walkingSpeed, int direction) {
    snake.walkingSpeed = walkingSpeed;
    snake.direction = direction;
    // 初始化地图
    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            snake.map[i][j] = 0;
        }
    }
    init(&snake.body);
    // 初始化身体
    add(&snake.body, 4, 4);
    add(&snake.body, 4, 5);
    add(&snake.body, 4, 6);
    // 初始化食物
    snake.food = random_food();
}

int hitSelf(int x, int y) {
    for (int i = 0; i < 64; i++) {
        if (get(&snake.body, i).x == x && get(&snake.body, i).y == y) {
            return 1;
        }
    }
    return -1;
}

/**
 * 随机一个食物位置，不能和蛇的身体重合
 */
Point random_food() {
    ArrayList list;
    init(&list);
    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; ++j) {
            int hit = hitSelf(j, i);
            if (hit == -1) {
                add(&list, j, i);
            }
        }
    }
    Point p = random_element(&list);
    // 释放内存
    destroy(&list);
    return p;
}


void upper() {
    if (snake.direction == 2) {
        // 不可回头
        return;
    }
    snake.direction = 1;
}

void lower() {
    if (snake.direction == 1) {
        return;
    }
    snake.direction = 2;
}

void right() {
    if (snake.direction == 3) {
        return;
    }
    snake.direction = 4;
}

void left() {
    if (snake.direction == 4) {
        return;
    }
    snake.direction = 3;
}

void move() {
    // 获取头部坐标
    Point st = get(&snake.body, 0);
    int newY = st.y;
    int newX = st.x;
    switch (snake.direction) {
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
    int hit = hitSelf(newX, newY);
    if (hit == 1) {
        printf("Game over\n");
        snake.status = 1;
        return;
    }
    // 可以走
    insert(&snake.body, 0, newX, newY);
    // 是否吃到了食物
    if (snake.food.x == newX && snake.food.y == newY) {
        // 吃到了食物,食物的位置重新随机
        snake.food = random_food();
    } else {
        // 没有吃到食物,删除body sizeof(snake.body) / sizeof(snake.body[0])长度的最后一个
        removeElement(&snake.body, snake.body.size - 1);
    }
    if (snake.body.size >= 55) {
        // 打印游戏胜利日志
        printf("Game victory\n");
        snake.status = 2;
    }
}

/**
 * 打印地图，1表示蛇的身体，2表示食物 0表示空白
 */
void snake_debug() {
    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            if (snake.food.x == j && snake.food.y == i) {
                printf("2  ");
                continue;
            }
            int hit = hitSelf(j, i);
            if (hit == 1) {
                printf("1  ");
                continue;
            }
            //
            printf("%d  ", snake.map[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

int main() {
    initializeSnake(1, 1);
    move();
    snake_debug();
    left(); // 左拐
    move();
    snake_debug();
    move();
    snake_debug();
    // 打印身体
    for (int i = 0; i < snake.body.size; i++) {
        Point point = get(&snake.body, i);
        printf("x=%d,y=%d\n", point.x, point.y);
    }
    // 打印食物
    printf("food x=%d,y=%d\n", snake.food.x, snake.food.y);
    destroy(&snake.body);
    return 0;
}
```