/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import CustomButtonWithTooltip from '../utils/CustomButtonWithTooltip';
import { changeCommentVoteScore, removeComment } from '../../actions/CommentsAction';
import { openCommentForm, updateParentID, updateCommentID, isExistingComment, updateCommentBody, updateCommentAuthor } from '../../actions/EditCommentAction';


class CommentDetails extends React.Component {

  voteEventComment(comment, vote) {
    this.props.changeCommentVoteScore(comment, vote);
  }

  render() {
    const { comment } = this.props;
    const { voteScore, id, body, timestamp, author, parentId } = comment;
    return(
      <div className="Comment">
        <DisplayVoteScore voteScore={voteScore} comment={id} voteEvent={this.voteEventComment.bind(this)}/>
        <div className="Comment-Data">
          <DisplayBody body={body} />
          <div className="date-and-author">
            <DisplayTimestamp timestamp={timestamp} />
            &nbsp;by&nbsp;
            <DisplayAuthor author={author} />
          </div>
        </div>
        <div className="Comment-Buttons">
          <CustomButtonWithTooltip tooltipText="Edit" onPress={this.props.openCommentForm.bind(this, parentId, id, body, author)}><Glyphicon glyph="pencil"/></CustomButtonWithTooltip>
          <CustomButtonWithTooltip tooltipText="Delete" onPress={this.props.removeComment.bind(this, parentId, id)}><Glyphicon glyph="remove"/></CustomButtonWithTooltip>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCommentVoteScore: (id, vote) => dispatch(changeCommentVoteScore(id, vote)),
    removeComment: (parentId, comment) => {
      dispatch(removeComment(parentId, comment));
    },
    openCommentForm: (parentId, id, body, author) => {
      dispatch(updateParentID(parentId));
      dispatch(updateCommentID(id));
      dispatch(updateCommentBody(body));
      dispatch(updateCommentAuthor(author));
      dispatch(isExistingComment(true));
      dispatch(openCommentForm());
    },
  };
};

export default connect(null, mapDispatchToProps)(CommentDetails);
