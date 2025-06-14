import type {StructureResolver} from 'sanity/structure'
import {
  singletonDocumentListItem,
  singletonDocumentListItems,
} from 'sanity-plugin-singleton-tools';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Donna Sofì')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('navigation').title('Menu Navigation'),
      S.divider(),
      S.documentTypeListItem('dishesMenu').title('Restaurant Menu'),
      S.documentTypeListItem('locations').title('Locations'),
      S.divider(),
      ...singletonDocumentListItems({ S, context }),
      singletonDocumentListItem({
        S,
        context,
        type: 'socials',
        title: 'Socials',
        id: 'socials',
      }),
      singletonDocumentListItem({
        S,
        context,
        type: 'copyright',
        title: 'Footer Copyright',
        id: 'copyright',
      }),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['page', 'navigation', 'dishesMenu', 'locations', 'socials', 'copyright'].includes(item.getId()!),
      ),
    ])
