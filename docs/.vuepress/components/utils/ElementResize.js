/**
 * 元素宽高监听
 * @param eleSelector
 */
export function ElementResize(eleSelector) {
    if (!(this instanceof ElementResize)) return;
    if (!eleSelector) return;
    this.eleSelector = eleSelector;
    this.el = document.querySelector(eleSelector);
    this.queue = [];
    this.__init(); //globel init
}


//初始化
ElementResize.prototype.__init = function () {
    let iframe = this.crateIElement();
    this.el.style.position = 'relative';
    this.el.appendChild(iframe)
    this.bindEvent(iframe.contentWindow);
}

/**
 * 设置元素样式
 * @param el
 * @param {Object} styleJson
 */
ElementResize.prototype.setStyle = function (el, styleJson) {
    if (!el) return;
    styleJson = styleJson || {
        opacity: 0,
        'z-index': '-1111',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    };
    let styleText = '';
    for (var key in styleJson) {
        styleText += (key + ':' + styleJson[key] + ';');
    }
    el.style.cssText = styleText;
}

/**
 * 创建元素
 * @param {Object} style
 */
ElementResize.prototype.crateIElement = function (style) {
    let iframe = document.createElement('iframe');
    this.setStyle(iframe);
    return iframe;
}

/**
 * 绑定事件
 * @param {Object} el
 */
ElementResize.prototype.bindEvent = function (el) {
    if (!el) return;
    var _self = this;
    el.addEventListener('resize', function () {
        _self.runQueue();
    }, false)
}

/**
 * 运行队列
 */
ElementResize.prototype.runQueue = function () {
    let queue = this.queue;
    for (var i = 0; i < queue.length; i++) {
        (typeof queue[i]) === 'function' && queue[i].apply(this);
    }
}

/**
 * 外部监听
 * @param {Object} cb 回调函数
 */
ElementResize.prototype.listen = function (cb) {
    if (typeof cb !== 'function') throw new TypeError('cb is not a function!');
    this.queue.push(cb);
}

