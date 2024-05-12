import type { Schema, Attribute } from '@strapi/strapi';

export interface LinkStartPageLink extends Schema.Component {
  collectionName: 'components_link_start_page_links';
  info: {
    displayName: 'startPageLink';
    icon: 'link';
    description: '';
  };
  attributes: {
    titel: Attribute.String;
    beschreibung: Attribute.Text;
    route: Attribute.String;
    vorschauBild: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'link.start-page-link': LinkStartPageLink;
    }
  }
}
