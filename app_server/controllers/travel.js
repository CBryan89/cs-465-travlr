/* GET travel view */

const travel = async (req, res) => {
    const url = 'http://localhost:3000/api/trips';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const trips = await response.json();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips
        });
    } catch (error) {
        console.error(error.message);

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: []
        });
    }
};

module.exports = {
    travel
};