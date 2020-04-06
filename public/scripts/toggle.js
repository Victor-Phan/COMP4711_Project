function toggle_replies(e) {

    console.log(e);

    let replyBox;

    if (e.classList.contains("search-results--item-replies-count")) {
        replyBox = e.parentNode.nextElementSibling;
    } else if (e.classList.contains("div-replyNum")) {
        replyBox = e.nextElementSibling;
    }

    console.log("Reply Box:");
    console.log(replyBox);

    replyBox.style.display === "none"
        ? (replyBox.style.display = "block")
        : (replyBox.style.display = "none");
}