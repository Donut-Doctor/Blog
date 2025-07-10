import React from 'react';

function HelpPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Help & FAQs</h2>
      <ul>
        <li><b>How to register?</b> Click "Register" from the top menu and fill in your details.</li>
        <li><b>How to create a post?</b> Log in and click "Create Post" on the homepage.</li>
        <li><b>Who can edit/delete posts?</b> Only the author of the post.</li>
      </ul>
    </div>
  );
}

export default HelpPage;
