// utils/slugify.ts
export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')          // Заміна пробілів на дефіси
    .replace(/[^\w\-]+/g, '')       // Видалення всіх неалфавітних символів
    .replace(/\-\-+/g, '-')         // Заміна послідовних дефісів на один
    .replace(/^-+/, '')             // Видалення дефісів на початку рядка
    .replace(/-+$/, '');            // Видалення дефісів в кінці рядка
};
