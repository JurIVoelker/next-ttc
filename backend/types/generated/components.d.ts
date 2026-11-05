import type { Schema, Struct } from '@strapi/strapi';

export interface ContentEvent extends Struct.ComponentSchema {
  collectionName: 'components_content_events';
  info: {
    description: '';
    displayName: 'event';
    icon: 'question';
  };
  attributes: {
    date: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    inhalt: Schema.Attribute.Blocks;
    location: Schema.Attribute.String;
    tags: Schema.Attribute.Text;
    titel: Schema.Attribute.String;
  };
}

export interface ContentFile extends Struct.ComponentSchema {
  collectionName: 'components_content_files';
  info: {
    description: '';
    displayName: 'file';
    icon: 'archive';
  };
  attributes: {
    datei: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface ContentMannschaft extends Struct.ComponentSchema {
  collectionName: 'components_content_mannschafts';
  info: {
    displayName: 'mannschaft';
    icon: 'emotionHappy';
  };
  attributes: {
    bild: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface ContentMannschaften extends Struct.ComponentSchema {
  collectionName: 'components_content_mannschaftens';
  info: {
    displayName: 'mannschaften';
    icon: 'emotionHappy';
  };
  attributes: {
    bild: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface ContentMitgliederBeitraege extends Struct.ComponentSchema {
  collectionName: 'components_content_mitglieder_beitraeges';
  info: {
    displayName: 'mitgliederBeitr\u00E4ge';
    icon: 'check';
  };
  attributes: {
    costs: Schema.Attribute.String;
    group: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface ContentSponsor extends Struct.ComponentSchema {
  collectionName: 'components_content_sponsors';
  info: {
    displayName: 'sponsor';
  };
  attributes: {
    name: Schema.Attribute.String;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ContentTextImageModule extends Struct.ComponentSchema {
  collectionName: 'components_content_text_image_modules';
  info: {
    description: '';
    displayName: 'textImageModule';
    icon: 'cube';
  };
  attributes: {
    bild: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tags: Schema.Attribute.Component<'tags.link', true>;
    text: Schema.Attribute.Text;
    titel: Schema.Attribute.String;
  };
}

export interface ContentTrainer extends Struct.ComponentSchema {
  collectionName: 'components_content_trainers';
  info: {
    description: '';
    displayName: 'trainer';
    icon: 'user';
  };
  attributes: {
    bild: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    fairness: Schema.Attribute.String;
    geburtsDatum: Schema.Attribute.Date;
    mannschaft: Schema.Attribute.String;
    motivation: Schema.Attribute.String;
    name: Schema.Attribute.String;
    staerkenSpieler: Schema.Attribute.String;
    staerkenTrainer: Schema.Attribute.String;
    trainerSeit: Schema.Attribute.Date;
    ttKeinSport: Schema.Attribute.String;
    vereinsfunktion: Schema.Attribute.String;
  };
}

export interface ContentTrainingszeit extends Struct.ComponentSchema {
  collectionName: 'components_content_trainingszeits';
  info: {
    description: '';
    displayName: 'trainingszeit';
    icon: 'clock';
  };
  attributes: {
    wochentag: Schema.Attribute.Enumeration<
      [
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
        'Sonntag',
        'Feiertag',
      ]
    >;
    zeit: Schema.Attribute.String;
  };
}

export interface LinkLink extends Struct.ComponentSchema {
  collectionName: 'components_link_links';
  info: {
    description: '';
    displayName: 'link';
    icon: 'attachment';
  };
  attributes: {
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface LinkStartPageLink extends Struct.ComponentSchema {
  collectionName: 'components_link_start_page_links';
  info: {
    description: '';
    displayName: 'startPageLink';
    icon: 'link';
  };
  attributes: {
    beschreibung: Schema.Attribute.Text;
    route: Schema.Attribute.String;
    titel: Schema.Attribute.String;
    vorschauBild: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface TagsLink extends Struct.ComponentSchema {
  collectionName: 'components_tags_links';
  info: {
    description: '';
    displayName: 'link';
    icon: 'earth';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<['info', 'link']>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'content.event': ContentEvent;
      'content.file': ContentFile;
      'content.mannschaft': ContentMannschaft;
      'content.mannschaften': ContentMannschaften;
      'content.mitglieder-beitraege': ContentMitgliederBeitraege;
      'content.sponsor': ContentSponsor;
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
