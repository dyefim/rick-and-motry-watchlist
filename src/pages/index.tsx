import Episodes from './Episodes';

const PAGES = {
  episodes: <Episodes />,
};

export type PageType = keyof typeof PAGES;

export const pageNames = Object.keys(PAGES) as PageType[];

export default PAGES;
