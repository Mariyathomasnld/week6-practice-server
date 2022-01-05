"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          userId: 1,
          title: "My time at Codaisseur",
          description: "A tell all tale",
          backgroundColor: "#ABE01A",
          color: "#EDEDEE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "I am a dummy",
          description: "My story",
          backgroundColor: "#E01A1A",
          color: "#EDEDED",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 2,
          title: "I am a 2nd dummy",
          description: "My 2nd story",
          backgroundColor: "#1A45E0",
          color: "#EDEDEF",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
