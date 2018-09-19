# Promise
> 프로미스는 콜백의 단점을 해결하기 위해 만들어졌다. 비동기 조작의 완료 및 실패를 표현해준다. 기본적으로 콜백을 전달하는 대신, 콜백을 첨부하는 방식이다. Promise 패턴을 사용한다면 비동기 처리를 순차적으로 진행할 수도 있고, 병렬적으로 처리를 하기에 편리해지며 무엇보다 콜백 지옥과 같은 더러운 가독성과 유지보수 성에서 벗어날 수 있다.

## 프로미스의 상태 
프로미스에는 4가지 상태가 존재한다. 
- pending : 아직 약속이 수행중인 상태
- fulfilled : 약속이 지켜진 상태
- rejected : 약속이 어느 이유로 지켜지지 못한 상태
- settled : 약속이 지켜지던 지켜지지 않았던 끝난 상태

각 상태는 아래 생성하는 방법 설명하며 자세히 설명할 예정이다.

## 프로미스 생성
> 프로미스를 생성하기 위해서는 Promise 인스턴스를 만들면 된다.

아래 코드가 프로미스를 생성하는 코드이다. 아래 예제로 이해할 수 있다.
```javascript
let bool = true;
let _promise = new Promise(function(resolve, reject) {
    if (bool) {
        resolve("fulfilled")
    }
    else {
        reject("rejected")
    }
}).then(function(text) {
    console.log(text);
}).catch(function(text) {
    console.log(text);
})
```

위 코드가 프로미스를 생성하는 간단한 코드이다. bool 값에 따라서 성공과 실패 여부가 결정되는 프로미스이다.

위 코드에서 `new Promise(){}` 이 구문이 상태 값에서 `pending` 이라고 할 수 있다. 그 다음 `resolve()`를 실행하여 `then()`을 실행했을 때가 `fulfilled` 상태이며 `reject()`가실행되어 `catch()` 구문이 실행됬을 때 `rejected` 상태이다. 그리고 `fulfilled` 혹은 `rejected` 상태를 거쳐 Promise가 끝났을 때 `settled` 상태가 된다.

`resolve()` 함수를 만났을 때 resolve 함수의 인자로써 넘겨지는 값이 then()의 인자로 넘어가는 콜백 함수의 인자로써 사용된다. 위 코드에서는 문자열 `fulfilled`가 then() 함수의 콜백인 `function(text)`의 매개변수 text 값으로 사용할 수 있다는 것이다. 반대로 `reject()` 함수를 만났을 때 reject 함수의 인자로써 넘겨지는 값이 catch()의 인자로 넘어가는 콜백 함수의 인자로써 사용된다. 위 코드에서는 문자열 `rejected`가 catch() 함수의 콜백인 `fundtion(text)`의 매개변수 text 값으로 사용된다.

reject를 받는 방법은 위의 방법도 있지만 아래와 같은 방법도 있다.
```javascript
let bool = true;
let _promise = new Promise(function(resolve, reject) {
    if (bool) {
        resolve("fulfilled")
    }
    else {
        reject("rejected")
    }
}).then(function(text) {
    console.log(text);
}, function(err) {
    console.log(err);
})
```
위의 코드는 앞서 설명한 코드와 같은 의미를 갖는다. 차이점은 then 함수의 두번째 인자로 에러를 처리하는 코드를 삽입한 것을 제외하고는 다른 것이 없다.


## 프로미스 체이닝
> 프로미스의 then와 catch는 새로운 프로미스를 리턴한다.

프로미스의 then와 catch이 새로운 프로미스를 리턴한다는 사실을 가지고 중복 콜백을 하는 것과 같이 프로미스를 중복으로 사용할 수 있다. 이를 프로미스 체이닝이라 한다. 

아래 예시를 통해서 간단히 이해할 수 있다.
```javascript
new Promise(function(resolve, reject) {
    setTimeout(function() {
        data = 1
        resolve(data)
    }, 1000)
}).then(function(data) {
    console.log(data); // 1
    return data + 1;
}).then(function(data) {
    console.log(data); // 2
    return data + 1;
}).then(function(data) {
    console.log(data) // 3
    return data + 30;
}).then(function(data) {
    console.log(data) // 33
})
```
간단한 예시를 위해서 비동기 처리를 하는 프로미스를 만들기 위해서 setTimeout 함수를 이용했다. 첫 프로미스에서 resolve 를 통해 then 구문을 호출하였고 그때의 data가 1이었다. 그리고 나서 첫 then 구문이 만난후 then 구문의 콜백이 +1한 값인 2를 리턴하였고 그 값을 이용해 then은 새로운 프로미스를 생성했다. 

새로운 프로미스의 then 값으로 앞서 콜백에서 리턴한 값을 받아 2를 받았고 2를 콘솔에 출력한 후 1를 더해서 리턴하여 새로운 프로미스를 생성, 이 프로미스의 then 의 콜백의 값은 앞서 리턴 받은 값인 3, 이에다가 30을 더해 33을 리턴해 마지막 프로미스에서 33을 출력했다.

이와같이 콜백을 중첩하듯이 프로미스를 중첩시켜 프로미스 체이닝을 할 수 있다.

위의 설명보다 간단히 설명되어 있는 것이 HTML5Rocks의 예제와 그림으로 잘 표현되어있어 가져와보았다.
```javascript
asyncThing1()
	.then(function() { return asyncThing2();})
	.then(function() { return asyncThing3();})
	.catch(function(err) { return asyncRecovery1();})

	.then(function() { return asyncThing4();}, function(err) { return asyncRecovery2(); })
	.catch(function(err) { console.log("Don't worry about it");})

	.then(function() { console.log("All done!");});
```

위의 로직이 아래 그림과 같은 로직을 갖는다.
<img src="./img/promise_chaining.png">
말로 간단하게 설명하면 `asyncThing1()`부터 `asyncThing3()`까지 성공적으로 실행된다면 각각의 다음 then을 실행하며 실패한다면 `asyncRecovery1()`이 실행된다. 

그리고 `asyncRecovery1()` 혹은 `asyncThing3()`이 성공적으로 실행된다면 `asyncThing4()`가 실행되며 실패할 경우 `asyncRecovery()`의 경우 `asyncRecovery2()`가 `asyncThing3`이 실패할 경우 `asyncRecovery1()`이 실행된다. 

그 이후 `asyncThing4()`혹은 `asyncRecovery2()`가 성공적으로 실행된다면 console에 `All done!`이 출력될 것이고 실패한다면 `Don't worry about it`이 실행될 것이다.

## Promise.all ?
> 여러 개의 프로미스가 모두 완료되었을 때 실행되는 프로미스이다.

아래 예제를 보고 설명한다.
```javascript
const _promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(1)
    }, 1000)
})
const _promise2 = new Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve(2)
    }, 1000)
})
Promise.all([_promise1, _promise2]).then(function(values) {
    console.log("_promise1, _promise2 all done, ", values); // _promise1, _promise2 all done, [1,2]
})
```
위의 코드를 설명하자면 _promise1과 _promise2 둘 다 settled 상태에 진입했을 때 각각의 값이 Promise.all의 then 인자로 들어간다. 복수 개 이므로 배열의 형태로 인자로 넘어가고 Promise.all의 인자로써 쓰인 배열의 프로미스들이 모두 완료 되었을 경우 then() 이 실행된다.