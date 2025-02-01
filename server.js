const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit-to-zoho', async (req, res) => {
    try {
        const formData = new FormData();
        formData.append('First Name', req.body.firstName);
        formData.append('Last Name', req.body.lastName);
        formData.append('Email', req.body.email);
        formData.append('Message', req.body.message);

        const response = await axios.post(
            'https://forms.zohopublic.in/banglaygolpo1/form/ContactUs/formperma/tygGH6LFquRO7lGxeTjGLt7WjgEioGLQf2F6L6XKSPo',
            formData,
            { headers: formData.getHeaders() }
        );

        res.json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting form:', error.message);
        res.status(500).json({ success: false, message: 'Submission failed', error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
