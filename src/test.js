var lgtv = require("./lgtv")({
  url: "ws://lgwebostv:3000",
});

lgtv.on("error", function (err) {
  console.log(err);
});

// lgtv.connect("ws://192.168.1.252:3000");

lgtv.on("connect", function () {
  console.log("connected");
  const comand = "system/turnOn";
  lgtv.request(`ssap://${comand}` , function (err, res) {
    console.log(err, res);
    lgtv.disconnect();
  });
});
