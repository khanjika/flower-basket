/**
 * FlowerBasket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      columnName: 'flowerBaseketId',
      type: 'Number',
      required: true,
      columnType: 'int'
    },
    flowerName: {
      columnName: 'flowerName',
      type: 'string',
      required: true
    },
    basketName: {
      columnName: 'basketName',
      type: 'string',
      required: true
    },
    details: {
      columnName: 'details',
      type: 'string',
      columnType: 'varchar'
    },
    price: {
      columnName: 'price',
      type: 'Number',
      columnType: 'int'
    },
    flowerImageUrl: {
      columnName: 'flowerImageUrl',
      type: 'string',
      columnType: 'varchar'
    },
    basketImageUrl: {
      columnName: 'basketImageUrl',
      type: 'string',
      columnType: 'varchar'
    }
  },
  tableName: 'flowerBasket'
};
