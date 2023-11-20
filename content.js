const URL = "https://aniwave.to/ajax/watch2gether/create";
const WEBHOOK = "";

function encodePayload(payload) {
  return Object.entries(payload)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

async function createRoom() {
  const payload = {
    name: "KawaiiBebi",
    episode_id: document.querySelector('input[name="episode_id"]').value,
    start_mode: document.querySelector('input[name="start_mode"]').value,
    start_date_timezone: document.querySelector(
      'input[name="start_date_timezone"]',
    ).value,
    is_public: 0,
  };

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodePayload(payload),
  });

  if (res.ok) {
    sendUrl(res.url);
  }
}

async function sendUrl(url) {
  fetch(`${WEBHOOK}?url=${url}`)
    .then((res) => {
      if (res.status == 200) {
        window.location.href = url;
        history.pushState({}, "", url);
      } else {
        console.log("Aniwave error: ", res);
        setTimeout(sendUrl(url), 100);
      }
    })
    .catch((err) => {
      console.error("Aniwave error: ", err);
      setTimeout(sendUrl(url), 100);
    });
}

createRoom();
