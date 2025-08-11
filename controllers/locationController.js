const axios = require('axios');

exports.ReverseLocation = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                format: 'json',
                lat,
                lon,
                countrycodes: 'in',
                addressdetails: 1,
            },
            headers: {
                'User-Agent': 'LocalEventsFinder/1.0 (sufiturabhusssain@gmail.com)', // ✅ Update as needed
                'Accept-Language': 'en',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching reverse geocode:', error.message);
        res.status(500).json({ error: 'Failed to fetch address' });
    }
}


exports.ForwardLocation = async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: `${address} Bangalore`, // ✅ restrict to Bangalore
                format: 'json',
                addressdetails: 1,
                limit: 15, // only first result
                countrycodes: 'in', // restrict to India
            },
            headers: {
                'User-Agent': 'LocalEventsFinder/1.0 (sufiturabhusssain@gmail.com)', // ✅ Update as needed
                'Accept-Language': 'en',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(500).json({ error: 'Failed to fetch coordinates' });
    }
};