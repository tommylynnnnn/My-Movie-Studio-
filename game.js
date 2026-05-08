let money = 30000;

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
    name: "New York",
    cost: 8000,
    quality: 75,
    image: "https://picsum.photos/300/200?1"
  },
  {
    name: "Haunted Mansion",
    cost: 12000,
    quality: 95,
    image: "https://picsum.photos/300/200?2"
  },
  {
    name: "Beach Resort",
    cost: 6000,
    quality: 60,
    image: "https://picsum.photos/300/200?3"
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
  const genreList = document.getElementById("genreList");

  genres.forEach((genre) => {
    const card = document.createElement("div");

    card.className = "card";
    card.innerHTML = `<h3>${genre}</h3>`;

    card.onclick = () => {
      document.querySelectorAll("#genreList .card")
        .forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");
      selectedGenre = genre;
    };

    genreList.appendChild(card);
  });
}

function renderLocations() {
  const locationList = document.getElementById("locationList");

  locations.forEach((location) => {
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

  actors.forEach((actor) => {
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

function startFilming() {

  const movieTitle = document.getElementById("movieTitle").value;

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

  document.getElementById("resultsSection")
    .classList.remove("hidden");

  document.getElementById("results").innerHTML = `
    <h3>${movieTitle}</h3>

    <p>Genre: ${selectedGenre}</p>

    <p>Movie Score: ${score}</p>

    <p>Box Office Earnings: $${earnings}</p>

    <p>New Budget: $${money}</p>
  `;
}

function updateMoney() {
  document.getElementById("money").innerText = money;
}

renderGenres();
renderLocations();
renderActors();
renderTrailers();
renderMarketing();
