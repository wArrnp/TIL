# 콜백 함수
> 함수를 함수의 인자로써 전달되어 사용되는 함수이다. 또한 전달받은 함수를 그 함수의 내부에서 실행시킨다.

## 주위에서 볼 수 있는 콜백 함수
아래와 같은 코드를 한번 쯤은 본적이 있을 것이다.
```javascript
setTimeout(function() {
    console.log('good!');
},1000)
```
위 코드에서 `function(){}` 부분이 콜백이라고 할 수 있다.

또한 아래와 같은 코드도 본적이 있을 것이다.
```javascript
$("#btn").on('click', function(){
    console.log('ooh hoo!');
})
```
위 코드의 경우 `#btn` 속성을 갖는 값이 클릭되었을 때 `function(){}` 부분을 실행하라 라는 의미로 역시 `function(){}` 부분이 콜백이라고 할 수 있다.

## 콜백은 클로저다
콜백 함수는 함수가 만들어진 환경을 기억한다. 즉, 클로저의 성격을 가지고 있다는 것이다.

아래 코드로 간단히 설명하겠다.
```javascript
function callbackF(callback){
    callback()
}

function callllll() {
    var text = "^ㅁ^"
    callbackF(function(){
        console.log(text)
    })
}
```
위 예시를 보면 `callbackF` 함수에 전달하는 인자로써 만들어진 function 내부에서 text 변수가 참조되고 있다는 것을 볼 수 있다. 하지만 해당 function이 호출되는 부분에는 text가 없는데 출력 결과로는 `^ㅁ^`가 출력된다. 이를 보고 클로저의 성격을 가지고 있다는 것을 알 수 있다.

> 클로저와 비동기적으로 실행되는 코드를 잘 이해하지 않는다면 ?
클로저의 성격을 가지고 있는 콜백 함수와 비동기적으로 실행되는 함수에 대한 이해가 부족해 발생하는 에러가 있다. 아래 코드로 이해할 수 있다.
```javascript
function count() {
    let i;
    for(i = 5; i > 0; i--) {
        setTimeout(function() {
            console.log(i)
        }, 1000)
    }
}
```
비동기와 콜백에 대한 이해가 부족할 때 위 코드의 결과를 예측해보자면 `5 4 3 2 1`이 출력될 것이라고 예상할 수 있다. 하지만 비동기적으로 처리되고 콜백은 클로저의 성격을 가르키고 있다고 위에서 설명했다. setTimeout 함수가 webapi 단과 이벤트 큐에 있을 때 이미 i의 값이 1로 되고 console.log() 함수가 실행될 때면 i의 값이 이미 1로 되어있을 것이다. 따라서 출력 결과는 `1 1 1 1 1`이 된다.

## 콜백 지옥
콜백 함수를 중복해서 쓰다보면 마치 삼각형 모양 (에네르기 파라고들 표현한다.)의 콜백 지옥에 빠지곤 한다.

아래 예시를 통해서 확인할 수 있다.
아래 예시는 다음 페이지에서 구해온 예제이다. `https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/#%EC%BD%9C%EB%B0%B1-%EC%A7%80%EC%98%A5-callback-hell`
```javascript
$.get('url', function (response) {
	parseValue(response, function (id) {
		auth(id, function (result) {
			display(result, function (text) {
				console.log(text);
			});
		});
	});
});
```
위 코드는 url 서버에서 데이터를 받아와 인코딩, 사용자 인증, 출력 까지 콜백이 여러번 쓰인것을 알 수 있다. 위 예제를 가져온 사이트에서는 로직을 바꾸어 콜백을 해결하는 방법을 제시했다.

그 코드가 다음 예제이다.
```javascript
function parseValueDone(id) {
	auth(id, authDone);
}
function authDone(result) {
	display(result, displayDone);
}
function displayDone(text) {
	console.log(text);
}
$.get('url', function (response) {
	parseValue(response, parseValueDone);
});
```

위와 같이 로직을 변경할 수도 있지만 프로미스를 사용하는 방법도 있다. 프로미스는 다음 자료에서 다룬다.