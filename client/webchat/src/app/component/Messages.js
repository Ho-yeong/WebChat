import React from 'react';

export const Messages = ({ messages }) => {
  return (
    <>
      {messages &&
        messages.map((message) => (
          <p key={message.id}>
            <strong>
              {message.sender}: {message.body}
            </strong>
          </p>
        ))}
    </>
  );
};
