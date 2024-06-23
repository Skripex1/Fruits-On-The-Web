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

document.getElementById("fetch-rss").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/leaderboard");
    const data = await response.json();

    if (response.ok && Array.isArray(data)) {
      const rssFeed = generateRSSFeed(data);
      console.log(rssFeed);

      const blob = new Blob([rssFeed], { type: "application/rss+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leaderboard.xml";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error("Failed to fetch leaderboard data:", data);
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
});

function generateRSSFeed(users) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Leaderboard</title>
    <link>http://localhost:3000/leaderboard</link>
    <description>Latest leaderboard scores</description>
    ${users
      .map(
        (user) => `
    <item>
      <title>${user.username} - ${user.highestScore}</title>
      <description>${user.username} scored ${user.highestScore}</description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;
}
