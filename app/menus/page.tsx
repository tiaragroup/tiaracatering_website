import { notFound } from "next/navigation";

// The English menus page is unpublished (TG-1132/TG-1133) while only /ar/menus is live, so
// this route deliberately renders the 404 shell. It carries no metadata of its own: a
// canonical/hreflang/"index, follow" block here would invite Google to index a 404. The
// previous metadata and the `<MenuPage lang="en" />` render live in git (aaed356^) for
// whenever the page comes back.
export default function MenusPage() {
  notFound();
}
