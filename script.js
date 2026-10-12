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
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = repository.name;

  const owner = document.createElement("span");
  owner.className = "repository-owner";
  owner.textContent = ` / ${repository.owner}`;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

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
  return item;
}

async function loadRepositories() {
  try {
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
  }
}

loadRepositories();