import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';

const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

export const changeInput = createAction(CHANGE_INPUT, value => value);
export const insert = createAction(INSERT, text => text);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

let id = 0; // todo 아이템에 들어갈 고유 값

// Record 함수는 Record 형태 데이터를 만드는 함수를 반환한다.
// 따라서, 만든 다음에 뒤에 ()를 붙여줘야 데이터가 생성된다.
const initialState = Record({
    input: '',
    todos: List()
})();

// Todo 아이템의 형식을 정한다.
const TodoRecord = Record({
    id: id++,
    text: '',
    checked: false
})

export default handleActions({
    // 한줄짜리 코드로 반환 할 수 있는 경우엔 다음과 같이 블록 { } 를 생략 할 수 있다.
    [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
    [INSERT]: (state, { payload: text }) => {
        // 위 코드는 action 객체를 비구조화 할당하고, payload 값을 text라고 부르겠다는 의미이다.
        // TodoRecord를 사용해야 아이템도 Record 형식으로 조회 가능하다.
        // 빠져있는 값은, 기본값을 사용하게 된다. (checked: false)
        const item = TodoRecord({ id: id++, text }); // 하나 추가 할 때마다 id 값을 증가시킨다.
        return state.update('todos', todos => todos.push(item));
    },
    [TOGGLE]: (state, { payload: id }) => {
        // id 값을 가진 index를 찾아서 checked 값을 반전시킨다.
        const index = state.get('todos').findIndex(item => item.get('id') === id);
        return state.updateIn(['todos', index, 'checked'], checked => !checked);
    },
    [REMOVE]: (state, { payload: id }) => {
        // id 값을 가진 index를 찾아서 지운다.
        const index = state.get('todos').findIndex(item => item.get('id') === id);
        return state.deleteIn(['todos', index]);
    }
}, initialState);