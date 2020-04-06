function toggle_replies(e) {

    let replyBox = e.parentNode.nextElementSibling;

    console.log(replyBox.style.display);

    //replyBox.toggle()

    replyBox.style.display === "none"
        ? (replyBox.style.display = "block")
        : (replyBox.style.display = "none");
}   