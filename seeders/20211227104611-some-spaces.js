'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('spaces', [

      {
        title: "My time at Codaisseur",
        description: "A tell all tale",
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        title: "I am a dummy",
        backgroundColor: "#40C076",
        color: "#EDEDED",
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
     
    
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('spaces', null, {});
     
  }
};
