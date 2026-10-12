<<<<<<< HEAD
const repositoryList = document.querySelector("#repositories");
const repositoryCount = document.querySelector("#repository-count");

function formatDate(date) {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository-item";

  const link = document.createElement("a");
  link.className = "repository-name";
=======
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
>>>>>>> add-starred-list
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = repository.name;
<<<<<<< HEAD

  const owner = document.createElement("span");
  owner.className = "repository-owner";
  owner.textContent = ` / ${repository.owner}`;
=======
  title.append(link);
>>>>>>> add-starred-list

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

<<<<<<< HEAD
  const stars = document.createElement("span");
  stars.className = "repository-stars";
  stars.setAttribute("aria-label", `${repository.stars.toLocaleString("es")} estrellas`);
  stars.textContent = `★ ${repository.stars.toLocaleString("es")}`;

  const meta = document.createElement("div");
  meta.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const starredAt = document.createElement("time");
  starredAt.dateTime = repository.starredAt;
  starredAt.textContent = `Marcado el ${formatDate(repository.starredAt)}`;

  meta.append(language, starredAt);
  item.append(link, owner, description, stars, meta);
=======
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
>>>>>>> add-starred-list
  return item;
}

async function loadRepositories() {
  try {
<<<<<<< HEAD
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`No se pudieron cargar los datos (${response.status})`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(renderRepository));
    repositoryCount.textContent = `${repositories.length} repositorios`;

    if (repositories.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.className = "status-message";
      emptyMessage.textContent = "Todavía no hay repositorios en esta colección.";
      repositoryList.append(emptyMessage);
    }
  } catch (error) {
    repositoryCount.textContent = "No disponible";
    const errorMessage = document.createElement("li");
    errorMessage.className = "status-message";
    errorMessage.textContent = "No se pudo cargar la lista. Inténtalo de nuevo más tarde.";
    repositoryList.replaceChildren(errorMessage);
    console.error(error);
=======
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
>>>>>>> add-starred-list
  }
}

loadRepositories();