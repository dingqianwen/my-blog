---
lang: zh-CN  
title: 'fasterxml日期反序列化'   
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'fasterxml日期反序列化'}]

---

# fasterxml日期反序列化，支持若干格式

[[toc]]

工作中，经常对接外部接口，各个系统日期格式不是很统一，经常报出以下错误

```text
Caused by: com.fasterxml.jackson.databind.exc.InvalidFormatException: Cannot deserialize value of type `java.util.Date` from String "2021-07-20T11:27:31Z": not a valid representation (error: Failed to parse Date value '2021-07-20T11:27:31Z': Unparseable date: "2021-07-20T11:27:31Z")
 at [Source: (org.springframework.util.StreamUtils$NonClosingInputStream); line: 1, column: 9] (through reference chain: com.mfhcd.saas.industry.agency.app.controller.Bean["time"])
	at com.fasterxml.jackson.databind.exc.InvalidFormatException.from(InvalidFormatException.java:67)
	at com.fasterxml.jackson.databind.DeserializationContext.weirdStringException(DeserializationContext.java:1991)
	at com.fasterxml.jackson.databind.DeserializationContext.handleWeirdStringValue(DeserializationContext.java:1219)
```

### 解决方案

针对以上问题问题，编写如下代码

```java
import cn.hutool.core.date.DateException;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


/**
 * 处理应对不同的日期格式
 * <p>
 * 支持日期格式
 * <li>yyyy-MM-dd HH:mm:ss</li>
 * <li>yyyy/MM/dd HH:mm:ss</li>
 * <li>yyyy.MM.dd HH:mm:ss</li>
 * <li>yyyy年MM月dd日 HH时mm分ss秒</li>
 * <li>yyyy-MM-dd</li>
 * <li>yyyy/MM/dd</li>
 * <li>yyyy.MM.dd</li>
 * <li>HH:mm:ss</li>
 * <li>HH时mm分ss秒</li>
 * <li>yyyy-MM-dd HH:mm</li>
 * <li>yyyy-MM-dd HH:mm:ss.SSS</li>
 * <li>yyyy-MM-dd HH:mm:ss.SSSSSS</li>
 * <li>yyyyMMddHHmmss</li>
 * <li>yyyyMMddHHmmssSSS</li>
 * <li>yyyyMMdd</li>
 * <li>EEE, dd MMM yyyy HH:mm:ss z</li>
 * <li>EEE MMM dd HH:mm:ss zzz yyyy</li>
 * <li>yyyy-MM-dd'T'HH:mm:ss'Z'</li>
 * <li>yyyy-MM-dd'T'HH:mm:ss.SSS'Z'</li>
 * <li>yyyy-MM-dd'T'HH:mm:ssZ</li>
 * <li>yyyy-MM-dd'T'HH:mm:ss.SSSZ</li>
 * <li>时间戳</li>
 *
 * @author 丁乾文
 * @date 2022/6/9 20:17
 * @since 1.0.0
 */
public class DateJsonDeserialize {


    /**
     * convert
     *
     * @param text 时间戳 or yyyy-MM-dd HH:mm:ss等
     * @return date
     */
    private static DateTime convert(String text) {
        DateTime date;
        try {
            // 支持若干日期格式，例如{yyyy-MM-dd HH:mm:ss，yyyy-MM-dd}
            date = DateUtil.parse(text);
        } catch (DateException e) {
            // 时间戳，例如{1658214991175}
            if (NumberUtil.isNumber(text)) {
                long timestamp = Long.parseLong(text);
                date = new DateTime(timestamp);
            } else {
                // 不支持的格式
                throw e;
            }
        }
        return date;
    }

    /**
     * LocalDate
     * <p>
     * 属性上增加：@JsonDeserialize(using = LocalDateJsonDeserialize.class)
     *
     * @see DateUtil#parse(java.lang.CharSequence)
     */
    public static class LocalDateType extends JsonDeserializer<LocalDate> {

        @Override
        public LocalDate deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
            if (jsonParser != null && StrUtil.isNotBlank(jsonParser.getText())) {
                DateTime dateTime = DateJsonDeserialize.convert(jsonParser.getText());
                return LocalDateTimeUtil.of(dateTime).toLocalDate();
            } else {
                return null;
            }
        }

    }

    /**
     * LocalDateTime
     * <p>
     * 属性上增加：@JsonDeserialize(using = LocalDateTimeJsonDeserialize.class)
     *
     * @see DateUtil#parse(java.lang.CharSequence)
     */
    public static class LocalDateTimeType extends JsonDeserializer<LocalDateTime> {

        @Override
        public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
            if (jsonParser != null && StrUtil.isNotBlank(jsonParser.getText())) {
                DateTime dateTime = DateJsonDeserialize.convert(jsonParser.getText());
                return LocalDateTimeUtil.of(dateTime);
            } else {
                return null;
            }
        }

    }

    /**
     * Date
     * <p>
     * 属性上增加：@JsonDeserialize(using = DateJsonDeserialize.class)
     *
     * @see DateUtil#parse(java.lang.CharSequence)
     */
    public static class DateType extends JsonDeserializer<Date> {

        @Override
        public Date deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
            if (jsonParser != null && StrUtil.isNotBlank(jsonParser.getText())) {
                return DateJsonDeserialize.convert(jsonParser.getText());
            } else {
                return null;
            }
        }

    }

}
```

### 测试代码

编写如下代码进行简单测试

```java
@RestController
public class TestController {

    @PostMapping("test")
    public Boolean test(@RequestBody Bean bean) {
        System.out.println(bean.getTime1());
        System.out.println(bean.getTime2());
        System.out.println(bean.getTime3());
        return true;
    }

}

@Data
class Bean {

    @JsonDeserialize(using = DateJsonDeserialize.DateType.class)
    private Date time1;

    @JsonDeserialize(using = DateJsonDeserialize.LocalDateType.class)
    private LocalDate time2;

    @JsonDeserialize(using = DateJsonDeserialize.LocalDateTimeType.class)
    private LocalDateTime time3;

}
```

请求接口参数如下

```json
{
	"time1": "2021-07-20T11:27:31Z",
	"time2": "2021/07/20 11:27:31",
	"time3": "1658214991175"
}
```

控制台打印如下日志

```text
2021-07-20 11:27:31
2021-07-20
2022-07-19T15:16:31.175
```

<Comment></Comment>
