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

### 小工具

在线RSA加解密工具：[RSA](/tools/RSA.html)

<Comment></Comment>
