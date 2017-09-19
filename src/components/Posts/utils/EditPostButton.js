/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { openPostForm, updateID, isExistingPost, updateTitle, updateBody, updateAuthor, updateCategory } from '../../../actions/EditPostAction';

class EditPostButton extends React.Component {

  render() {
    const { openPostForm, id, title, body, author, category } = this.props;
    return (
      <div className="Edit-Button">
        <Button className="Custom-Button" onClick={() => openPostForm(id, title, body, author, category)}><Glyphicon glyph="pencil"/> Edit</Button>
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
