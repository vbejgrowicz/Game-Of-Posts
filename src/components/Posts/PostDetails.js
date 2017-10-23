/*jshint esversion: 6*/
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import CustomButtonWithTooltip from '../utils/CustomButtonWithTooltip';
import DisplayTitle from '../DisplayData/DisplayTitle';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayNumComments from '../DisplayData/DisplayNumComments';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import { changeVoteScore } from '../../actions/PostsAction';
import { openPostForm, updateID, isExistingPost, updateTitle, updateBody, updateAuthor, updateCategory } from '../../actions/EditPostAction';
import { Link } from 'react-router-dom'

class PostDetails extends React.Component {

  voteEventPost(post, vote) {
    this.props.changeVoteScore(post, vote);
  }

  render() {
    const { post } = this.props;
    const { id, title, body, author, category, voteScore, timestamp} = post;
    return(
      <div className="Post">
        <DisplayVoteScore voteScore={voteScore} post={id} voteEvent={this.voteEventPost.bind(this)}/>
        <Link to={'/'+ post.category.split(" ").join("_") + '/' + post.id} className="Post-Data">
            <DisplayTitle title={title} />
            <DisplayBody body={body} />
            <div className="date-and-author">
              <DisplayTimestamp timestamp={timestamp} />
              &nbsp;by&nbsp;
              <DisplayAuthor author={author} />
            </div>
            <DisplayNumComments parentId={id} />
        </Link>
        <div className="Post-Buttons">
          <CustomButtonWithTooltip tooltipText="Edit" onPress={this.props.openPostForm.bind(this, id, title, body, author, category)}><Glyphicon glyph="pencil"/></CustomButtonWithTooltip>
          <CustomButtonWithTooltip tooltipText="Delete" onPress={this.props.deletePostfunction}><Glyphicon glyph="remove"/></CustomButtonWithTooltip>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeVoteScore: (id, vote) => dispatch(changeVoteScore(id, vote)),
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

export default connect(null, mapDispatchToProps)(PostDetails);
