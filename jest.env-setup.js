const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env.test') });

console.log('✅ .env.test loaded for Jest');

jest.mock('@prisma/client', () => {
    const originalModule = jest.requireActual('@prisma/client');
    return {
        ...originalModule,
        Role: {
            CUSTOMER: 'CUSTOMER',
            ADMIN: 'ADMIN',
            DRIVER: 'DRIVER',
        },
    };
});
