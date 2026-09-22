import { getCategoryLabel } from './helpers.js';

export function availableCategoriesList(projects, lang) {
  const used = new Set(projects.map(project => project.category));
  const categoryKeys = {
    web: 'cat.web',
    mobile: 'cat.mobile',
    desktop: 'cat.desktop',
    ai: 'cat.ai',
    game: 'cat.game',
    backend: 'cat.backend',
    devops: 'cat.devops'
  };

  const categories = Object.keys(categoryKeys)
    .filter(category => used.has(category))
    .map(category => ({
      value: category,
      label: getCategoryLabel(lang, category)
    }));

  const customCategories = [...used]
    .filter(category => !categoryKeys[category] && category !== 'other')
    .map(category => ({ value: category, label: category }));

  return [...categories, ...customCategories];
}

export function availableTechList(projects) {
  const technologies = new Set();
  projects.forEach(project => {
    (project.tech || []).forEach(technology => technologies.add(technology));
  });
  return [...technologies].sort();
}

export function availablePeopleTechList(users) {
  const technologies = new Set();
  users
    .filter(user => user.available === true)
    .forEach(user => (user.skills || []).forEach(skill => technologies.add(skill)));
  return [...technologies].sort();
}
