import React from 'react';

function ContactMap() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        title="Yellow Pages Chennai Branch Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.214251542878!2d80.25598101482395!3d13.060394716377045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52663f6ae4b4f3%3A0x202bbdc6d44742f!2sAnna%20Salai%2C%20Chennai%2C%20Tamil%20Nadu%20600006!5e0!3m2!1sen!2sin!4v1655703911706!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default ContactMap;
