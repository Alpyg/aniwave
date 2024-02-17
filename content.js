const URL = "https://aniwave.to/ajax/watch2gether/create";
const WEBHOOK = "";

function encodePayload(payload) {
  return Object.entries(payload)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

async function createRoom() {
  const aniwave_payload = {
    name: 'KawaiiBebi',
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
    body: encodePayload(aniwave_payload),
  });

  if (res.ok) {
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'AniWave',
        content: '',
        embeds: [
          {
            type: 'rich',
            title: document.querySelector('.name').innerHTML,
            description: document.querySelector('.meta > span:first-child').innerHTML,
            color: 0x5a2e98,
            image: {
              url: document.querySelector('.poster img').getAttribute('src'),
              height: 0,
              width: 0,
            },
            url: res.url,
          },
        ],
      }),
    });

    window.location.href = res.url;
    history.pushState({}, '', res.url);
  }
}

createRoom();
