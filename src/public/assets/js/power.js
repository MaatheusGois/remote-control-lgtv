/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const start = () => {
  console.log("connet");
  $("#wifi").hide();
  $("#load").show();
  fetch("http://localhost:6767/connect")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      if (response.success) {
        $("#load").hide();
        $("#wifi").show().attr("src", "./assets/img/on_wifi_button.png");
      } else {
        $("#load").hide();
        $("#wifi").show();
        swal(
          "Wifi Error!",
          "Make sure you are connected to the same tv wifi",
          "error"
        );
      }
    });
};

const initial = () => {
  $(".click-button").click(function () {
    $(this).fadeOut(30);
    $(this).fadeIn(30);
  });
};

initial();