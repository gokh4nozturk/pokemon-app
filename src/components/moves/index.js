import React, { useCallback, useState, useEffect } from 'react';
import Axios from 'axios';
import Move from './Move';

import './styles/movesStyle.less';

const Moves = ({ move }) => {
  const [moveDetail, setMoveDetail] = useState({});
  const [moveType, setMoveType] = useState();
  const id = move.url.split('/').slice(-2, -1)[0];

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
      <p>{moveDetail.name}</p>
      <Move key={moveDetail.id} {...moveDetail} type={moveType} />
    </div>
  );
};

export default Moves;
