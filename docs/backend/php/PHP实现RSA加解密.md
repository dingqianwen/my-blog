---
lang: zh-CN  
title: 'PHP实现RSA加解密'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'PHP实现RSA加解密'}]

---

# PHP实现RSA加解密

RSA非对称加密，避免了直接传递密钥所造成的被破解的风险。它是由一对密钥来进行加解密的过程，分别称为公钥和私钥，公钥加密，私钥解密。

### 快速上手


PHP代码实现如下

```php
/**
 * 验证签名
 *
 * @param $encrypt
 * @param $sign
 * @param $publicKey
 * @return bool
 */
function verify($encrypt, $sign, $publicKey): bool
{
    return (bool)openssl_verify($encrypt, base64_decode($sign), $publicKey, 'sha256');
}

/**
 * 加签
 *
 * @param $encrypt
 * @param $privateKey
 * @return string
 */
function signature($encrypt, $privateKey): string
{
    openssl_sign($encrypt, $resSign, $privateKey, 'sha256');
    return base64_encode($resSign);
}

/**
 * 加密
 *
 * @param $data
 * @param $publicKey
 * @return string
 */
function encrypt($data, $publicKey): string
{
    $crypted = [];
    $publicKey = openssl_pkey_get_public($publicKey);
    $dataArray = str_split($data, 117);
    foreach ($dataArray as $subData) {
        $subCrypted = null;
        openssl_public_encrypt($subData, $subCrypted, $publicKey);
        $crypted[] = $subCrypted;
    }
    return base64_encode(implode('', $crypted));
}

/**
 * 解密
 *
 * @param $data
 * @param $privateKey
 * @return string
 */
function decrypt($data, $privateKey): string
{
    $decrypted = [];
    $data = base64_decode($data);

    $privateKey = openssl_pkey_get_private($privateKey);
    $dataArray = str_split($data, 128);
    foreach ($dataArray as $subData) {
        $subDecrypted = null;
        openssl_private_decrypt($subData, $subDecrypted, $privateKey);
        $decrypted[] = $subDecrypted;
    }
    return implode('', $decrypted);
}
```


### 小工具

在线RSA加解密工具：[RSA](/tools/RSA.html)

<Comment></Comment>
