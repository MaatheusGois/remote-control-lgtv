const send = async (command, payload) => {
  const body = JSON.stringify({
    command,
    payload,
  });

  try {
    const res = await fetch("http://localhost:6767/mouse", {
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

const click = async () => {
  const answer = await send("click");
  console.log(answer);
};

const mouseInit = () => {
  $("#buttons").hide();
  $("#mouse").show();
};

const reads = () => {
  var isDragging = false;
  var mouseDown = false;

  $("#board")
    .mousedown(() => {
      isDragging = false;
      mouseDown = true;
    })
    .mousemove(function (e) {
      isDragging = true;
      if (isDragging && mouseDown) {
        var x_position = e.pageX;
        var y_position = e.pageY;

        const center_y = $(this).position().top + $(this).height() / 2;
        const center_x = $(this).position().left + $(this).width() / 2;

        var payload = {
          dx: (x_position - center_x) / 8,
          dy: (y_position - center_y) / 8,
          drag: 0,
        };
        send("move", payload);
      }
    })
    .mouseup(() => {
      var wasDragging = isDragging;
      isDragging = false;
      mouseDown = false;
      if (!wasDragging) {
        click();
      }
    });
};

reads();
