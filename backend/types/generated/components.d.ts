import type { Schema, Struct } from '@strapi/strapi';

export interface SharedApplicationFee extends Struct.ComponentSchema {
  collectionName: 'components_shared_application_fees';
  info: {
    displayName: 'Application Fee';
  };
  attributes: {
    female_transgender: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    general_obc_ews: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    offline_payment: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Through E-Challan'>;
    online_payment: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Online Fee Payment Options: Credit Card, Debit Card, and Net Banking'>;
    sc_st_pwd: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Answer: Schema.Attribute.String;
    Question: Schema.Attribute.String;
  };
}

export interface SharedImportantDates extends Struct.ComponentSchema {
  collectionName: 'components_shared_important_dates';
  info: {
    displayName: 'Important Dates';
  };
  attributes: {
    admit_card: Schema.Attribute.Date;
    apply_online_end_date: Schema.Attribute.Date;
    apply_online_start_date: Schema.Attribute.Date;
    correction_date: Schema.Attribute.Date;
    exam_date: Schema.Attribute.Date;
    fee_payment_last_date: Schema.Attribute.Date;
    result_date: Schema.Attribute.Date;
    vacancy_notification_date: Schema.Attribute.Date;
  };
}

export interface SharedLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_items';
  info: {
    displayName: 'Important Links';
    icon: 'bulletList';
  };
  attributes: {
    Label: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    tags: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.application-fee': SharedApplicationFee;
      'shared.faq': SharedFaq;
      'shared.important-dates': SharedImportantDates;
      'shared.link-item': SharedLinkItem;
      'shared.seo': SharedSeo;
    }
  }
}
