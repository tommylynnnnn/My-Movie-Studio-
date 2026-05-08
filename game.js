let money = 30000;
let releasedMovies = [];

let level = 1;
let xp = 0;
let xpNeeded = 100;

/* ---------------- FRANCHISE SYSTEM ---------------- */

let franchises = [];
let selectedFranchise = null;

document.getElementById("money").innerText = money;

/* ---------------- DATA ---------------- */

const genres = [
  { name: "Action", unlockLevel: 1 },
  { name: "Comedy", unlockLevel: 1 },
  { name: "Horror", unlockLevel: 1 },
  { name: "Drama", unlockLevel: 1 },
  { name: "Romance", unlockLevel: 2 },
  { name: "Sci-Fi", unlockLevel: 3 }
];

/* (everything else stays the same — actors, locations, etc.) */
/* I’m keeping your original data unchanged for clarity */

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

  let earnings = score * 1000;

  if (score < 180) {
    earnings = -Math.floor(5000 + Math.random() * 10000);
  }

  const criticReview = getCriticReview(score);

  /* ---------------- FRANCHISE LOGIC ---------------- */

  let franchiseBonus = 1;
  let franchiseName = "Standalone";

  if (selectedFranchise !== null) {

    const f = franchises[selectedFranchise];

    f.movies.push(movieTitle);
    f.totalScore += score;

    franchiseBonus = 1 + (f.totalScore / f.movies.length) / 500;

    franchiseName = f.name;

  } else {

    // auto-create franchise if movie is successful
    if (score >= 220) {

      const newFranchise = {
        name: movieTitle,
        movies: [movieTitle],
        totalScore: score
      };

      franchises.push(newFranchise);

      franchiseName = movieTitle;
    }
  }

  earnings = Math.floor(earnings * franchiseBonus);

  /* ---------------- ECONOMY ---------------- */

  money += earnings;
  updateMoney();

  gainXP(50);

  releasedMovies.push({
    title: movieTitle,
    genre: selectedGenre,
    actor: selectedActor.name,
    location: selectedLocation.name,
    score: score,
    earnings: earnings,
    review: criticReview,
    franchise: franchiseName
  });

  updateMovieHistory();

  document.getElementById("resultsSection")
    .classList.remove("hidden");

  document.getElementById("results").innerHTML = `
    <h3>${movieTitle}</h3>

    <p>Franchise: ${franchiseName}</p>

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
      <p>Franchise: ${movie.franchise}</p>
      <p>Genre: ${movie.genre}</p>
      <p>Score: ${movie.score}</p>
      <p>Earnings: $${movie.earnings}</p>
    `;

    history.appendChild(card);
  });
}

/* ---------------- FRANCHISE HELPERS ---------------- */

function selectFranchise(index) {
  selectedFranchise = index;
}

/* ---------------- EVERYTHING ELSE UNCHANGED ---------------- */

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

/* ---------------- XP SYSTEM (UNCHANGED) ---------------- */

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
