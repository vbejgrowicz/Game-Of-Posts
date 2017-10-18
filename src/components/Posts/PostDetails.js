/*jshint esversion: 6*/
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import CustomButton from '../utils/CustomButton';
import DisplayTitle from '../DisplayData/DisplayTitle';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayNumComments from '../DisplayData/DisplayNumComments';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import { changeVoteScore } from '../../actions/PostsAction';
import { openPostForm, updateID, isExistingPost, updateTitle, updateBody, updateAuthor, updateCategory } from '../../actions/EditPostAction';

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
        <div className="Post-Data">
          <a href={'/'+ category.split(" ").join("_") + '/' + id} className="Post-Link">
            <DisplayTitle title={title} />
            <DisplayBody body={body} />
            <div className="date-and-author">
              <DisplayTimestamp timestamp={timestamp} />
              &nbsp;by&nbsp;
              <DisplayAuthor author={author} />
            </div>
            <DisplayNumComments parentId={id} />
          </a>
        </div>
        <div className="Post-Buttons">
          <CustomButton onPress={this.props.openPostForm.bind(this, id, title, body, author, category)}><Glyphicon glyph="pencil"/> Edit</CustomButton>
          <CustomButton onPress={this.props.deletePostfunction}><Glyphicon glyph="remove"/> Delete</CustomButton>
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
