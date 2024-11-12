import React from 'react';

function Error({ error, ...props }: { error: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`flex items-center text-red-800 ${props.className || ''}`}>
      <small>{error}</small>
    </div>
  );
}

export default Error;
