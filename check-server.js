const axios = require('axios');

async function checkServer() {
  console.log('Checking if backend server is running at http://localhost:5000...');
  
  try {
    const response = await axios.get('http://localhost:5000/api/health', {
      timeout: 5000
    });
    console.log('✅ Server is running successfully!');
    console.log('Response:', response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Connection refused. The backend server is not running.');
      console.log('Please start your backend server on port 5000.');
    } else if (error.code === 'ENOTFOUND') {
      console.log('❌ Server not found. Please check if the backend server is running.');
    } else if (error.code === 'ECONNABORTED') {
      console.log('❌ Connection timeout. The server might be running but not responding.');
    } else {
      console.log('❌ Server check failed:', error.message);
      console.log('Error code:', error.code);
    }
    console.log('\nTo fix this issue:');
    console.log('1. Make sure you have the AgriSmart backend server running');
    console.log('2. Check that it is running on port 5000');
    console.log('3. Verify that the server has a health check endpoint at /api/health');
  }
}

checkServer();