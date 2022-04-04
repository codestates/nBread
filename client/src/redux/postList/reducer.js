import { SHOW_POST_LIST_SUCCESS, SHOW_POST_EDIT_SUCCESS,SHOW_POST_CLOSED_EDIT_SUCCESS, SHOW_POST_RECRUITMENT_SUCCESS, SHOW_POST_CANCEL_RECRUITMENT_SUCCESS } from "./type";

const postDetailInitialState = {
    address: null,
    body: null,
    category_food: null,
    closed: null,
    created_at: null,
    delivery_fee: null,
    id: null,
    lat: null,
    lng: null,
    recruitment_personnel: null,
    restaurant_name: null,
    user_id: null,
    content_count: null,
    rel: null
};

const postsDetailReducer = (state=postDetailInitialState, action) => {
  switch(action.type){
    case SHOW_POST_LIST_SUCCESS:
      let post = action.payload.data.data;
      let newData = {
        address: post.address,
        body: post.body,
        category_food: post.category_food,
        closed: post.closed,
        created_at: post.created_at,
        delivery_fee: post.delivery_fee,
        id: post.id,
        lat: post.lat,
        lng: post.lng,
        recruitment_personnel: post.recruitment_personnel,
        restaurant_name: post.restaurant_name,
        user_id: post.user_id,
        content_count: post.content_count,
        rel: post.rel
      }
      return Object.assign({}, state, newData);
    case SHOW_POST_EDIT_SUCCESS:
      return Object.assign({}, state, {
          contendId: post.contendId,
          restaurant_name: post.restaurant_name,
          recruitment_personnel: post.recruitment_personnel,
          delivery_fee: post.delivery_fee,
          address: post.address,
          body: post.body,
      });
    case SHOW_POST_CLOSED_EDIT_SUCCESS:
      return state;
    case SHOW_POST_RECRUITMENT_SUCCESS:
      return state;
    case SHOW_POST_CANCEL_RECRUITMENT_SUCCESS:
      return state;
    default: return state;
  }
}

// 글 생성 조회 수정 삭제 실패
export default postsDetailReducer;


