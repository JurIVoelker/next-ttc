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
    location: Attribute.String;
    tags: Attribute.Text;
    date: Attribute.String;
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

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
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
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'tags.link': TagsLink;
    }
  }
}
