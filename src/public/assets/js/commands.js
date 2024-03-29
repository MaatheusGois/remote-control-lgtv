/* eslint-disable no-unused-vars */
const isConnected = async () => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:6767/isConnected");
    const response_1 = await response.json();
    resolve(response_1.success);
    if (response_1.success) { 
      $("#wifi").attr("src", "./assets/img/on_wifi_button.png");
      return 
    }
    swal(
      "Opps...",
      "Clique no ícone de rede acima para iniciar a conexão."
    );
  });
};
var mute = false;
const channel = async (command, value) => {
  if (!(await isConnected())) {
    return;
  }
  const body = JSON.stringify({
    command,
    value,
  });

  try {
    const res = await fetch("http://localhost:6767/channel", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.error(error);
  }
};

const button = (command) => {
  // if (!await isConnected()) { return }
  fetch(`http://localhost:6767/button/${command}`).then(function (response) {
    return response.json();
  });
  // .then(function (json) {
  //   console.log(json);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};

const muteButton = () => {
  mute = !mute;
  channel("ssap://audio/setMute", { mute });
};

const channelID = (id) => {
  channel("ssap://system.launcher/launch", { id });
};

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key].toUpperCase();
    var y = b[key].toUpperCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

const apps = async () => {
  if (!(await isConnected())) {
    return;
  }
  const command = "ssap://com.webos.applicationManager/listLaunchPoints";
  $("#buttons").hide();
  $("#load-full").show();
  const res = await channel(command);

  if (!res.success) {
    $("#buttons").show();
    $("#load-full").hide();
    return;
  }
  const items = res.message.launchPoints;
  if (!items) {
    $("#buttons").show();
    $("#load-full").hide();
    return;
  }
  sortByKey(items, "title");
  $("#list").empty();
  for (let i = 0; i < items.length; i++) {
    const title = items[i].title;
    const id = items[i].id;
    const cell = `<a onclick="channelID('${id}')"> 
                    <div class="row click-button">
                        <div class="txt">${title}</div>
                        <img src="./assets/img/next_button.png" alt="" width="52" height="42">
                    </div>
                </a>`;
    $("#list").append(cell);
  }
  $("#load-full").hide();
  $("#app-list").show();
};

const inputs = async () => {
  if (!(await isConnected())) {
    return;
  }
  const command = "ssap://tv/getExternalInputList";
  $("#buttons").hide();
  $("#load-full").show();
  const res = await channel(command);

  if (!res.success) {
    $("#buttons").show();
    $("#load-full").hide();
    return;
  }

  const items = res.message.devices;

  if (!items) {
    $("#buttons").show();
    $("#load-full").hide();
    return;
  }

  $("#list").empty();
  for (let i = 0; i < items.length; i++) {
    const label = items[i].label;
    const appId = items[i].appId;
    const cell = `<a onclick="channelID('${appId}')"> 
                    <div class="row click-button">
                        <div class="txt">${label}</div>
                        <img src="./assets/img/next_button.png" alt="" width="52" height="42">
                    </div>
                </a>`;
    $("#list").append(cell);
  }
  $("#load-full").hide();
  $("#app-list").show();
};

const returnButton = () => {
  $("#load-full").hide();
  $("#app-list").hide();
  $("#mouse").hide();
  $("#buttons").show();
};

const notImplemented = () => {
  console.log("not implemented");
};
