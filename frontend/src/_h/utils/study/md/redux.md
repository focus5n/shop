## Redux

리덕스는 store라는 단 한개의 저장소에서 컴포넌트들의 state가를 관리함. 각 컴포넌트에서 각 state가 많아질때 상속과, 상위, 하위 관계에 대하여 복잡해지는데 reducer함수와 action을 통해 store에 있는 모든 statem에 접근가능.

액션을 디스패치하면 reducer함수를 호출한다.

## useReducer

state는 각 컴포넌트에서 사용하는 상태이고 dispatch는 액션을 발생시키는 함수이다.

``` javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

코드예시이다

``` javascript
import React, {useReducer} from 'react';

function reducer(state, action) {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT" :
            return state - 1
        default:
            return state
    }
}

const counter = () => {
    const [number, dispatch] = useReducer(reducer, 0)

    const onIncrease = () => {
        dispatch({ type: 'INCREMENT'})
    }

    const onDecrease = () => {
        dispatch({ type: 'DECREMENT'})
    }
}
```

루트 리듀서는 애플리케이션 내에 store가 하나만 존재 할 수 있기 때문에 사용하는 모든 리듀서를 로드하는 것

``` javascript
const rootReducer = combindReducers({
    reducerOne,
    reducerTwo
})

export default rootReducer

const store = createStore(rootReducer)
```

## useSelector

state값은 store.getState() 함수를 호출 했을 때와 같다

``` javascript
const {number, diff} = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
})) 
```

## useDispatch

``` javascript
const dispatch = useDispatch();
const getUser = () => dispatch(getUser());
```

## 미들웨어
간단한 로그 미들웨어

``` javascript
const Logget = store => next => action => {
    console.log(action)
    const result = next(action)
    return result
}

export default Logger

const stroe = createStore(rootReducer, applyMiddleware(Logger))
```
