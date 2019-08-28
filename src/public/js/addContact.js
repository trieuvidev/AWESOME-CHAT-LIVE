
function quantityAddContactNotify(className) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue += 1;
  if (currentValue === 0) {
    $(`.${className}`).html(null);
  }
  else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }
};

// function addContact được gọi sau khi ajax trả về cả thẻ li bạn bè . Vì thế nên không thể gọi hàm chạm ở file này
function addContact() {
  $(".user-add-new-contact").bind("click", function () {
    let targetId = $(this).data("uid"); // lấy uid tại tata-uid html
    console.log(targetId);
    // tạo bảng ghi contact
    $.post("/contact/add-new", { uid: targetId }, function (data) {
      if (data.success) {
        $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).hide();
        $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).css("display", "inline-block");
        quantityAddContactNotify("count-request-contact-sent");
      }
    })
  });
};