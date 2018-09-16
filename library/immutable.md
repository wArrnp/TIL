# immutable.js

- 불변성을 유지하는 것을 편하게 하기 위한 라이브러리
- ES2015를 채택
- js 자체의 불변성을 지원하는 라이브러리 (react에 자주 사용됨)
- 의존성이 없어 브라우저에서 사용하는 것 또한 가능

-----
## 객체의 불변성

- 기존의 객체의 불변성을 지키기 위해서는 스프레드 연산자 (...), 새로운 객체를 리턴해 주는 함수 (ex> slice, concat 등) 을 사용

- immutable.js의 Map 함수로 선언, 해당 라이브러리의 함수를 사용한다면 편하게 불변성을 지킬 수 있다.

```javascript
var obj = {
    a: 1,
    b: 2
}
```
기존의 방식으로 객체를 선언한 것이다.<br />
immutable.js를 이용하여 다음과 같이 선언할 수 있다.
```javascript
import { Map } from 'immutable'

var obj = Map({
    a: 1,
    b: 2
})
```

- 객체 내부의 값을 참조하거나 수정하는 방법 또한 다르다.

우선 객체의 내부의 값을 참조하는 방법이다.

기존의 방법은 다음과 같이
```javascript
obj.a
```
라면 immutable.js를 사용하면 내부의 get방식을 사용하여 값에 참조할 수 있다.
```javascript
console.log(obj.get('a')) // 1
```
만약 객체의 구조가 다음과 같이 중첩된 값을 가져올 때에는 getIn 함수를 사용한다.
```javascript
var obj = Map({
    a: Map({
        b: Map({
            c: 1
        })
    })
})

console.log(obj.getIn(['a','b','c']))
// 1
```

이제는 내부의 값을 수정하는 방법이다.

```javascript
newObj = {...obj, a: 3}
```
기존의 방식으로 불변성을 유지하여 이와 같이 값을 수정할 수 있다면

```javascript
newObj = obj.set('a', 3) // 첫 인자로 속성 명, 두 번째 인자로 바꿀 값
```
이처럼 set함수를 사용하게 되면 불변성을 유지할 수 있다.

만약 다음과 같은 구조로 객체가 있을 때에는 setIn 함수로 내부의 값을 수정 할 수 있다.
```javascript
var obj = Map({
    a: Map({
        b: Map({
            c: 1
        })
    })
})

var newObj = obj.setIn(['a', 'b', 'c'], 3)

console.log(obj.getIn(['a','b','c'])) // 3
console.log(obj === newObj) // false
```
여러개의 데이터를 한번에 수정해야 할 경우 merge, mergeIn 함수를 사용하거나 set, setIn 함수를 다음과 같이 응용할 수 있다.
```javascript
var obj = Map({
    a: Map({
        b: Map({
            c: 1,
            d: 2
        })
    }),
    e: 3,
    f: 4
})

var newObj = obj.merge({e: 5, f: 6}) // 최상위 요소를 바꿀때에는 merge

var newnewObj = obj.mergeIn(['a','b'], {c: 7, d: 8}) // 중첩된 데이터를 한번에 수정하고 싶을때에는 mergeIn

var newnewnewObj = obj.setIn(['a','b','c'], 9)
                      .setIn(['a','b','d'], 10) //와 같이 응용 또한 가능

// 성능상 set을 여러번 해주는 것이 미세하게 빠름
```
기존의 값을 가지고 내부 값을 변경해 줄때에는 다음과 같은 방법이 있다.
```javascript
var newObj = obj.update('e', data => data + 1)

console.log(newObj.get('e')) // 4
```
삭제를 하기위해서는 다음과 같이 한다.
```javascript
var obj = Map({
    a: 1,
    b: 2,
    c: 3
})

var newObj = obj.delete('a') // {b:2, c:3}
// setIn과 getIn과 같이 deleteIn도 사용가능
```


fromJS 라는 함수를 이용하여 일반 객체를 immutable의 객체로 바꾸어 줄 수 있다.
```javascript
var obj = {
    a: {
        b:3
    }
}

var data = fromJS(obj)
```

반대로 immutable의 객체를 일반 객체로 바꿀 수도 있다.

내부의 객체 또한 Map 객체로 변환된다.
```javascript
var obj = Map({
    a: Map({
        b: 3
    })
})

var data = toJS(obj)
```

-----
## 배열의 불변성
- 배열의 불변성을 지키기 위해서는 List 함수를 사용한다.
- 일반 배열과 동일하게 `map`, `filter`, `sort`, `push`, `pop` 함수를 내장하고 있다. List를 통해 해당 함수를 사용했을 경우 리턴 값 또한 List이다.

List를 선언하는 방법은 다음과 같다.
```javascript
var list = List([1,2,3,4,5])
```
값을 참조하는 것과 수정하는 것은 Map과 동일한 방법을 사용한다.
```javascript
var list = List([1,2,3,4,5])

var data = list.get(1)
var newList = list.set(1, 3)
```
내부의 값을 수정하는것, 참조하는 것 또한 동일하다.
아래 예시는 List 내부에 Map이 있을 경우이다.
```javascript
var list = List([
    Map({value: 1}),
    Map({value: 2})
])

var data = list.getIn([0, 'value'])
var newList = list.setIn([0, 'value'], 10)
```
기존의 값을 이용해 값을 변환하는 것 또한 Map과 동일하다
```javascript
var list = List([1,2,3,4])

var newList = list.update(1, data => data + 1)
// [1,3,3,4]
```

데이터 추가는 다음과 같다.
```javascript
var list = List([1,2,3,4])

var newList = list.push(5) // [1,2,3,4,5]
// Array와 다르게 기존의 배열을 수정하는 것이 아니다. 수정된 값을 리턴해준다.

//맨 앞에 추가
var newnewList = list.unshift(0) // [0,1,2,3,4]
```

데이터 제거는 다음과 같다.
```javascript
var list = List([1,2,3,4])

var newList = list.delete(1) // [1,3,4]
// 인자의 인덱스의 값을 제거한다.
var newnewList = list.pop() // [1,2,3]
// 맨 마지막 요소를 제거한다.
```

List의 크기를 가져오는 것은 다음과 같다.
```javascript
var list = List([1,2,3,4])
console.log(list.size) // 4
console.log(list.isEmpty()) // false
// isEmpty는 비어있는지 확인해준다.
``` 

-----
## Record
- get, getIn 을 하는 것이 번거로워 만들어진 것
- 미리 형식을 갖추어 놓는다.
- Map과 List를 상속받기 때문에 해당 함수들을 사용할 수 있다.

```javascript
const Data = Record({
    number: null,
    name: null,
    users: List()
}) 
// 이와 같이 형식을 설정하여 Record함수를 설정하면 함수가 리턴된다.

const state = Data({
    number: 1,
    name: 'Oh Inseo',
    users: List([1,2,3,4])
}) // 이와 같이 리턴된 함수로 값을 지정할 수 있다.

// 이렇게 만들어진 데이터는 .을 통해 값에 접근할 수 있다.

console.log(state.number) // 1
console.log(state.users[1]) // 2
```

-----
React, Redux와 같이 data의 불변성을 지켜주어야 할때 immutable.js를 사용하면 훨씬 빠르고 쉽고 짧게 작업이 가능하다.

값의 구조가 복잡할 수록 유용하다.

불변성을 지켜주기에 최적화에 유용하다 !