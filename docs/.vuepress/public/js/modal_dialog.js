var info_modal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADlUlEQVRYR82XS4hbdRjFz7l3ZsARamzryCQ31lft5A64qErFhYKK9bFwxmJRu/CxKbjzAXYmdyS0yYwu1J3oqt2otNQ+wEKxogiC+GgX0t44vlDnTqJW7LRoK53ce+SmTUw6j/wTRmq295zz/e6Xf/75PuIif9hOfTenHvWU76fC2wBeQahfYkjguMCyLH7Wu6L/wOHNnDXNNQJYs+2Xa7pYeV7UJoKXLR6uExDfka3X/JH0d61AFgUYmChfbYXhVgCbSFitwhqfCwghvC1YY0Uv+dNC3gUB3G3BnaTeBZlop/AcrTQjcYM/5nw4X868AO54sBkRXm/3rRcClRDBwtP+qPPmhZo5AG4huAvC+0tVvFYwhpC4vjiW+qARognAfal0FcLwq9YHrbMvRdBJ2PaN/pbkz7WEZoBCsJPARtN4AZ9SuA5En7FH2Ol7ziNzADKF6bUWdNg4CJjws84odsl2v51+mcBzpt6KrFsmveSXsb7eATc/tYfkcCcha/Klm7sYfWHqlbTX99IP1QGcV6cuWXYaMyR7jEOAV/zVqRewkaFbCMYJjJh7dQazTsLP8Wy1A5nx0pClaK9pQMPJ/h3E9wTWte/lkO+l9lcB3HxQIDFqGiLhDVC/1vXCOpL3mvpjnYCCn3W8KsBgPtgB4nGjAGnmmJe+vFHrbi0P0g6PGvnPiwTs8LPOk7UOHCJxt1GAcJrsvvZo9sp6B24YLw10Kyoa+f8FOORnnXvOdaAwdRDgetOA+EL527501Q9blp+MPR0BSAd9L33fuQ4Ugu0EnjAFiHWViAOTY6nJzgGw3fecpzo6hEsC0HgIM/nSsMVoj3EHhPdU6XnUz/X9We1ArrSyqzv8mKBrmhHRGi6OJvdVO5DMlXoTXeEJo4tonl9BtahEtxDEl9myVhCSzp7qRSJ4Nn2m8SreR/LBVmYAfx2bTSWQY6VJu0v24DfTp0D0tsqQtN/30kOxrg7Qzn0uyAdwvKmQsJLkYKvi8fMIvKmYTR1pAjh/Ie0GscEkpFONgN1+1nm45m+aBzL50ioiPEJyeacFFvNJ+kOw1zYOqXNGsky+dDsRffRfjGSAdYfvJT9phPz/DaU1uos6ltcg6osJ8RgBu51zUVtMItt+8euR/h8X8hqtZu7E1PUM+YzJahb/UVF8a0lWswupq8tpV/kBC+GtIvuqyykQUfytupyCn7PSfyAetUy7ZdQB07BOdP8AHHSWMKZhltwAAAAASUVORK5CYII=';
var success_modal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADd0lEQVRYR82X328UVRzFz5ntRgj4K+rOLtEAUV80MUENINhfs/iAxl+J8UFejCaW3emDiS/6D/gs4k4J8cXgiwkmICH60J2xpSj6IjEaY4yx+GumLdCAUdN2d46Zku3+mmV3yxact5m595zPnPu9c+8lbvDFG+yPzgG8l9dltHEQ0JOCtgM0KWwStQRwhtKfAr4SjE9nbl08hUcPL3XycR0BpLz8vkTIAyDu6EQUwO9CuD+wxk62a39VgDsnX8skl5IfgHiinVDce0Ef/ZtU7lL/2Hyr/i0B0m7uKYJHAN6+GvNKH0F+mXhxbtiZitOJBTCL+acN8pNrMa7tKyEMyYFZ673TjZpNAJmivVnUdwQ39gog0pEw87fw4F97ChdqdZsA0q59hsCOXpqvDId0Isg6z7QEWK528cO1MK/WRDgUWGMTlftqAgIzXv4cwHt6ASDhsoA3SLxJ4N6qps76lrOtCSDlju5OQLGV2i1QZF42NDg37JzNePkRiIdqNcoy7pvNHvw5eraSQMa13wbwVrdmje1rzc2J0a1GOZxoTDWkXp8Zdg7UAxTzp0HuuhaAWvO7JkbuT5QSUyRTTZrSMT/rPF8HkC7a0yQ2rx5A8yXCimJPj488QPZNtvp1S/g6yBaWZ9qVIRCY9uxFAn2rA9C8wP7AKnyfGs89lDCMqMpva6kl/eFnnbsbAPILBJNxnSQdFXmK0DsEG/4dVfOMm3tEMlwSt1z1Q5oAAKTd/C8Et8R1LFHbomij/4QhHKlCVM1NL7eToTFOYkO7FKNlO7AKOxuLcBJkf2wCkL+YwI6Lg85vpmu/Quh9AhcEDkWxm66dNYATANa3M78y4vg4sAovdDUNBU2X+kq7zg8c9k0v/2pZmjpvjf2YLub2gjzeavjigGKnYepz+7FEiC/ajN1PSiZ2BwMH56J2pms/S+Bot8UrlrcGw4em6xKIZkLGs38FsFydrS5JP/yzfuHxDQs3bVfIkySMTmJfaSN942edhyv3dRXd6WIk4RyoTd3EXgXAoJ8tTMYCRA/XcjkGdNy3nOdqE2veD3j7t0DGtwRv7iraNo073pBUissAjvUKQEApNDAwO1T4slHzumxKEWJfsMfx4j7o/7str6U13dGXDOnd634wqYuscjRTuFeMNq0xRzPyjMTPen4061Uxdl0Da2lc0f4PeKyXMJXpyrIAAAAASUVORK5CYII=';
var warning_modal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC8ElEQVRYR8WXTUhUURTHf0fToEWQfbmoKKjIRSotCiwoiDCqTWCCRkGl84aEllmLQgqkWpbVvBlxIRUxfay0j00fEGSr1CIi0igMhCRpE0k5J+4bJsdxPu4bhzzb9///z/+de++55wo+Qq+xiGLqUdYDS4DlCDGUb8AYwgcmicpxxm1lJRdQoxTznQaEQ8BOoDgrR/mD8AQlIkHu5tLPaEDbKKKcJoQzwIpcQhm+v0IISoD+TPy0BtRlAcp9hNo8EyfTFDglDpfSac0woFcpZx6PgcoCJJ+SULop46jUM5msO82AupQAfcAmy+RfgBGgxhJ/TxzqshnoAFqsxIRjEqDLYDXEaYR2Kx6cF4ezCey/CqjLXqDHSkQZlyBlCaxeZiHz+WHFNSBhtwS8ZcYz4JVeGUJYaSkyJA5rp+00F7PZ7EIZkCDVyQZOAhft2B5qdgbimRskwO14BUJ8Qlj9Xw0oLyVIjWiECmK885G8MBXAW7Jloi5+y18oA8ZCkzFgjtKROaiASemKhnhojsWcGFB6jIF+hKo5MvDaLMFAHn1/9scw/seDpgK9CHt8VmBEnKmmpVFKGWfCp4bZhI9MBVwg4JtcRJU0M+j1kTD7vevbf3QZA01AxDdX+YrQiVKJePdIqW8NaBXtYDEl3kyXczzLI0F2Sow1iVb8AmGrrwTKBEIUGEZpRFjniw/vxaEibuA6Bynihg+BX8BmcXjj8ePX8UdgqQ+NVjOmJc8DZkNttBS4Iw71yVh1uQk0WvGVYYQN4vB7ykCYWnMsrATguTjsSDHwDNhuyd8nDr0GmzoTngNvDM8diiNBwt4SuDhAKDfJgLkiQU4ksDOnYj+lBDOUmlhlmbyPMrYlT8bpDJjxrBPhsJWoLUh5yyS7pIXRZErml1F8TrhQkP6gPEA4IA4/U/1mbT4aphr11naL7Y+m4D6jtOMQEUk/tFp1Pw1Rh9Bs/TiFp0A3o9ySNmLZzFsZSAikeZ6bJ7qJsXyf538B0n8BZanHYR0AAAAASUVORK5CYII=';
var error_modal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADd0lEQVRYR9WXS4gcVRSG/79qEnGjk3vLhc+4FBVd6CJIpqsmEXyShUpcZCGO+AqIqOALUdSFgqAJGEUxKIgujAoSHyQg0z2jC4UEYkCEREQiI2jd7owmIdpT9Uu16Xl0V1f1tNMEa9X0veec75zz31O3iNP88DTHx/8PoDE+emWS+jeSWivxPJIegF8F/YwEe4Np9+1yqtpXBQR4jSi4W9DjAC8uCiBphuTLBvF2VjFXBlMKkGWcyn8P4GVlzhavSzjkecmdZrLxdZFdIYCLzO2S9zaJM5cTfH6v1CTwoKm513vZ9wSIK/YWevxooMAdRoSeMFX3Yp6vXIA4spdA3D9w5nmRlG62tfquzqVcABcGB0BcsRLZL/iQM6vdWu7F8cV+uwBcxUzA83Z2BRd2kfgyBbYTOCM3SeF3j3pY4L0A1nf7SJ+xtfpzxQA9smeKLWYqfv9oxW5IiC9Arl4SQGqIuCaouh9cGDwL4ulOgOyIBjV3fk+A42PBuSd9zOSWXjriay4cnZr9yUXmeoC7AY609koNKg3NVOOgi8w6iHtAnpXnx0+aV41Oz+5vry1pgYvMXYD3Vq/eS/htlf5ef/bUH4calWBT6uljAMeYpmNZ8Hq4ZiyFv6dIvJKeDGruhR4A9nmATxWLTw6JKna6/r2rmM2+ksNZRvG43Qjxs176WJgNeNPW4kwjrWdpBUK7E+REufp1lEkamunGd9neerjmBsH7BOSqUlvhc1uLb/pPAAKOjSTNsN3LhXbQLwOQtDuouU0Dt0DCCXjaEEy6b9y4uVXgL63fkbkN4gcgS94v6Ru2Wr9vUBGe8JhcZ6qNr9onQeDJdjXqUbBF0rtFECUiNBcA3pHcIQP85SG5dj64mPX81CzQ7PxJKIHwiatHJ+N9uRXI/nSRPQjw8k4ISluzt1o/gygO7Q6SW3MSiW01PqdwEtZDe7/I17qN9SHBbBRvKxrFPvRIQtxBcGN3EnjU1OKXCgEUYaQu+yPIi8oUvZx1AYftn/Gl3IdmIcC/bWiN2k+B8mPVF4TU9NO5dYtHcE8NtBfiyGZlfKevACWbBD0QVN2reduGfiUT8VBQdTt6MQ73UspkIju2RQUqBciMT13L7xH0WJ/X8lcM4m0rci3vpG99mMi/mdCFrQ+TTKjEzFA/TFZCiANrYJjBM999aWCYEP8A7TSkMOyQWnEAAAAASUVORK5CYII=';
var close_modal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACFElEQVRYR+2WTWsTQRjH/08mLxepKIoHQcRLBRX0IPhCay2ih/opQpYJCeSQjxLIy7Ahn8KTivZVhB4aqEJ70V5FUSwlkmSHRyZYWJZtd3YDWQ/d487M8//Nf5555iGk/FHK+jgD+H8dcF33wWg0+lStVo+myZNms3kun8/fdhznY1icUAeUUs8BvALQ9zxvOSmEEc9ms+8A3AXwUkr5OghxEsB5Zn5PRPcAbA+Hw2e1Wu0wjhONRmOuUCi8BXCfmXeI6KmU8rcVgJmklPJD9LXWy5VK5ZcNRKvVuiCEmOz8NHET69QkNBAANgDcAfBZa70QBaGUugRgFcCtKPFIADOh2+1e1FqbgBMIAEtSyh9hThhxZt4konkAuwAWwmz3r7W6hn4IZt4XQjxxHOebP5Drule01mvH4kKIpVKp9DPqyKwAgk4w8xchxKNjiHa7fZWI1onohtm5rbjVEfh38M+JLQA3DQQzL5rxTCbzAcC1uOKxAcyCXq93eTwerxsIAF8BiKTiiQBCIMyvWLbHTsJgIgVcMMN7uVxusVgsfo9KOutCdFIgvzgzH0xsJLpuIIQQj20yP7EDqSZhoBbM9hqmWohSLcVB8Zk+RgHx2T7HgWd4moZkLaoniGrJtj3Pe5G0JfN1RaYxWSmXy2+sC1Gn03k4GAz69Xr9T9zq5p+fqCmdRjDuWut+IG5g2/lnAKk78Bd192wwo+7w4AAAAABJRU5ErkJggg==';
var question_modal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADlUlEQVRYR72XXWhUVxDHf7MJpYlCjdWkUloLVWmgvhSCUigUffADioqyIuapJd5NUwQxxra2Nf1AaQWp4EfWbygWTH0RQhUUNWqhhbRNihhEUjWCDZiEpCGka7I75dw9m+xudu+9m9Se1/Of//zPnDlzZoSAS/dTQimrgI3AQoTnUSqABEIf0AvcRjjHP/woW4kFoRY/kJ5kLqPsQdmMUOKHt/vDKN8xxifygSsu78orQBsp5gW2I3wKzAjoOBs2BHzOXxyQRsZyceQUoIcpo4gW4M0pOs40U34lzjqp42E23yQBGuVVlMsIr/wnzidIBhHWyBZa03kzBGiUOSjtCC/6Olc6EAZcnLq5sThAjvRTzGJ5j0cp/nEBbpbP4CbwRl7nygjCV4RokRr+SMdpM88wQDXKfuA5jwP8BiwVh1GDmRAQ5WugwcN5H0UsSzl2k3QelShxhLspQj3OAuL8Asz24PpYIuwdF6BHKCfEA+BZD+XLxOGqG/EjhAkRBWZZ/CBQLw7H3f0mViJc8BDwN8LL4jDoRkCjNAGOh0GbRKiy2NeAW0DRJLyyViKct7iffF7RPnFoEPfu+hnwSaDPxOFLe7ofEDbkEdsqDm9bAd8AOzwi2k8Z5aJHWYFy0SfrT6J8j9AB7lWV5sQrPRJhnhWwG2j05BVWi0Y5CNT5PrsgAOWKRFhuI2UEb/I0U06INnEVSYZtmmuIEEukhk49xEyK6fEt4co1E4FOwCTWdNZjEqyQWn63pz+LEPYlVO4aAaaaeRUOP55uwDzRLut8H0K9n5G7r4yYKxhCmBnIYDKonzhV8j5/2sQzVXBbYC4lZiJwB1gU2CgdmKBaajlT8MknOLqmk4TDlDFbwjzRo7yLcmIKh2g1ETgM1BZsnPnkriO8VTAHnDIR8K7b+ViVMxKh2oa/G+GlggUIG4KW4lzc7ZCs+ygNAXqBbI4nDDMr9RmZn21LwSeYjoHSLBE2JgUco4IE932+42x39wBTA0wEKhHKA+tRYsRZaHrE9IbENAgfBiaBXeKwx+aAf91PJ1a+kAjms0rriIK0ZJnqpiogd0tmK9kcoA2Y7xsJ5QrCDXsF6xFe97WB/E1pytjt6ca49FTa8hDvSI0VbR3+X4PJz8QJBxpMxiOR7Hp3Ah/5/uv5Y58czcr4VsLEc8Ge3nAKpxll95SH02y14+O5aTSURe54DiZpzepF3Sk4OZ7HuBB0PP8X+s83WFbJv84AAAAASUVORK5CYII=';

