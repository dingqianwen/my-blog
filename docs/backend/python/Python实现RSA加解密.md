---
lang: zh-CN  
title: 'Python实现RSA加解密'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Python实现RSA加解密, rsa, python, 非对称加密'}]

---

# Python实现RSA加解密

RSA非对称加密，避免了直接传递密钥所造成的被破解的风险。它是由一对密钥来进行加解密的过程，分别称为公钥和私钥，公钥加密，私钥解密。

### 快速上手

这里我们通过
[pycryptodome](https://github.com/Legrandin/pycryptodome)
实现，该模块实现了各种算法和协议的加密，提供了各种加密方式对应的算法的实现，包括单向加密、对称加密及公钥加密和随机数操作等。 首先导入所需依赖

```shell
pip3 install pycryptodome
```

代码实现如下

```python
import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as PKCS1_cipher
from Crypto.PublicKey.RSA import RsaKey


def format_key(key):
    if not isinstance(key, RsaKey):
        # ValueError: RSA key format is not supported
        if not key.startswith('-----') and not key.endswith('-----'):
            key = '-----BEGIN KEY-----\n%s\n-----END KEY-----' % key
        key = RSA.importKey(key)
    return key


# 加密
def encrypt_data(msg, public_key):
    public_key = format_key(public_key)
    cipher = PKCS1_cipher.new(public_key)
    encrypt_text = base64.b64encode(cipher.encrypt(bytes(msg.encode("utf8"))))
    return encrypt_text.decode('utf-8')


# 解密
def decrypt_data(encrypt_msg, private_key):
    private_key = format_key(private_key)
    cipher = PKCS1_cipher.new(private_key)
    back_text = cipher.decrypt(base64.b64decode(encrypt_msg), 0)
    return back_text.decode('utf-8')


if __name__ == '__main__':
    publicKey = """
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcNwH/RZa57EZ39oQheToV55IG
        o3gxSgy+o8e95vRAoY2mFT0d2GJCyHPuLHsDMc1TSqgxPeYB1b9dzfxv5gsJmtpg
        zNpvQYogdr7Q1JRsF49TMhEHrdMSkq1RkTfidBV7GN5mMHM/OnhEP6TK4PFvfVeI
        flUbq1/sqvUIctvpzQIDAQAB
    """
    privateKey = """
        MIICXAIBAAKBgQCcNwH/RZa57EZ39oQheToV55IGo3gxSgy+o8e95vRAoY2mFT0d
        2GJCyHPuLHsDMc1TSqgxPeYB1b9dzfxv5gsJmtpgzNpvQYogdr7Q1JRsF49TMhEH
        rdMSkq1RkTfidBV7GN5mMHM/OnhEP6TK4PFvfVeIflUbq1/sqvUIctvpzQIDAQAB
        AoGAWz4J7Zcw1YG7G0CipoaPNdIfSb9babatwQAan8HxMnrqKHLJUtBbfFRm2lui
        shf5rMeze6eC29mEP/8bjiRYlyb7HQZqcGfCMwy2CTTEOTFc3ms9is+gonrWEpkN
        mq3DubnzKsaYQgaKRoF6RkDzKFBMW913uBwflC/GS3kx2mUCQQDKFYyy5jpifljR
        a9Z1wtXiEod3r2MNJH7cnUG8SoQ5SJwa+Pv+W6gYwMcXOGBPu1VmqW7Fxut/dXSw
        +OxcDUi3AkEAxeSP0pzaOyOK7avpgVaDNjq6pZbpG+aLxQoiM76hF1v3IUgdRKg3
        HEjHnTnyGXbwErrVNMhw8zZuwHJrvlU1mwJAWDjuMs/l30fveIXOm5ySiV6ze2G7
        KWqsY53Xq98QOH3lgLUANjxHd375q7519XkAQJBphrhf6UYayoPxlAJMowJBAMTB
        I148JZ53EEKOknPOGFdqvPi2ur7K0lzuXmMkPfaDsYqdsLv6pBCzLATfAB7haoC0
        0hbQ07x9elBNc2KiRdECQH3Uh1ZdFOmjYV5zYkHcT71qvpJyyHhACPXoT0/6coUv
        bX7EzhgZafPr+1jA27xGyUvrj2u2UrsVrsJvfNfHZB4=
    """
    ciphertext = encrypt_data('https://dingqw.com', publicKey)
    print('密文：' + ciphertext)
    plaintext = decrypt_data(ciphertext, privateKey)
    print('明文：' + plaintext)

```

输出如下

```text
密文：CP7un8tp2XOXcYiHu9pCjQrZOjoiKrvQ11n1dbfR4ezE+Zndwxlf0U1hOfFeGktc79Pwzo+Yb/FYc/1o8X6xDMV1xjW4gLwnJI6Bmbn0tjB4Z29XINtTlgsSE84RoF/uECAhplBPwRfqqqXbyw2zmhN+rWaal7hienVHggUMhd0=
明文：https://dingqw.com
```

### 加密长文本内容

如果按照以上方式进行加密较长的字符串会报错：`ValueError: Plaintext is too long.`，则需要改进程序，针对被加密的字符串需要分片处理， 工具改进如下

```python
import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as PKCS1_cipher
from Crypto.PublicKey.RSA import RsaKey


def format_key(key):
    if not isinstance(key, RsaKey):
        # ValueError: RSA key format is not supported
        if not key.startswith('-----') and not key.endswith('-----'):
            key = '-----BEGIN KEY-----\n%s\n-----END KEY-----' % key
        key = RSA.importKey(key)
    return key


# 加密
def long_encrypt(public_key, msg):
    public_key = format_key(public_key)
    msg = msg.encode('utf-8')
    length = len(msg)
    default_length = 117
    # 公钥加密
    pubobj = PKCS1_cipher.new(public_key)
    # 长度不用分段
    if length < default_length:
        return base64.b64encode(pubobj.encrypt(msg)).decode('utf-8')
    # 需要分段
    offset = 0
    res = []
    while length - offset > 0:
        if length - offset > default_length:
            res.append(pubobj.encrypt(msg[offset:offset + default_length]))
        else:
            res.append(pubobj.encrypt(msg[offset:]))
        offset += default_length
    byte_data = b''.join(res)
    return base64.b64encode(byte_data).decode('utf-8')


# 解密
def long_decrypt(private_key, msg):
    private_key = format_key(private_key)
    msg = base64.b64decode(msg)
    length = len(msg)
    default_length = 128
    # 私钥解密
    priobj = PKCS1_cipher.new(private_key)
    # 长度不用分段
    if length < default_length:
        return b''.join(priobj.decrypt(msg, b'xyz'))
    # 需要分段
    offset = 0
    res = []
    while length - offset > 0:
        if length - offset > default_length:
            res.append(priobj.decrypt(msg[offset:offset + default_length], b'xyz'))
        else:
            res.append(priobj.decrypt(msg[offset:], b'xyz'))
        offset += default_length
    return b''.join(res).decode('utf8')


if __name__ == '__main__':
    publicKey = """
           MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcNwH/RZa57EZ39oQheToV55IG
           o3gxSgy+o8e95vRAoY2mFT0d2GJCyHPuLHsDMc1TSqgxPeYB1b9dzfxv5gsJmtpg
           zNpvQYogdr7Q1JRsF49TMhEHrdMSkq1RkTfidBV7GN5mMHM/OnhEP6TK4PFvfVeI
           flUbq1/sqvUIctvpzQIDAQAB
       """
    privateKey = """
           MIICXAIBAAKBgQCcNwH/RZa57EZ39oQheToV55IGo3gxSgy+o8e95vRAoY2mFT0d
           2GJCyHPuLHsDMc1TSqgxPeYB1b9dzfxv5gsJmtpgzNpvQYogdr7Q1JRsF49TMhEH
           rdMSkq1RkTfidBV7GN5mMHM/OnhEP6TK4PFvfVeIflUbq1/sqvUIctvpzQIDAQAB
           AoGAWz4J7Zcw1YG7G0CipoaPNdIfSb9babatwQAan8HxMnrqKHLJUtBbfFRm2lui
           shf5rMeze6eC29mEP/8bjiRYlyb7HQZqcGfCMwy2CTTEOTFc3ms9is+gonrWEpkN
           mq3DubnzKsaYQgaKRoF6RkDzKFBMW913uBwflC/GS3kx2mUCQQDKFYyy5jpifljR
           a9Z1wtXiEod3r2MNJH7cnUG8SoQ5SJwa+Pv+W6gYwMcXOGBPu1VmqW7Fxut/dXSw
           +OxcDUi3AkEAxeSP0pzaOyOK7avpgVaDNjq6pZbpG+aLxQoiM76hF1v3IUgdRKg3
           HEjHnTnyGXbwErrVNMhw8zZuwHJrvlU1mwJAWDjuMs/l30fveIXOm5ySiV6ze2G7
           KWqsY53Xq98QOH3lgLUANjxHd375q7519XkAQJBphrhf6UYayoPxlAJMowJBAMTB
           I148JZ53EEKOknPOGFdqvPi2ur7K0lzuXmMkPfaDsYqdsLv6pBCzLATfAB7haoC0
           0hbQ07x9elBNc2KiRdECQH3Uh1ZdFOmjYV5zYkHcT71qvpJyyHhACPXoT0/6coUv
           bX7EzhgZafPr+1jA27xGyUvrj2u2UrsVrsJvfNfHZB4=
    """
    plaintext = "我一个人吃饭 旅行  到处走走停停  也一个人看书 写信  自己对话谈心  只是心又飘到了哪里  就连自己看也看不清"
    ciphertext = long_encrypt(publicKey, plaintext)
    print('密文：' + ciphertext)
    plaintext = long_decrypt(privateKey, ciphertext)
    print('明文：' + plaintext)
```

输出如下

```text
密文：ZhNVbdbqRn2gR1bN/g3pwAzb9xAbZxJJsP0ww48w+T5+SXclUYRkH43zGxBDXUEn89LL5c4mlB2bNUtoBnIKPJj3/D9UtvnzSh7bly3KauJG7qmfOripjbg2z71vG2DpGmGtND8M98TUoXOnQp8QOtwaUlAszhwEM4UK9MiZIfwqJGuhFJg6IvGHcQhkiyspzMsbpy6ARpw3NxuoyecPSGGAhLqCKuDRMnYGqUC1L+jahrEnFICehToOSnAWuZL/rMp8C7mKUCrKOvbNYXIzxSq1+j0QCI6UETeTrtxTZgGu+GCrVlwGJ/RWQmT3o+e+yz1yKZsOkDsEHT8xonI7HnI4vQSyDaabPSuQsdZ48OMsRCojiRZTWX3rpXXGRZzAQy4Xo4MR3YJ6J2L/ej1WqKlVaCPORe5mfZtvGFML9XGBtSTVMt9xwrfU2cmg5tWsAjzoeY5FeiXMQPl0xHIytUKw9ouxJae/hWq25rIA1yCKDITg4NVE3Wr7GWUpD+DM
明文：我一个人吃饭 旅行  到处走走停停  也一个人看书 写信  自己对话谈心  只是心又飘到了哪里只是心又飘到了哪里只是心又飘到了哪里只是心又飘到了哪里只是心又飘到了哪里只是心又飘到了哪里只是心又飘到了哪里只是心又飘到了哪里  就连自己看也看不清
```

### 加签验签  


给数据加上签名，来检查数据在传输过程中是否被恶意篡改。


```python
import base64
from Crypto.Signature import PKCS1_v1_5 as Sign_PKC
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.PublicKey.RSA import RsaKey


def format_key(key):
    if not isinstance(key, RsaKey):
        # ValueError: RSA key format is not supported
        if not key.startswith('-----') and not key.endswith('-----'):
            key = '-----BEGIN KEY-----\n%s\n-----END KEY-----' % key
        key = RSA.importKey(key)
    return key


# 加签
def signature(private_key, encrypt_data):
    private_key = format_key(private_key)
    sha_data = SHA256.new(encrypt_data.encode("utf-8"))
    sign = Sign_PKC.new(private_key).sign(sha_data)
    sign_base64 = base64.b64encode(sign)
    return sign_base64.decode()


# 验签
def verify(public_key, encrypt_data, sign):
    public_key = format_key(public_key)
    sign_data = base64.b64decode(sign.encode("utf-8"))
    cipher_rsa = Sign_PKC.new(public_key)
    return cipher_rsa.verify(SHA256.new(encrypt_data.encode("utf-8")), sign_data)

```

### 小工具

在线RSA加解密工具：[RSA](/tools/RSA.html)

<Comment></Comment>
