---
lang: zh-CN  
title: java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先?  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先'}]  

---

# java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先?

[[toc]]

如果广大网友发现比我第二种方式还要更好的实现，我则删帖，不服来干！

## 如题要求：

### java输入一个字符串，要求将改字符串中出现的英文字母，按照顺序进行输出，区分大小写，且大写优先？

```text
例如：
输入：A8r4c5ja5AJp#7
输出：AAacJjpr
```

## 实现：

### 第一种实现：

刚看到群里有人发出了这个题，我第一个想法就是通过排序来处理，但是单纯通过Arrays.sort();排序的话并不能完成目的。后来初步写出了第一个实现方案如下：

```java
		String str = "as3BfAisdD4kA1";
		String result = str.chars().filter(f -> {
		    // 过滤小写
		    if (f >= 'a' && f <= 'z') {
		        return true;
		    }
		    // 过滤大写
		    return f >= 'A' && f <= 'Z';
		}).mapToObj(m -> {
		            int order = m;
		            // 如果小于a 则-32 为 大A  减去31 则跟随在大A后面，否则是前面
		            if (m >= 'a') {
		                order = m - 31;
		            }
		            return new Cla((char) m, order);
		        }
		).sorted(Comparator.comparing(Cla::getOrder)) // 排序
		        .map(m -> String.valueOf(m.data)) // 获取到对应的值
		        .collect(Collectors.joining());
		System.out.println(result);

		@AllArgsConstructor
		@Data
		class Cla {
		    public char data;
		    public int order;
		}
```

### 第二种实现：

今天吃饭途中想到，可以换一个思路实现，此思想目前发现应该是全网性能最高的存在，不服来干吧！

```java
        String str = "as3BfAisdD4kA1";
        int[] max = new int[26];
        int[] min = new int[26];
        for (int i = 0; i < str.length(); i++) {
            int f = str.charAt(i);
            if (f >= 65 && f <= 90) {
                max[(f - 65)]++;
            } else if (f >= 97 && f <= 122) {
                min[(f - 97)]++;
            }
        }

        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < 26; i++) {
            int x = max[i];
            for (int j = 0; j < x; j++) {
                builder.append((char) (i + 65));
            }
            int y = min[i];
            for (int j = 0; j < y; j++) {
                builder.append((char) (i + 97));
            }
        }
        System.out.println(builder);
```

### 再优化（还有谁？）：

```java
        String str = "as3BfAisdD4kA1";
        int[] max = new int[26];
        int[] min = new int[26];
        int len = 0;
        byte[] strBytes = str.getBytes();
        for (int i = 0; i < str.length(); i++) {
            int f = strBytes[i];
            if (f >= 65 && f <= 90) {
                max[(f - 65)]++;
                len++;
            } else if (f >= 97 && f <= 122) {
                min[(f - 97)]++;
                len++;
            }
        }
        int[] newStrBytes = new int[len];
        int index = 0;
        for (int i = 0; i < 26; i++) {
            int x = max[i];
            for (int j = 0; j < x; j++) {
                newStrBytes[index++] = (i + 65);
            }
            int y = min[i];
            for (int j = 0; j < y; j++) {
                newStrBytes[index++] = (i + 97);
            }
        }
        System.out.println(new String(newStrBytes, 0, len));
```


<Comment></Comment>
