import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentTextImageModule extends Schema.Component {
  collectionName: 'components_content_text_image_modules';
  info: {
    displayName: 'textImageModule';
    icon: 'cube';
    description: '';
  };
  attributes: {
    titel: Attribute.String;
    text: Attribute.Text;
    bild: Attribute.Media;
    tags: Attribute.Component<'tags.link', true>;
  };
}

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

export interface TagsLink extends Schema.Component {
  collectionName: 'components_tags_links';
  info: {
    displayName: 'link';
    icon: 'earth';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    url: Attribute.String;
    icon: Attribute.Relation<'tags.link', 'oneToOne', 'api::icon.icon'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.text-image-module': ContentTextImageModule;
      'link.start-page-link': LinkStartPageLink;
      'tags.link': TagsLink;
    }
  }
}
