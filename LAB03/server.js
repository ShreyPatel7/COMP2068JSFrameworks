// Importing the Connect module for creating a server
const connect = require('connect'); 
// Importing the URL module for parsing URLs
const url = require('url'); 

// Function to handle incoming requests from the URL
function calculate(req, res) {
    
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query; 
    console.log('Query parameters:', query);
    
    // Extracting method, x, and y parameters from the query
    const method = query.method; 
    // First number for calculation
    const x = parseFloat(query.x); 
    // Second number for calculation
    const y = parseFloat(query.y);

    // Checking if required parameters are missing or invalid
    if (!method || isNaN(x) || isNaN(y)) {
        // If any required parameter is missing or not a number, send an error response
        res.end('Invalid parameters provided');
        return;
    }

    let finalResult;

    // Performing the appropriate math operation based on the 'method' parameter
    switch(method) {
        case 'add':
            finalResult = x + y; // Adding x and y
            break;
        case 'subtract':
            finalResult = x - y; // Subtracting y from x
            break;
        case 'multiply':
            finalResult = x * y; // Multiplying x and y
            break;
        case 'divide':
            finalResult = x / y; // Dividing x by y
            break;
        default:
            // If the 'method' parameter is not one of the specified values, sending an error message
            res.end(`Invalid method: ${method}`);
            return;
    }

    // Sending the result as a response
    res.end(`${x} ${method} ${y} = ${finalResult}`);
}

// Creating a server instance
const app = connect();

// Attaching the calculate function to handle incoming requests
app.use(calculate);

// Starting the server and listening on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});