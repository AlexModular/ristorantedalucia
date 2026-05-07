import type {StructureResolver} from 'sanity/structure'
import {
  singletonDocumentListItem,
} from 'sanity-plugin-singleton-tools';
import { MdOutlineArticle } from 'react-icons/md';
import { GiShop } from 'react-icons/gi';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Ristorante Da Lucia')
    .items([
      // ─── Pages ────────────────────────────────────────────────────────────
      S.documentTypeListItem('page').title('Pagine'),
      S.documentTypeListItem('navigation').title('Menu Navigazione'),
      S.divider(),

      // ─── Restaurant content ───────────────────────────────────────────────
      S.documentTypeListItem('dishesMenu').title('Menù del Ristorante'),
      S.documentTypeListItem('locations').title('Locations').icon(GiShop),
      S.divider(),

      // ─── News & Events ────────────────────────────────────────────────────
      S.documentTypeListItem('post').title('News & Events').icon(MdOutlineArticle),
      S.divider(),

      // ─── Singletons ───────────────────────────────────────────────────────
      singletonDocumentListItem({
        S,
        context,
        type: 'socials',
        title: 'Social Media',
        id: 'socials',
      }),
      singletonDocumentListItem({
        S,
        context,
        type: 'copyright',
        title: 'Footer Copyright',
        id: 'copyright',
      }),
      singletonDocumentListItem({
        S,
        context,
        type: 'settings',
        title: 'Impostazioni',
        id: 'settings',
      }),

      // ─── Remaining types (auto-discovered) ───────────────────────────────
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![
          'page',
          'navigation',
          'dishesMenu',
          'locations',
          'post',
          'socials',
          'copyright',
          'settings',
        ].includes(item.getId()!),
      ),
    ])
