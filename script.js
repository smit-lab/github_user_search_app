const PRINT_USER_IMAGE = document.querySelector("#user_image");
const PRINT_USERNAME = document.querySelector("#user_full_name");
const PRINT_USER_ID = document.querySelector("#user_id");
const PRINT_USER_JOIN_DATE = document.querySelector("#user_join_date");
const PRINT_USER_BIO = document.querySelector("#user_bio");
const PRINT_USER_REPO_COUNT = document.querySelector("#user_repo_count");
const PRINT_USER_FOLLOWERS_COUNT = document.querySelector(
  "#user_followers_count"
);
const PRINT_USER_FOLLOWING_COUNT = document.querySelector(
  "#user_following_count"
);
const PRINT_USER_ADDRESS = document.querySelector("#user_address");
const PRINT_USER_TWITTER = document.querySelector("#user_twitter");
const PRINT_USER_BLOG = document.querySelector("#user_blog");
const PRINT_USER_COMPANY = document.querySelector("#user_company");
const USER_FORM = document.querySelector("#user_form");
const PRINT_ERROR_RESULT = document.querySelector("#error_result");

// fetching data
document.addEventListener("DOMContentLoaded", () => {
  const USER_INPUT = document.querySelector("#user_input");
  const DEFAULT_USERNAME = "google";

  // Set the default value for the input field
  USER_INPUT.value = DEFAULT_USERNAME;

  // Fetch data when the page loads with the default username
  const GITHUB_URL = `https://api.github.com/users/${DEFAULT_USERNAME}`;
  fetchData(GITHUB_URL);
});

USER_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const USER_INPUT_NAME = document.querySelector("#user_input").value.trim();
  const GITHUB_URL = `https://api.github.com/users/${
    USER_INPUT_NAME === null ? "google" : USER_INPUT_NAME
  }`;
  fetchData(GITHUB_URL);
});

async function fetchData(giturl) {
  const GITHUB_TOKEN = "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";
  const headers = new Headers({ Authorization: `Bearer ${GITHUB_TOKEN}` });
  const SET_TIME = performance.now();
  try {
    const response = await fetch(giturl, { headers });
    console.log("Response status:", response.status);
    if (response.status === 404) {
      // User not found, handle accordingly
      console.error(`User not found for ${url}`);
      PRINT_ERROR_RESULT.textContent = "No results";
      return; // Exit the function to prevent further execution
    }
    if (!response.ok) {
      throw new Error(`HTTP response error: ${response.status}`);
    }
    const DATA = await response.json();
    const END_TIME = performance.now();
    const TIME_TAKEN = END_TIME - SET_TIME;
    console.log(`Time taken to fetch data: ${TIME_TAKEN} ms`);
    // console.log(DATA);
    printData(DATA);
  } catch (error) {
    console.log("Error:", error);
  }
}

function printData(data) {
  const AVATAR_URL = data.avatar_url;
  const RESIZED_AVATAR = AVATAR_URL.replace("v=4", "s=117");

  PRINT_USER_IMAGE.setAttribute("src", RESIZED_AVATAR);
  PRINT_USERNAME.textContent = data.name;
  PRINT_USER_ID.textContent = `@${data.login}`;
  PRINT_USER_JOIN_DATE.textContent = new Date(
    data.created_at
  ).toLocaleDateString();

  PRINT_USER_BIO.textContent =
    data.bio === null ? `${data.name} has no bio` : data.bio;
  PRINT_USER_REPO_COUNT.textContent = data.public_repos;
  PRINT_USER_FOLLOWERS_COUNT.textContent = data.followers;
  PRINT_USER_FOLLOWING_COUNT.textContent = data.following;

  PRINT_USER_TWITTER.textContent =
    data.twitter_username === null ? "Not available" : data.twitter_username;

  PRINT_USER_ADDRESS.textContent =
    data.location === null ? "Not available" : data.location;

  PRINT_USER_BLOG.textContent = !data.blog ? "Not available" : data.blog;
  PRINT_USER_COMPANY.textContent =
    data.company === null ? "Not available" : data.company;
}
