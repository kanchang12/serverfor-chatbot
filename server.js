const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  // This ensures you're parsing JSON data in the body of the request

app.post('/submit-to-zoho', async (req, res) => {
    try {
        console.log('Form data received:', req.body);

        // Prepare the form data
        const formData = new FormData();
        formData.append('First Name', req.body.firstName);
        formData.append('Last Name', req.body.lastName);
        formData.append('Email', req.body.email);
        formData.append('Message', req.body.message);

        // Make the POST request to Zoho with the correct headers
        const response = await axios.get(
            'https://forms.zohopublic.in/banglaygolpo1/form/ContactUs/formperma/tygGH6LFquRO7lGxeTjGLt7WjgEioGLQf2F6L6XKSPo',
            formData,
            { headers: formData.getHeaders() }  // This is important for correct submission
        );

        console.log('Zoho response:', response.data);
        res.json({ success: true, message: 'Form submitted successfully!' });

    } catch (error) {
        console.error('Error submitting form:', error.message);
        res.status(500).json({ success: false, message: 'Submission failed', error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
