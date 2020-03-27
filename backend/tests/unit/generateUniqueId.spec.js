const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    // Explicação sobre teste
    it('should generate an unique ID', () => {
        const id = generateUniqueId();
        
        // Realiza o teste através de uma API (Expect) 
        // referenciada pelo Jest
        expect(id).toHaveLength(8);
    });
    
});