const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1/travlr';

const migratePrices = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB.');

        const db = mongoose.connection.db;
        const trips = db.collection('trips');

        const stringPrices = await trips.find({
            perPerson: { $type: 'string' }
        }).toArray();

        console.log(`Found ${stringPrices.length} trip(s) with string prices.`);

        for (const trip of stringPrices) {
            const numericPrice = Number(
                trip.perPerson.replace('$', '').replace(/,/g, '')
            );

            if (Number.isNaN(numericPrice)) {
                console.log(
                    `Skipped ${trip.code}: invalid price "${trip.perPerson}".`
                );
                continue;
            }

            await trips.updateOne(
                { _id: trip._id },
                { $set: { perPerson: numericPrice } }
            );

            console.log(
                `Updated ${trip.code}: ${trip.perPerson} -> ${numericPrice}`
            );
        }

        console.log('Price migration complete.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await mongoose.disconnect();
    }
};

migratePrices();