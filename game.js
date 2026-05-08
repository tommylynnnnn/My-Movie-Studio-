let money = 30000;
let releasedMovies = [];

let level = 1;
let xp = 0;
let xpNeeded = 100;

document.getElementById("money").innerText = money;

const genres = [
  "Action",
  "Comedy",
  "Horror",
  "Drama",
  "Romance",
  "Sci-Fi"
];

const locations = [
  {
    name: "The Woods",
    cost: 8000,
    quality: 75,
    image: "https://images.squarespace-cdn.com/content/v1/505b9dd1e4b0dfa31206df7c/1441839752971-8U1Y590S24QABIWVEI9M/image-asset.jpeg"
  },

  {
    name: "City",
    cost: 12000,
    quality: 95,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQByU--nRQd6IlgBoBKfFo61d-ljaKimZ9_gQ&s"
  },

  {
    name: "Green Screen",
    cost: 6000,
    quality: 60,
    image: "https://sparksarts.co.uk/wp-content/uploads/2023/10/Green-Screen.jpg"
  },

  {
    name: "Ancient Castle",
    cost: 25000,
    quality: 98,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a",
    unlockLevel: 2
  }
];

const actors = [
  {
    name: "Scarlett Vale",
    acting: 95,
    popularity: 90,
    salary: 18000
  },

  {
    name: "Tommy Blaze",
    acting: 70,
    popularity: 60,
    salary: 7000
  },

  {
    name: "Emily Stone",
    acting: 85,
    popularity: 80,
    salary: 12000
  },

  {
    name: "Johnny Nova",
    acting: 98,
    popularity: 95,
    salary: 35000,
    unlockLevel: 2
  }
];

const trailers = [
  {
    name: "Long and Dramatic",
    boost: 15
  },

  {
    name: "Fast and Exciting",
    boost: 20
  },

  {
    name: "Slow and Emotional",
    boost: 10
  }
];

const marketingOptions = [
  {
    name: "TV Advertisements",
    cost: 10000,
    boost: 25
  },

  {
    name: "Billboards",
    cost: 5000,
    boost: 10
  },

  {
    name: "Social Media",
    cost: 3000,
    boost: 8
  }
];

let selectedGenre = null;
let selectedLocation = null;
let selectedActor = null;
let selectedTrailer = null;
let selectedMarketing = null;

function createStudio() {

  const name =
    document.getElementById("studioInput").value;

  if (name.trim() === "") {

    alert("Please enter a studio name!");
    return;
  }

  document.getElementById("studioName")
    .innerText = name;

  document.getElementById("studioPopup")
    .style.display = "none";
}

function renderGenres() {

  const genreList =
    document.getElementById("genreList");

  genreList.innerHTML = "";

  genres.forEach((genre) => {

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>${genre}</h3>
    `;

    card.onclick = () => {

      document.querySelectorAll("#genreList .card")
        .forEach(c =>
          c.classList.remove("selected")
        );

      card.classList.add("selected");

      selectedGenre = genre;
    };

    genreList.appendChild(card);

  });
}

function renderLocations() {

  const locationList =
    document.getElementById("locationList");

  locationList.innerHTML = "";

  locations.forEach((location) => {

    if (
      location.unlockLevel &&
      level < location.unlockLevel
    ) return;

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${location.image}">

      <h3>${location.name}</h3>

      <p>Cost: $${location.cost}</p>

      <p>Quality: ${location.quality}</p>
    `;

    card.onclick = () => {

      document.querySelectorAll("#locationList .card")
        .forEach(c =>
          c.classList.remove("selected")
        );

      card.classList.add("selected");

      selectedLocation = location;
    };

    locationList.appendChild(card);

  });
}

function renderActors() {

  const actorList =
    document.getElementById("actorList");

  actorList.innerHTML = "";

  actors.forEach((actor) => {

    if (
      actor.unlockLevel &&
      level < actor.unlockLevel
    ) return;

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>${actor.name}</h3>

      <p>Acting: ${actor.acting}</p>

      <p>Popularity: ${actor.popularity}</p>

      <p>Salary: $${actor.salary}</p>
    `;

    card.onclick = () => {

      document.querySelectorAll("#actorList .card")
        .forEach(c =>
          c.classList.remove("selected")
        );

      card.classList.add("selected");

      selectedActor = actor;
    };

    actorList.appendChild(card);

  });
}

function renderTrailers() {

  const trailerList =
    document.getElementById("trailerList");

  trailerList.innerHTML = "";

  trailers.forEach((trailer) => {

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>${trailer.name}</h3>

      <p>Hype Boost: ${trailer.boost}</p>
    `;

    card.onclick = () => {

      document.querySelectorAll("#trailerList .card")
        .forEach(c =>
          c.classList.remove("selected")
        );

      card.classList.add("selected");

      selectedTrailer = trailer;
    };

    trailerList.appendChild(card);

  });
}

