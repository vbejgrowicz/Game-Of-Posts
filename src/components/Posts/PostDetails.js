/*jshint esversion: 6*/
import React from 'react';
import { connect } from 'react-redux';
import EditPostButton from './utils/EditPostButton';
import DeletePostButton from './utils/DeletePostButton';
import DisplayTitle from '../DisplayData/DisplayTitle';
import DisplayAuthor from '../DisplayData/DisplayAuthor';
import DisplayBody from '../DisplayData/DisplayBody';
import DisplayTimestamp from '../DisplayData/DisplayTimestamp';
import DisplayNumComments from '../DisplayData/DisplayNumComments';
import DisplayVoteScore from '../DisplayData/DisplayVoteScore';
import { changeVoteScore } from '../../actions/PostsAction';

class PostDetails extends React.Component {

  voteEventPost(post, vote) {
    this.props.changeVoteScore(post, vote);
  }

  render() {
    const { post } = this.props;
    return(
      <div className="Post">
        <DisplayVoteScore voteScore={post.voteScore} post={post.id} voteEvent={this.voteEventPost.bind(this)}/>
        <div className="Post-Data">
          <a href={'/'+ post.category + '/' + post.id} className="Post-Link">
            <DisplayTitle title={post.title} />
            <DisplayBody body={post.body} />
            <div className="date-and-author">
              <DisplayTimestamp timestamp={post.timestamp} />
              &nbsp;by&nbsp;
              <DisplayAuthor author={post.author} />
            </div>
            <DisplayNumComments parentId={post.id} />
          </a>
        </div>
        <div className="Post-Buttons">
          <EditPostButton id={post.id} title={post.title} body={post.body} author={post.author} category={post.category} />
          <DeletePostButton id={post.id} deletePostfunction={this.props.deletePostfunction} />
        </div>
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
    changeVoteScore: (id, vote) => dispatch(changeVoteScore(id, vote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
