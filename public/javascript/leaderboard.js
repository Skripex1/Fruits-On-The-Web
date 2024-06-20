document.addEventListener("DOMContentLoaded", () => {
  fetchLeaderboard();
});

async function fetchLeaderboard() {
  try {
    const response = await fetch("/api/leaderboard");
    const data = await response.json();

    console.log("API Response:", data);

    if (response.ok && Array.isArray(data)) {
      updateLeaderboard(data);
    } else {
      console.error("Failed to fetch leaderboard data:", data);
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
}

function updateLeaderboard(users) {
  const leaderboardTable = document.querySelector(".leaderboard-table");

  const rows = leaderboardTable.querySelectorAll(
    ".leaderboard-row:not(.header)"
  );
  rows.forEach((row) => row.remove());

  users.forEach((user, index) => {
    const row = document.createElement("div");
    row.classList.add("leaderboard-row");
    if (index === 0) row.classList.add("gold");
    else if (index === 1) row.classList.add("silver");
    else if (index === 2) row.classList.add("bronze");

    const rankCell = document.createElement("div");
    rankCell.classList.add("leaderboard-cell");
    rankCell.textContent = index + 1;

    const nameCell = document.createElement("div");
    nameCell.classList.add("leaderboard-cell");
    nameCell.textContent = user.username;

    const scoreCell = document.createElement("div");
    scoreCell.classList.add("leaderboard-cell");
    scoreCell.textContent = user.highestScore;

    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    leaderboardTable.appendChild(row);
  });
}
