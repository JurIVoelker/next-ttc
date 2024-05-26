import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentMannschaft extends Schema.Component {
  collectionName: 'components_content_mannschafts';
  info: {
    displayName: 'mannschaft';
    icon: 'emotionHappy';
  };
  attributes: {
    name: Attribute.String;
    bild: Attribute.Media;
  };
}

export interface ContentMannschaften extends Schema.Component {
  collectionName: 'components_content_mannschaftens';
  info: {
    displayName: 'mannschaften';
    icon: 'emotionHappy';
  };
  attributes: {
    name: Attribute.String;
    bild: Attribute.Media;
  };
}

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

export interface ContentTrainingszeit extends Schema.Component {
  collectionName: 'components_content_trainingszeits';
  info: {
    displayName: 'trainingszeit';
    icon: 'clock';
    description: '';
  };
  attributes: {
    wochentag: Attribute.Enumeration<
      [
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
        'Sonntag',
        'Feiertag'
      ]
    >;
    zeit: Attribute.String;
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
    icon: Attribute.Enumeration<['info', 'link']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.mannschaft': ContentMannschaft;
      'content.mannschaften': ContentMannschaften;
      'content.text-image-module': ContentTextImageModule;
      'content.trainingszeit': ContentTrainingszeit;
      'link.start-page-link': LinkStartPageLink;
      'tags.link': TagsLink;
    }
  }
}
