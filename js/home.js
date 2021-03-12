const headers = {
    "x-rapidapi-key": "74a8e76fbamshe2a8991c5162cf0p18ff5ajsn4ac24c69ec4a",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  };
  window.onload = function () {
    console.log("loaded")
    getTracklist()
    searchInput()
    // getFetchTracks("184432862")
    
    // searchInput()
    let heartOutline = document.querySelector(".loved-track .far.fa-heart");
    let heartFilled = document.querySelector(".loved-track .fas.fa-heart");
    heartFilled.addEventListener("click", function () {
      if (!heartFilled.classList.contains("active")) {
        heartFilled.classList.toggle("active");
        heartFilled.style.opacity = 1;
        heartOutline.style.opacity = 0;
      } else {
        heartFilled.classList.toggle("active");
        heartFilled.style.opacity = 0;
        heartOutline.style.opacity = 1;
      }
    });
  
    let muted = document.querySelector(".player-volume .fas.fa-volume-mute");
    let volMax = document.querySelector(".player-volume .fas.fa-volume-up");
    let vol = document.getElementById("nowplayingVolume");
    muted.addEventListener("click", function () {
      if (!muted.classList.contains("active")) {
        console.log("going mute");
        muted.classList.toggle("active");
        muted.style.opacity = 1;
        volMax.style.opacity = 0;
        vol.style.width = "0%";
      } else {
        muted.classList.toggle("active");
        muted.style.opacity = 0;
        volMax.style.opacity = 1;
        vol.style.width = "100%";
      }
    });
  
    let cardHeartOutline = document.querySelectorAll(".overlay-icons .heart");
    for (let i = 0; i < cardHeartOutline.length; i++) {
      cardHeartOutline[i].addEventListener("click", function () {
        if (cardHeartOutline[i].classList.contains("far")) {
          cardHeartOutline[i].classList.toggle("fas");
        } else {
          cardHeartOutline[i].classList.toggle("far");
        }
      });
    }
    // M3-D2
  
    const search = (q) => {
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${q}`, {
        method: "GET",
        headers,
      })
        .then((response) => (response.ok ? response.json() : ""))
        .then((data) => listAlbums(data))
        .catch((err) => {
          console.error(err);
        });
    };
  
    const addArtist = (name) => {
      let myTab = document.getElementById("myTab");
      let artist = document.createElement("li");
      artist.innerHTML = `<li class="nav-item d-none d-md-flex" role="presentation">
                          <a
                            class="nav-link"
                            id="discover-tab"
                            data-toggle="tab"
                            href="#discover"
                            role="tab"
                            aria-controls="discover"
                            aria-selected="false"
                            data-target="#homepage-headings"
                            data-slide-to="2"
                            >${name}
                          </a>
                        </li>`;
      artist.setAttribute("name", `${name}`);
      artist.addEventListener("click", function (name) {
        console.log("clicked");
        search(artist.innerText);
      });
      myTab.appendChild(artist);
    };
  
    // addArtist("EMINEM");
    // // addArtist("METALLICA");
    // // addArtist("BEHEMOTH");
    // addArtist("SHEENA RINGO");
    const listAlbums = (data) => {
      console.log(data);
      let header = document.querySelectorAll(".row.no-gutters.d-flex");
      let newContent = document.createElement("div");
      data.data.forEach((data) => {
        let card = `<div class="trending card p-0 col-12 col-md-3 col-lg-2">
                          <img
                            class="card-img-top img-fluid"
                            src="${data.album.cover_medium}"
                            alt="${data.album.title}"
                          />
                          <i class="spotify-card-icon fab fa-spotify"></i>
                          <span class="overlay-icons"
                            ><i class="heart far fa-heart fa-sm mr-3"></i
                            ><i class="play fas fa-play fa-1x mr-3"></i
                            ><i class="fa fa-ellipsis-h fa-sm"></i>
                          </span>
                          <div>
                            <h6 label="${data.title}">${data.artist.name}</h6>
                          </div>
                        </div>`;
        newContent.innerHTML += card;
      });
      header[0].innerHTML = newContent.innerHTML;
    };
  
    // const listAlbumsTitle = function () {
    //   let covers = document.querySelectorAll(".trending.card");
    //   let arr = [];
    //   covers.forEach((covers) => arr.push(covers.firstElementChild.alt));
    //   return arr;
    // };
    // const listBtn = document.getElementById("listAlbums");
    // listBtn.addEventListener("click", function () {
    //   console.log(listAlbumsTitle());
    // });
  
    const countUnique = function () {
      let covers = document.querySelectorAll(".trending.card");
      let obj = {};
      for (i = 0; i < covers.length; i++) {
        let l = covers[i].firstElementChild.src;
        obj[l] = isNaN(obj[l]) ? 1 : obj[l] + 1;
      }
      return Object.keys(obj).length;
    };
  
    const countBtn = document.getElementById("countUnique");
    countBtn.addEventListener("click", function () {
      console.log(countUnique());
    });
  };
  