$(document).ready(function () {
  $("#link-read-more-contact-recevied").bind("click", function () {
    let skipNumber = $("#request-contact-received").find("li").length;
    $("#link-read-more-contact-recevied").css("display", "none");
    $(".read-more-contact-received-loading").css("display", "inline-block");
    setTimeout(() => {
      $.get(`/contact/read-more-contacts-recevied?skipNumber=${skipNumber}`, function (newContactRecived) {
        if (!newContactRecived.length) {
          alertify.notify("Bạn không còn danh sách nào để xem", "error", 7);
          $("#link-read-more-contact-recevied").css("display", "inline-block");
          $(".read-more-contact-received-loading").css("display", "none");
          return false;
        }
        newContactRecived.forEach(function (user) {
          $("#request-contact-received")
          .find("ul")
          .append(`
            <li class="_contactList" data-uid="${user._id}">
                                      <div class="contactPanel">
                                          <div class="user-avatar">
                                              <img src="./images/users/${user.avatar}" alt="">
                                          </div>
                                          <div class="user-name">
                                              <p>
                                              ${user.username}
                                              </p>
                                          </div>
                                          <br>
                                          <div class="user-address">
                                              <span>&nbsp ${user.address !== null ? user.address : ""}</span>
                                          </div>
                                          <div class="user-acccept-contact-received" data-uid="${user._id}">
                                              Chấp nhận
                                          </div>
                                          <div class="user-remove-request-contact-received action-danger"
                                              data-uid="${user._id}">
                                              Xóa yêu cầu
                                          </div>
                                      </div>
                                  </li>
            `)
        });
        removeRequestContactReceived();
        $("#link-read-more-contact-recevied").css("display", "inline-block");
        $(".read-more-contact-received-loading").css("display", "none");
      })
    }, 1000)
  })
});
