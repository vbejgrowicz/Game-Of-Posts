/* jshint esversion:6 */

export function sortByVoteScore(posts) {
  return posts.slice(0).sort(function(a,b) {
    return b.voteScore - a.voteScore;
  });
}
export function sortbyTimestamp(posts) {
  return posts.slice(0).sort(function(a,b) {
    return b.timestamp - a.timestamp;
  });
}
