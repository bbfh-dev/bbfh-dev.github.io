const replaysNode = document.querySelector("#replays");
const templateReplay = document.querySelector("#template-replay");

/**
 * @property {File} file
 * @property {string} filename
 * @property {string} name
 * @property {string} playlist
 * @property {string} mode
 * @property {{orange: number, blue: number}} result
 * @property {number} matchLength
 * @property {Object.<string, number>} scoresOrange
 * @property {Object.<string, number>} scoresBlue
 * @property {Date} timestamp
 */
class Replay {
  file;
  filename;
  name;
  playlist;
  mode;
  result;
  matchLength;
  scoresOrange;
  scoresBlue;
  timestamp;
}

const replay = new Replay();
replay.file = null;
replay.filename = "4d5a9dad-282f-43e5-afc1-5b43c402fcb6.replay";
replay.name = "2025-03-06.20.20 bbfh. Ranked Doubles Loss";
replay.playlist = "Ranked";
replay.mode = "2v2";
replay.result = { orange: 4, blue: 3 };
replay.matchLength = 4 * 60 + 15;
replay.scoresBlue = {
  "bbfh.": 405,
  "HvK Viper.": 226,
};
replay.scoresOrange = {
  GhostlyVinc: 533,
  "User-b46ef4b3d6": 401,
};
replay.timestamp = new Date();

/** {Replay[]} */
const REPLAYS = [replay, replay];

/** @param {FileList} fileList */
function onUpload(fileList) {
  if (fileList.length == 0) {
    return;
  }

  for (const file of fileList) {
    console.log(file);
  }

  refreshReplays();
}

const display = {
  /** @param {Date} date */
  getDisplayDate(date) {
    return moment(date, "YYYY-MM-DD").fromNow();
  },
};

function refreshReplays() {
  replaysNode.innerHTML = "";

  if (REPLAYS.length === 0) {
    replaysNode.innerHTML = "<span>Empty</span>";
  }

  for (const replay of REPLAYS) {
    const row = templateReplay.content.cloneNode(true);

    row.querySelectorAll("[data-insert]").forEach((node) => {
      let value = replay[node.dataset.insert];
      if (node.dataset.call) {
        value = display[node.dataset.call](value);
      }
      node.innerHTML = value;
    });

    if (replay.file) {
      const buttonNode = row.querySelector(".download-replay");
      buttonNode.download = replay.file.name;
      buttonNode.href = URL.createObjectURL(replay.file);
    }

    replaysNode.appendChild(row);
  }
}

refreshReplays();
