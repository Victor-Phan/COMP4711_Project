var startIndex = 0;
var numPostPerPage = 5;
let list = document.getElementsByClassName("div-discussionBox");

const showHidePosts = (list, startIndex, maxShowIndex) => {
  Array.from(list).forEach((post, index) => {
    if (index >= startIndex && index < maxShowIndex) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
    //Returning false will ensure the page does not move
    return false;
  })
}

const nextPostPage = () => {
  let maxShowIndex = (startIndex + numPostPerPage * 2 < list.length) ? startIndex + 5 : list.length;
  if (startIndex + numPostPerPage < list.length) {
    startIndex += numPostPerPage;
  }
  showHidePosts(list, startIndex, maxShowIndex);
}

const prevPostPage = () => {
  startIndex = (startIndex - numPostPerPage > 0) ? startIndex - numPostPerPage : 0;
  let maxShowIndex = (startIndex + 5 < list.length) ? startIndex + 5 : list.length;
  showHidePosts(list, startIndex, maxShowIndex);
}

showHidePosts(list, startIndex, 5);