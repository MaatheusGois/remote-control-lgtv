var lgtv = require("./lgtv")({
  url: "ws://lgwebostv:3000",
});

lgtv.on("error", function (err) {
  console.log(err);
});

lgtv.on("connect", function () {
  console.log("connected");
  const comand = "com.webos.applicationManager/listLaunchPoints";
  lgtv.request(`ssap://${comand}`, function (err, res) {
    console.log(err, res);
    lgtv.disconnect();
  });
});
