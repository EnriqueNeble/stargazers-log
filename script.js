const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC"
  }).format(new Date(`${dateString}T00:00:00Z`));
}

function createRepositoryItem(event) {
  const { repository, starredAt } = event;
  const item = document.createElement("li");
  item.className = "repository-item";

  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = repository.name;
  title.append(link);

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const details = document.createElement("div");
  details.className = "repository-details";

  const language = document.createElement("span");
  language.textContent = repository.language || "Language not specified";
  details.append(language);

  const stars = document.createElement("span");
  stars.textContent = `${new Intl.NumberFormat("en").format(repository.stars)} stars`;
  details.append(stars);

  const date = document.createElement("time");
  date.dateTime = starredAt;
  date.textContent = `Starred ${formatDate(starredAt)}`;
  details.append(date);

  item.append(title, description, details);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const events = await response.json();
    const starredRepositories = events.filter((event) => event.type === "starred");
    repositoryList.replaceChildren(...starredRepositories.map(createRepositoryItem));
    repositoryCount.textContent = `${starredRepositories.length} repositories`;
  } catch {
    const message = document.createElement("li");
    message.className = "list-message list-message--error";
    message.textContent = "Repositories could not be loaded. Please try again later.";
    repositoryList.replaceChildren(message);
    repositoryCount.textContent = "";
  } finally {
    repositoryList.setAttribute("aria-busy", "false");
  }
}

loadRepositories();