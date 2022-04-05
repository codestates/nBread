import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addSubscriber } from '../redux/subscribers/action'

function Subscribers() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.subscribersReducer.count)

    return (
    <div >
      <p>구독자 수 : {count}</p>
      <button onClick={()=>dispatch(addSubscriber())}>구독하기!</button>
    </div>
  );
}

export default Subscribers;





// import React from 'react';
// import { connect } from 'react-redux'
// import { addSubscriber } from '../redux/subscribers/action'

// function Subscribers({ count , addSubscriber}) {
//     return (
//     <div >
//       <p>구독자 수 : {count}</p>
//       <button onClick={()=>addSubscriber()}>구독하기!</button>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     count: state.count
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addSubscriber: ()=>dispatch(addSubscriber())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);