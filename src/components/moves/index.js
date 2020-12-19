import Axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import Move from './Move';

import './styles/movesStyle.less';

const Moves = ({ move, version_group_details }) => {
  const [moveDetail, setMoveDetail] = useState([]);
  const [moveType, setMoveType] = useState();
  const id = move.url.split('/').slice(-2, -1);

  const fetchMove = useCallback(async () => {
    const data = await Axios.get(`https://pokeapi.co/api/v2/move/${id}`).then(
      (res) => res.data
    );
    setMoveType(data.type.name);
    setMoveDetail(data);
  }, [id]);

  useEffect(() => {
    fetchMove();
  }, []);
  return (
    <div className="moves-container">
      <p>{move.name}</p>
      <Move {...moveDetail} type={moveType} />
    </div>
  );
};

export default Moves;
