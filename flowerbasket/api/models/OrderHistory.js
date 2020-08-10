module.exports = {
  attributes: {
    id: {
      columnName: "orderId",
      type: "Number",
      required: true,
      columnType: "int",
    },
    comboId: {
      columnName: "flowerBaseketId",
      type: "Number",
      required: true,
      columnType: "int",
    },
    flowerName: {
      columnName: "flowerName",
      type: "string",
      required: true,
    },
    basketName: {
      columnName: "basketName",
      type: "string",
      required: true,
    },
    orderDate: {
      columnName: "orderDate",
      type: "string",
      columnType: "datetime",
    },
    price: {
      columnName: "price",
      type: "Number",
      columnType: "int",
    },
    username: {
      columnName: "username",
      type: "string",
      required: true,
    },
    status: {
      columnName: "status",
      type: "string",
      required: true,
    },
  },
  tableName: "orderHistory",
};
