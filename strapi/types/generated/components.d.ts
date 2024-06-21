import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentEvent extends Schema.Component {
  collectionName: 'components_content_events';
  info: {
    displayName: 'event';
    icon: 'question';
    description: '';
  };
  attributes: {
    titel: Attribute.String;
    inhalt: Attribute.Blocks;
    image: Attribute.Media;
  };
}

export interface ContentFile extends Schema.Component {
  collectionName: 'components_content_files';
  info: {
    displayName: 'file';
    icon: 'archive';
    description: '';
  };
  attributes: {
    datei: Attribute.Media;
    name: Attribute.String;
  };
}

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

export interface ContentTrainer extends Schema.Component {
  collectionName: 'components_content_trainers';
  info: {
    displayName: 'trainer';
    icon: 'user';
  };
  attributes: {
    name: Attribute.String;
    bild: Attribute.Media;
    geburtsDatum: Attribute.Date;
    trainerSeit: Attribute.Date;
    vereinsfunktion: Attribute.String;
    mannschaft: Attribute.String;
    staerkenTrainer: Attribute.String;
    staerkenSpieler: Attribute.String;
    motivation: Attribute.String;
    aufschlagtraining: Attribute.String;
    fairness: Attribute.String;
    ttKeinSport: Attribute.String;
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

export interface LinkLink extends Schema.Component {
  collectionName: 'components_link_links';
  info: {
    displayName: 'link';
    icon: 'attachment';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
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
      'content.event': ContentEvent;
      'content.file': ContentFile;
      'content.mannschaft': ContentMannschaft;
      'content.mannschaften': ContentMannschaften;
      'content.text-image-module': ContentTextImageModule;
      'content.trainer': ContentTrainer;
      'content.trainingszeit': ContentTrainingszeit;
      'link.link': LinkLink;
      'link.start-page-link': LinkStartPageLink;
      'tags.link': TagsLink;
    }
  }
}