function renderMarketing() {

  const marketingList =
    document.getElementById("marketingList");

  marketingList.innerHTML = "";

  marketingOptions.forEach((marketing) => {

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>${marketing.name}</h3>

      <p>Cost: $${marketing.cost}</p>

      <p>Reach Boost: ${marketing.boost}</p>
    `;

    card.onclick = () => {

      document.querySelectorAll("#marketingList .card")
        .forEach(c =>
          c.classList.remove("selected")
        );

      card.classList.add("selected");

      selectedMarketing = marketing;
    };

    marketingList.appendChild(card);

  });
}

function startFilming() {

  const movieTitle =
    document.getElementById("movieTitle").value;

  if (
    !movieTitle ||
    !selectedGenre ||
    !selectedLocation ||
    !selectedActor ||
    !selectedTrailer ||
    !selectedMarketing
  ) {

    alert("Please complete all movie options!");
    return;
  }

  const totalCost =
    selectedLocation.cost +
    selectedActor.salary +
    selectedMarketing.cost;

  if (money < totalCost) {

    alert("Not enough money!");
    return;
  }

  money -= totalCost;

  updateMoney();

  document.getElementById("filmingSection")
    .classList.remove("hidden");

  let progress = 0;

  document.getElementById("progressFill")
    .style.width = "0%";

  const filmingTexts = [
    "Building sets...",
    "Actors rehearsing...",
    "Filming action scenes...",
    "Recording dramatic moments...",
    "Editing footage...",
    "Finalizing movie..."
  ];

  const interval = setInterval(() => {

    progress += 10;

    document.getElementById("progressFill")
      .style.width = progress + "%";

    const randomText =
      filmingTexts[
        Math.floor(Math.random() * filmingTexts.length)
      ];

    document.getElementById("filmingText")
      .innerText = randomText;

    if (progress >= 100) {

      clearInterval(interval);

      document.getElementById("filmingSection")
        .classList.add("hidden");

      releaseMovie(movieTitle);
    }

  }, 1000);
}

function releaseMovie(movieTitle) {

  const score =
    selectedActor.acting +
    selectedActor.popularity +
    selectedLocation.quality +
    selectedTrailer.boost +
    selectedMarketing.boost +
    Math.floor(Math.random() * 50);

  const earnings = score * 1000;

  money += earnings;

  updateMoney();

  gainXP(50);

  const movieData = {
    title: movieTitle,
    genre: selectedGenre,
    actor: selectedActor.name,
    location: selectedLocation.name,
    score: score,
    earnings: earnings
  };

  releasedMovies.push(movieData);

  updateMovieHistory();

  document.getElementById("resultsSection")
    .classList.remove("hidden");

  document.getElementById("results").innerHTML = `
    <h3>${movieTitle}</h3>

    <p>Genre: ${selectedGenre}</p>

    <p>Lead Actor: ${selectedActor.name}</p>

    <p>Filming Location: ${selectedLocation.name}</p>

    <p>Movie Score: ${score}</p>

    <p>Box Office Earnings: $${earnings}</p>

    <p>New Budget: $${money}</p>
  `;
}

function updateMovieHistory() {

  const history =
    document.getElementById("movieHistory");

  history.innerHTML = "";

  releasedMovies.forEach((movie) => {

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>${movie.title}</h3>

      <p>Genre: ${movie.genre}</p>

      <p>Actor: ${movie.actor}</p>

      <p>Location: ${movie.location}</p>

      <p>Score: ${movie.score}</p>

      <p>Earnings: $${movie.earnings}</p>
    `;

    history.appendChild(card);

  });
}

function gainXP(amount) {

  xp += amount;

  if (xp >= xpNeeded) {

    xp -= xpNeeded;

    level++;

    xpNeeded += 50;

    levelUp();
  }

  updateXPBar();
}

function updateXPBar() {

  document.getElementById("level")
    .innerText = level;

  document.getElementById("xpText")
    .innerText =
      `${xp} / ${xpNeeded} XP`;

  const percent =
    (xp / xpNeeded) * 100;

  document.getElementById("xpFill")
    .style.width = percent + "%";
}

function levelUp() {

  let unlocks = [];

  actors.forEach(actor => {

    if (actor.unlockLevel === level) {

      unlocks.push(
        `⭐ New Actor: ${actor.name}`
      );
    }

  });

  locations.forEach(location => {

    if (location.unlockLevel === level) {

      unlocks.push(
        `🎬 New Location: ${location.name}`
      );
    }

  });

  document.getElementById("unlockContent")
    .innerHTML =
      unlocks.join("<br><br>");

  document.getElementById("levelPopup")
    .classList.remove("hidden");

  refreshAllContent();
}

function closeLevelPopup() {

  document.getElementById("levelPopup")
    .classList.add("hidden");
}

function refreshAllContent() {

  renderGenres();
  renderLocations();
  renderActors();
  renderTrailers();
  renderMarketing();
}

function updateMoney() {

  document.getElementById("money")
    .innerText = money;
}

updateXPBar();

renderGenres();
renderLocations();
renderActors();
renderTrailers();
renderMarketing();
