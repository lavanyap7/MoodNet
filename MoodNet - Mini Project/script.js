document.addEventListener("DOMContentLoaded", function () {
  const shareBtn = document.getElementById("shareBtn");
  const postText = document.querySelector(".post-creation-box textarea");
  const moodSelect = document.getElementById("moodSelect");
  const moodButtons = document.querySelectorAll('.mood-btn');
  //   CREATE NEW POST 
  shareBtn.addEventListener("click", () => {
    const text = postText.value.trim();
    let mood = moodSelect.value.toLowerCase();

    if (!text || mood === "select mood") {
      alert("Please enter text and select a mood.");
      return;
    }
    // Capitalize mood tag
    const moodTag = mood.charAt(0).toUpperCase() + mood.slice(1);
    // Create post
    const article = document.createElement("article");
    article.className = `post ${mood}`;

    article.innerHTML = `
      <div class="post-header">
        <img src="./assets/profile pic.jpg" class="avatar" alt="User Avatar">
        <div class="post-info">
          <strong>@AuraLavni</strong> posted 
          <span class="mood-tag ${mood}">${moodTag}</span>
          <span class="timestamp">Just now</span>
        </div>
      </div>

      <p class="post-content">${text}</p>

      <div class="post-footer">
        <button class="action-btn">Like ♡</button>
        <button class="action-btn">Comment 💬</button>
        <button class="action-btn">Share ➤</button>
      </div>
    `;

    // Insert new post on top
    const creationBox = document.querySelector(".post-creation-box");
    creationBox.insertAdjacentElement("afterend", article);

    // Reset inputs
    postText.value = "";
    moodSelect.value = "select mood";
  });

  //   MOOD FILTER
  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {

      const mood = btn.getAttribute('data-mood');

      // Get latest posts (important so new posts are included)
      const posts = document.querySelectorAll('.post');

      // Toggle OFF if active
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        posts.forEach(post => post.style.display = "block");
        return;
      }

      // Remove active from all buttons
      moodButtons.forEach(b => b.classList.remove('active'));

      // Activate clicked one
      btn.classList.add('active');

      // Show only matching posts
      posts.forEach(post => {
        post.style.display = post.classList.contains(mood)
          ? "block"
          : "none";
      });
    });
  });

});
