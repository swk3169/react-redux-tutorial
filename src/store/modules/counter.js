// 카운터 관련 상태 로직
import { createAction, handleActions } from 'redux-actions';

// 액션 타임을 정의해준다.
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션 생성 함수를 만든다.
// 이 함수들은 나중에 다른파일에서 불러와야 하므로 내보내준다.
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

// 모듈의 초기 상태를 정의한다.
const initialState = {
    number: 0
};

// handleActions의 첫번째 파라미터는 액션을 처리하는 함수들로 이뤄진 객체이고
// 두번째 파라미터는 초기 상태이다.
export default handleActions({
    [INCREMENT]: (state, action) => {
        return { number: state.number + 1 };
    },
    // action 객체를 참조하지 않기 때문에 이렇게 생략 가능
    // state 부분에서 비구조화 할당을 해주었기 때문에 코드가 더욱 간소화 됨
    [DECREMENT]: ({ number }) => ({ number: number - 1 })
}, initialState);