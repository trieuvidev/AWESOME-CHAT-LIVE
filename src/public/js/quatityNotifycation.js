
function quantityAddNotifycation(className) {
  let currentValue = +$(`.${className}`).text();
  currentValue += 1;
  if (currentValue === 0) {
    $(`.${className}`).css("display", "none").html();
  }
  else {
    $(`.${className}`).css("display", "block").html(currentValue);
  }
};


function quantityRemoveReqNotifycation(className) {
  let currentValue = +$(`.${className}`).text();
  currentValue -= 1;
  if (currentValue === 0) {
    $(`.${className}`).css("display", "none").html();
  }
  else {
    $(`.${className}`).css("display", "block").html(currentValue);
  }
};
