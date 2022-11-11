## React

이런 함수형 업데이트는 주로 최적화를 위해 사용한다.

``` javascript

const counter = () => {
    const [number, setNumber] = useState(0)

    const increase = (prev) => {
        return prev + 1
    }

    const decrease = (prev) => {
        return prev - 1
    }
}
```

## Context

프로젝트 전역에서 사용할 값을 Context에서 관리하면 편하다. 여러 컴포넌트에서 props나 state를 전달 할 필요가 없기 때문이다.

``` javascript
const stateContext = createContext();
const dispatchContext = createContext();

export function useStateContext() {
    const context = useContext(stateContext);
    if(!context) {
        throw new Error()
    }
    return context;
}

export function useDispatchCOntext() {
    const context = useContext(dispatchContext);
    if(!context) {
        throw new Error()
    }
    return context
}

```

## axios와 useAsync

``` javascript
asyn function getUser({ id }) {
    const res = await axios.get(
        `http://localhost/users/${id}`
    );
    return res.data
}

function User({ id }) {
    const {data:user, erro, loading} = useAsync({
        promiseFn: getUser,
        id,
        watch: id
    });

    if(loading) return <div>loading...</div>
    if(error) return <div>error</div>
    if(!user) return null
}
```

## 라우터

기본 사용법

``` javascript
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    documenet.getElementById('root)
)
```

``` javascript
const userData = {
    hjk : {
        name: 'hjk'
    }, 
    hjk2 : {
        name: 'hjk2'
    }
}

const User = ({ match }) => {
    const {username} = match.params
    const user = userData[userName];
}

<Route path="/user/:username" component={user} />

const About = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const user = query.user
}

// /user/hjk로 조회 가능
```

## react-query

``` javascript
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">div</div>
        </QueryClientProvider>
    )
}

const getPostById = async (id: number): Promise<Post> => {
    const { data } = await.axios.get(
        `test`
    )
    return data
}

const getPosts = async (): Promise<Array<Post>> => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
  );
  return data;
};

export const usePost = (postId: number) => {
    return useQuery(['post', postId], () => getPostById(postId), {

    })
}

export const usePosts = () => {
  return useQuery('posts', getPosts);
};

const {status, data, error} = usePosts()
```




