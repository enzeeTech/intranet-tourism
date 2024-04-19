import React from 'react';

function OnlinePerson({ name, imageUrl }) {
    return (
        <img
          loading="lazy"
          src={imageUrl}
          alt={name}
          className="shrink-0 w-11 aspect-[0.95]"
        />
    );
}

export default OnlinePerson;