function $modal(data) {
    if (data === undefined) {
        data = {}
    }
    if (data.type === undefined) {
        data.type = 'alert'
    }
    let tipIconImg = '';
    if (data.icon === 'success') {
        tipIconImg = success_modal
    } else if (data.icon === 'warning') {
        tipIconImg = warning_modal
    } else if (data.icon === 'error') {
        tipIconImg = error_modal
    } else if (data.icon === 'question') {
        tipIconImg = question_modal
    } else {
        tipIconImg = info_modal
    }
    if (data.timeout === undefined && data.type != 'confirm') {
        data.timeout = 2000;
    } else {
        data.timeout < 500 ? data.timeout = 500 : data.timeout = data.timeout;
    }
    if (data.transition === undefined) {
        data.transition = 200
    }
    if (data.mask === undefined) {
        data.mask
    }
    if (data.width === undefined) {
        data.width = 300
    }
    if (data.pageScroll === undefined) {
        data.pageScroll = true
    }
    if (data.title === undefined) {
        data.title = '提示'
    }
    if (data.maskClose === undefined) {
        data.maskClose = false
    }
    if (data.cancelText === undefined) {
        data.cancelText = '取消'
    }
    if (data.confirmText === undefined) {
        data.confirmText = "确认"
    }
    if (data.top === undefined) {
        data.top = 100
    }
    if (data.center === undefined) {
        data.center = false
    }

    function calculate(e, sun) {
        if (data.center) {
            var tipHeight = e.height() + sun;
            console.log(tipHeight)
            var windowHeight = $(window).height();
            console.log((windowHeight / 2) - (tipHeight / 2))
            data.top = (windowHeight / 2) - (tipHeight / 2)
        }
    }

    var idText = "modailItem";
    var date = (new Date().getTime() * Math.random() + '').substr(0, 10)
    idText += date;
    var titleSize = 16;
    var fontSize = 14;
    if ($('#modail-dialog-box').index() < 0) {
        var modelBox = '<div id="modail-dialog-box"></div>'
        $('body').append(modelBox)
        $('#modail-dialog-box').css({fontFamily: '微软雅黑', fontSize: fontSize + 'px', color: '#666666',})
    }
    if (data.type === 'message') {
        $('#modail_message_box').html('');
        $('#modail-dialog-box').append('<div id="modail_message_box"></div>')
        var width_s = 40 + (fontSize * data.content.length) + fontSize + 4;
        $('#modail_message_box').append('<div id="' + idText + '_box"></div>');
        $('#' + idText + '_box').append('<div class="' + idText + '_item item1"><img src="' + tipIconImg + '" /></div>');
        $('#' + idText + '_box').append('<div class="' + idText + '_item item2">' + data.content + '</div>');
        if (data.closable) {
            width_s += fontSize + 4;
            $('#' + idText + '_box').append('<div class="' + idText + '_item item3"><img src="' + close_modal + '" /></div>');
        }
        $('#' + idText + '_box').css({
            width: width_s + 'px',
            padding: '10px 15px',
            background: '#fff',
            boxShadow: '0 1px 6px rgba(0,0,0,.2)',
            borderRadius: '5px',
            position: 'fixed',
            left: '0',
            margin: 'auto',
            right: '0',
            opacity: '0',
        })
        $('.' + idText + '_item.item2').css({margin: '0 8px'})
        $('.' + idText + '_item.item3').css({position: 'absolute', right: '15px', cursor: 'pointer'})
        $('.' + idText + '_item').css({display: 'inline-block'})
        $('.' + idText + '_item img').css({
            width: fontSize + 4 + 'px',
            verticalAlign: 'top',
            position: 'relative',
            top: '1px'
        })
        calculate($('#' + idText + '_box'), 20)
        $('#' + idText + '_box').css({top: data.top - 60,})
        $('#' + idText + '_box').animate({'top': data.top, 'opacity': '1',}, data.transition)

        function close() {
            $('#' + idText + '_box').animate({'top': data.top - 60, 'opacity': '0',}, data.transition)
            setTimeout(function () {
                $('#' + idText + '_box').remove();
            }, data.transition)
        }

        var timers;
        if (!data.manual) {
            timers = setTimeout(close, data.timeout);
        }
        $('.' + idText + '_item.item3').click(function () {
            clearInterval(timers)
            close();
        })
    } else if (data.type === 'alert') {
        if (data.pageScroll) {
            $('body').css('overflow', 'hidden')
        }
        $('#modail-dialog-box').append('<div id="' + idText + '_box"></div>')
        if (data.mask) {
            $('#' + idText + '_box').append('<div class="' + idText + '_mask"></div>')
            $('.' + idText + '_mask').css({
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.4)',
            });
        }
        $('#' + idText + '_box').append('<div class="' + idText + 'centerBox"></div>');
        $('.' + idText + 'centerBox').css({
            width: data.width + 'px',
            padding: '20px',
            background: '#ffffff',
            position: 'fixed',
            right: 0,
            left: 0,
            margin: 'auto',
            borderRadius: '5px',
            boxShadow: '0 1px 6px rgba(0,0,0,.2)',
            opacity: '0'
        })
        $('.' + idText + 'centerBox').append('<div class="' + idText + 'title"></div>')
        $('.' + idText + 'title').append('<div class="' + idText + '_item item1"><img src="' + tipIconImg + '" /></div>');
        $('.' + idText + 'title').append('<div class="' + idText + '_item item2">' + data.title + '</div>');
        if (data.closable) {
            $('.' + idText + 'title').append('<div class="' + idText + '_item item3"><img src="' + close_modal + '" /></div>');
        }
        $('.' + idText + '_item.item2').css({margin: '0 8px', fontSize: titleSize + 'px', color: '#333333'})
        $('.' + idText + '_item.item3').css({position: 'absolute', right: '15px', cursor: 'pointer'})
        $('.' + idText + '_item').css({display: 'inline-block'})
        $('.' + idText + '_item img').css({
            width: titleSize + 4 + 'px',
            verticalAlign: 'top',
            position: 'relative',
            top: '-1px'
        })
        $('.' + idText + 'title').css({marginBottom: '10px'})
        $('.' + idText + 'centerBox').append('<div class="' + idText + 'body">' + data.content + '</div>')
        $('.' + idText + 'body').css({padding: '0 ' + (titleSize + 10) + 'px'})
        calculate($('.' + idText + 'centerBox'), 40);
        $('.' + idText + 'centerBox').css({top: data.top + 40,})
        $('.' + idText + 'centerBox').animate({'top': data.top, 'opacity': '1',}, data.transition);

        function close() {
            $('.' + idText + 'centerBox').animate({'top': data.top + 40, 'opacity': '0',}, data.transition)
            setTimeout(function () {
                $('#' + idText + '_box').remove();
                if (data.pageScroll) {
                    $('body').css('overflow', 'auto')
                }
            }, data.transition)
        }

        var timers;
        if (!data.manual) {
            timers = setTimeout(close, data.timeout);
        }
        $('.' + idText + '_item.item3').click(function () {
            clearInterval(timers)
            close();
        })
        if (data.maskClose) {
            $('.' + idText + '_mask').click(function () {
                clearInterval(timers)
                close();
            })
        }
    } else if (data.type === 'confirm') {
        if (data.pageScroll) {
            $('body').css('overflow', 'hidden')
        }
        $('#modail-dialog-box').append('<div id="' + idText + '_box"></div>')
        if (data.mask) {
            $('#' + idText + '_box').append('<div class="' + idText + '_mask"></div>')
            $('.' + idText + '_mask').css({
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.4)',
            });
        }
        $('#' + idText + '_box').append('<div class="' + idText + 'centerBox"></div>');
        $('.' + idText + 'centerBox').css({
            width: data.width + 'px',
            padding: '20px',
            background: '#ffffff',
            position: 'fixed',
            right: 0,
            left: 0,
            margin: 'auto',
            borderRadius: '5px',
            boxShadow: '0 1px 6px rgba(0,0,0,.2)',
            opacity: '0'
        })
        $('.' + idText + 'centerBox').append('<div class="' + idText + 'title"></div>')
        $('.' + idText + 'title').append('<div class="' + idText + '_item item1"><img src="' + tipIconImg + '" /></div>');
        $('.' + idText + 'title').append('<div class="' + idText + '_item item2">' + data.title + '</div>');
        if (data.closable) {
            $('.' + idText + 'title').append('<div class="' + idText + '_item item3"><img src="' + close_modal + '" /></div>');
        }
        $('.' + idText + '_item.item2').css({margin: '0 8px', fontSize: titleSize + 'px', color: '#333333'})
        $('.' + idText + '_item.item3').css({position: 'absolute', right: '15px', cursor: 'pointer'})
        $('.' + idText + '_item').css({display: 'inline-block'})
        $('.' + idText + '_item img').css({
            width: titleSize + 4 + 'px',
            verticalAlign: 'top',
            position: 'relative',
            top: '-1px'
        })
        $('.' + idText + 'title').css({marginBottom: '10px'})
        $('.' + idText + 'centerBox').append('<div class="' + idText + 'body">' + data.content + '</div>')
        $('.' + idText + 'body').css({padding: '0 ' + (titleSize + 10) + 'px'})
        $('.' + idText + 'centerBox').append('<div class="' + idText + 'footer"><button  class="button_s_model ' + idText + '_confirm">' + data.confirmText + '</button><button class="button_s_model ' + idText + '_cancel">' + data.cancelText + '</button><div class="clearBoth"></div></div>')
        $('.' + idText + 'footer').css({paddingTop: '20px'})
        $('.button_s_model').css({
            float: 'right',
            marginLeft: '20px',
            outline: 'none',
            border: 'none',
            padding: '8px 30px',
            cursor: 'pointer',
            borderRadius: '5px',
        })
        calculate($('.' + idText + 'centerBox'), 40)
        $('.' + idText + 'centerBox').css({top: data.top + 40,})
        $('.' + idText + 'centerBox').animate({'top': data.top, 'opacity': '1',}, data.transition);
        $('.button_s_model').hover(function () {
            $(this).css({'opacity': '.8'})
        }, function () {
            $(this).css({'opacity': '1'})
        })
        $('.button_s_model').mousedown(function () {
            $(this).css({'opacity': '1'})
        }).mouseup(function () {
            $(this).css({'opacity': '.8'})
        })
        $('.button_s_model.' + idText + '_cancel').css({
            background: '#fff',
            borderBox: 'box-sizing',
            border: '1px solid #eee',
        }).click(function () {
            data.cancel(close)
        })
        $('.button_s_model.' + idText + '_confirm').css({background: '#2d8cf0', color: '#fff',}).click(function () {
            data.confirm(close)
        })
        $('.clearBoth').css({clear: 'both'})

        function close() {
            $('.' + idText + 'centerBox').animate({'top': data.top + 40, 'opacity': '0',}, data.transition)
            setTimeout(function () {
                $('#' + idText + '_box').remove();
                if (data.pageScroll) {
                    $('body').css('overflow', 'auto')
                }
            }, data.transition)
        }

        $('.' + idText + '_item.item3').click(function () {
            close();
        })
        if (data.maskClose) {
            $('.' + idText + '_mask').click(function () {
                close();
            })
        }
    }
}

function $error(e) {
    $modal({
        type: 'message',
        icon: 'error',
        timeout: 2000,
        content: e,
        center: false,
        top: 100,
        transition: 300,
        closable: true,
    })
}

function $warning(e) {
    $modal({
        type: 'message',
        icon: 'warning',
        timeout: 2000,
        content: e,
        center: false,
        top: 100,
        transition: 300,
        closable: true,
    })
}

function $success(e) {
    $modal({
        type: 'message',
        icon: 'success',
        timeout: 2000,
        content: e,
        center: false,
        top: 100,
        transition: 300,
        closable: true,
    })
}
