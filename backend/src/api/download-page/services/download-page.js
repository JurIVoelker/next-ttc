'use strict';

/**
 * download-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::download-page.download-page');
