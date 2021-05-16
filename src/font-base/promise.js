const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const PENDING = 'pending';

class Promise {
    status = PENDING;
    value = null;
    reson = null;
    onFulfilleds = [];
    onRejecteds = [];
    constructor(executor) {
        try {
            // 创建promise，同步执行executor
            executor(this.resolve, this.reject);
        } catch (error) {
            //当执行报错时，以error=》reject当前promise
            this.reject(error)
        }
    }

    resolve = (value) => {
        // 状态只能从pending=>fulfulled
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            this.onFulfilleds.forEach(func => func());
        }
    }

    reject = (reson) => {
        // 状态只能从pengding=>rejected
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reson = reson;
            this.onRejecteds.forEach(func => func());
        }
    }

    then = (onFulfilled, onRejected) => {
        // 当onFulfilled，onRejected非函数时，新生成的promise2会以之前promise状态执行
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        const promise2 = new Promise((resolve, reject) => {
            // 正常完成处理
            const resolveFunc = ()=>{
                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            // 失败处理
            const rejectFunc = ()=>{
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reson);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status === PENDING) {
                this.onFulfilleds.push(resolveFunc)
                this.onRejecteds.push(rejectFunc)
            }
            // 完成状态
            if (this.status === FULFILLED) {
                resolveFunc();
            }
            // 失败状态
            if (this.status === REJECTED) {
                rejectFunc();
            }
        });

        return promise2;
    }


}

/**
 * promise 解决过程
 */

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('chaining circle error'));
    }

    if (x && (typeof x === 'function' || typeof x === 'object')) {
        // 处理类promise对象可能存在的多次调用
        let hasCalled = false;
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (hasCalled) return;
                    hasCalled = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (e) => {
                    if (hasCalled) return;
                    hasCalled = true;
                    reject(e);
                });
            } else {
                resolve(x);
            }
        } catch (error) {
            // 异步调用resolvePromise，存在重复调用
            if (hasCalled) return;
            hasCalled = true;
            reject(error);
        }
    } else {
        resolve(x);
    }

}

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;