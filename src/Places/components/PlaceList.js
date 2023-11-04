import React from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

const PlaceList = (props) => {
  if (props.item.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2> No Items to Display</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.item.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          createrID={place.createrID}
          coordinates={place.coordinates}
          onDelete={props.onDeleteCallback}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
