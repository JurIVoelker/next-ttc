'use strict';

/**
 * start-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::start-page.start-page');
