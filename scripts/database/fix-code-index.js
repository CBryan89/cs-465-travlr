const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1/travlr';

const fixCodeIndex = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB.');

        const db = mongoose.connection.db;
        const trips = db.collection('trips');

        console.log('Dropping existing code_1 index...');
        await trips.dropIndex('code_1');

        console.log('Creating unique code_1 index...');
        await trips.createIndex(
            { code: 1 },
            {
                name: 'code_1',
                unique: true
            }
        );

        console.log('Unique trip code index created successfully.');
    } catch (err) {
        console.error('Index update failed:', err);
    } finally {
        await mongoose.disconnect();
    }
};

fixCodeIndex();
