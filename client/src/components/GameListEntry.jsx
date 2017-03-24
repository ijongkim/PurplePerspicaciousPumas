import React from 'react';

const GameListEntry = (props) => (
  <li onClick={() => props.onClick(props.name)}>{props.name}</li>
)


export default GameListEntry;