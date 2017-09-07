/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import CommentDetails from './CommentDetails';


class DisplayComments extends React.Component {

  render() {
    var parentId = this.props.parentId;
    return this.props.commentsReducer[parentId] ? (
      <div className="Comment-List">
        {this.props.commentsReducer[parentId].map((comment) => {
            return(
              <li className="Comment" key={comment.id}>
                <CommentDetails comment={comment}/>
              </li>
            );
        })}
      </div>
      ):(
        null
      );
  }
}

const mapStateToProps = (state) => {
  return {
    commentsReducer: state.commentsReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayComments);
