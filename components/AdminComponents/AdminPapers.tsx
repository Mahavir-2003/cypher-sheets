import React from 'react'

const AdminPapers = () => {

  async function fetchFiles() {
    try {
      const response = await fetch('/api/admin/get');
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      console.log(data.files);
      // Process the files data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>AdminPapers</div>
  )
}

export default AdminPapers