function fetchData(id) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
    .then((response) => response.json())
    .then(renderData)
    .then(console.log);
}

function renderData(data) {
  const albumCover = document.getElementById("album-cover-img");
  const albumName = document.getElementById("album-name");
  const artistName = document.getElementById("artist-name");

  albumCover.src = data.cover;
  albumCover.style.height = "250px";
  albumName.innerText = data.title;
  artistName.innerText = data.artist.name;
  const songsContainer = document.getElementById("songs-container");
  data.tracks.data.map((track) => {
    songsContainer.innerHTML += `<div class="row m-0">
      <div
        class="col-1 d-none d-md-flex justify-content-center align-items-center"
      >
        <i class="fas fa-music text-muted"></i>

        <i class="fas fa-play play d-none"></i>
      </div>
      <div class="col-8">
        <p class="song">${track.title}
          <span class="text-muted"><br />${track.artist.name}</span>
        </p>
      </div>
      <div class="col-3">
        <p
          class="time d-flex justify-content-center align-items-center"
        >
          <span class="heart d-none"
            ><i class="far fa-heart p-2"></i
          ></span>
          <span class="text-muted p-2">${Math.floor(track.duration / 60)}:${
      track.duration - Math.floor(track.duration / 60) * 60
    }</span>
          <i class="fas fa-ellipsis-h p-2 d-none"></i>
        </p>
      </div>
    </div>`;
  });
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  let id = parseInt(params.get("id"));
  console.log("id", id);
  fetchData(id);
};
