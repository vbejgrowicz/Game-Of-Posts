/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { openPostForm, updateID, isExistingPost, updateTitle, updateBody, updateAuthor, updateCategory } from '../../actions/EditPostAction';

class EditPostButton extends React.Component {

  render() {
    return (
      <div className="Edit-Post">
        <button onClick={() => this.props.openPostForm(this.props.id, this.props.title, this.props.body, this.props.author, this.props.category)}>Edit Post</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openPostForm: (id, title, body, author, category) => {
      dispatch(updateID(id));
      dispatch(updateTitle(title));
      dispatch(updateBody(body));
      dispatch(updateAuthor(author));
      dispatch(updateCategory(category));
      dispatch(isExistingPost(true));
      dispatch(openPostForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostButton);
