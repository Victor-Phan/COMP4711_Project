function toggle_replies(e) {

    let replyBox = e.parentNode.nextElementSibling;

    replyBox.style.display === "none"
        ? (replyBox.style.display = "block")
        : (replyBox.style.display = "none");
}   