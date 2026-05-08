let money = 30000;
let releasedMovies = [];

let level = 1;
let xp = 0;
let xpNeeded = 100;

document.getElementById("money").innerText = money;

const genres = [
  { name: "Action", unlockLevel: 1 },
  { name: "Comedy", unlockLevel: 1 },
  { name: "Horror", unlockLevel: 1 },
  { name: "Drama", unlockLevel: 1 },
  { name: "Romance", unlockLevel: 2 },
  { name: "Sci-Fi", unlockLevel: 3 }
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3k98h6SlpaGuBXxJiB5P0BjMhiaaiSuT3A&s",
    unlockLevel: 2
  },
    {
    name: "Space Ship Set",
    cost: 300000,
    quality: 85,
    image: "https://www.peerspace.com/resources/wp-content/uploads/burbank-SCI-FI-spaceship-bunker-alien-futuristic-space-station-768x512.webp",
    unlockLevel: 3
  }
];

const actors = [
  {
    name: "Angelina Molie",
    acting: 85,
    popularity: 90,
    salary: 18000
  },
  {
    name: "Wayne 'the boulder' Johnson",
    acting: 70,
    popularity: 60,
    salary: 7000
  },
  {
    name: "Gal Gabot",
    acting: 20,
    popularity: 100,
    salary: 12000
  },
  {
    name: "Bendaya",
    acting: 77,
    popularity: 95,
    salary: 35000,
    unlockLevel: 2
  },
    {
    name: "Robert Uppey Sr.",
    acting: 87,
    popularity: 95,
    salary: 35000,
    unlockLevel: 3
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

/* ---------------- STUDIO ---------------- */

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

/* ---------------- RENDER FUNCTIONS ---------------- */

function renderGenres() {

  const genreList =
    document.getElementById("genreList");

  genreList.innerHTML = "";

  genres.forEach((genre) => {

    // LOCK CHECK
    if (genre.unlockLevel && level < genre.unlockLevel) return;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${genre.name}</h3>
    `;

    card.onclick = () => {

      document.querySelectorAll("#genreList .card")
        .forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");

      selectedGenre = genre.name;
    };

    genreList.appendChild(card);
  });
}

function renderLocations() {
  const locationList = document.getElementById("locationList");
  locationList.innerHTML = "";

  locations.forEach((location) => {

    if (location.unlockLevel && level < location.unlockLevel) return;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${location.image}">
      <h3>${location.name}</h3>
      <p>Cost: $${location.cost}</p>
      <p>Quality: ${location.quality}</p>
    `;

    card.onclick = () => {
      document.querySelectorAll("#locationList .card")
        .forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");
      selectedLocation = location;
    };

    locationList.appendChild(card);
  });
}

function renderActors() {
  const actorList = document.getElementById("actorList");
  actorList.innerHTML = "";

  actors.forEach((actor) => {

    if (actor.unlockLevel && level < actor.unlockLevel) return;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${actor.name}</h3>
      <p>Acting: ${actor.acting}</p>
      <p>Popularity: ${actor.popularity}</p>
      <p>Salary: $${actor.salary}</p>
    `;

    card.onclick = () => {
      document.querySelectorAll("#actorList .card")
        .forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");
      selectedActor = actor;
    };

    actorList.appendChild(card);
  });
}

function renderTrailers() {
  const trailerList = document.getElementById("trailerList");
  trailerList.innerHTML = "";

  trailers.forEach((trailer) => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${trailer.name}</h3>
      <p>Hype Boost: ${trailer.boost}</p>
    `;

    card.onclick = () => {
      document.querySelectorAll("#trailerList .card")
        .forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");
      selectedTrailer = trailer;
    };

    trailerList.appendChild(card);
  });
}

function renderMarketing() {
  const marketingList = document.getElementById("marketingList");
  marketingList.innerHTML = "";

  marketingOptions.forEach((marketing) => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${marketing.name}</h3>
      <p>Cost: $${marketing.cost}</p>
      <p>Reach Boost: ${marketing.boost}</p>
    `;

    card.onclick = () => {
      document.querySelectorAll("#marketingList .card")
        .forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");
      selectedMarketing = marketing;
    };

    marketingList.appendChild(card);
  });
}

/* ---------------- FILMING ---------------- */

function startFilming() {

  const movieTitle =
    document.getElementById("movieTitle").value;

  if (!movieTitle || !selectedGenre || !selectedLocation || !selectedActor || !selectedTrailer || !selectedMarketing) {
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

    document.getElementById("filmingText")
      .innerText =
        filmingTexts[Math.floor(Math.random() * filmingTexts.length)];

    if (progress >= 100) {
      clearInterval(interval);

      document.getElementById("filmingSection")
        .classList.add("hidden");

      releaseMovie(movieTitle);
    }

  }, 1000);
}

/* ---------------- RELEASE ---------------- */

function releaseMovie(movieTitle) {

  const score =
    selectedActor.acting +
    selectedActor.popularity +
    selectedLocation.quality +
    selectedTrailer.boost +
    selectedMarketing.boost +
    Math.floor(Math.random() * 50);

  const earnings = score * 1000;

  const criticReview = getCriticReview(score);

  money += earnings;
  updateMoney();

  gainXP(50);

  const movieData = {
    title: movieTitle,
    genre: selectedGenre,
    actor: selectedActor.name,
    location: selectedLocation.name,
    score: score,
    earnings: earnings,
    review: criticReview
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

    <p><strong>Critic Review:</strong></p>
    <p class="review-text">"${criticReview}"</p>

    <p>Box Office Earnings: $${earnings}</p>
    <p>New Budget: $${money}</p>
  `;
}

/* ---------------- CRITIC SYSTEM ---------------- */

function getCriticReview(score) {

  const pick = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  if (score >= 320) {
    return pick([
      "A masterpiece that defines a generation.",
      "Critics are calling it legendary.",
      "A breathtaking cinematic achievement.",
      "Instant classic. No notes.",
      "Oscar-worthy from start to finish."
    ]);
  }

  if (score >= 260) {
    return pick([
      "A strong, entertaining film with style.",
      "A crowd-pleaser with real heart.",
      "Very impressive and highly enjoyable.",
      "One of the better releases this year.",
      "Critics are mostly impressed."
    ]);
  }

  if (score >= 200) {
    return pick([
      "A decent film with some standout moments.",
      "Flawed but entertaining overall.",
      "Mixed reviews from critics.",
      "Has potential, but doesn’t fully land.",
      "A watchable but average release."
    ]);
  }

  return pick([
    "A disappointing and forgettable film.",
    "Critics are harsh on this release.",
    "A messy and unfocused production.",
    "Fails to live up to expectations.",
    "One of the weaker films this year."
  ]);
}

/* ---------------- HISTORY ---------------- */

function updateMovieHistory() {

  const history =
    document.getElementById("movieHistory");

  history.innerHTML = "";

  releasedMovies.forEach((movie) => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${movie.title}</h3>
      <p>Genre: ${movie.genre}</p>
      <p>Actor: ${movie.actor}</p>
      <p>Score: ${movie.score}</p>
      <p>Earnings: $${movie.earnings}</p>
    `;

    history.appendChild(card);
  });
}

/* ---------------- XP SYSTEM ---------------- */

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

  document.getElementById("level").innerText = level;

  document.getElementById("xpText").innerText =
    `${xp} / ${xpNeeded} XP`;

  document.getElementById("xpFill").style.width =
    (xp / xpNeeded) * 100 + "%";
}

function levelUp() {

  let unlocks = [];

  actors.forEach(a => {
    if (a.unlockLevel === level)
      unlocks.push(`⭐ New Actor: ${a.name}`);
  });

  locations.forEach(l => {
    if (l.unlockLevel === level)
      unlocks.push(`🎬 New Location: ${l.name}`);
  });

  document.getElementById("unlockContent").innerHTML =
    unlocks.join("<br><br>");

  document.getElementById("levelPopup")
    .classList.remove("hidden");

  refreshAllContent();
}

function closeLevelPopup() {
  document.getElementById("levelPopup")
    .classList.add("hidden");
}

/* ---------------- UTIL ---------------- */

function refreshAllContent() {
  renderGenres();
  renderLocations();
  renderActors();
  renderTrailers();
  renderMarketing();
}

function updateMoney() {
  document.getElementById("money").innerText = money;
}

/* INIT */

updateXPBar();

renderGenres();
renderLocations();
renderActors();
renderTrailers();
renderMarketing();
