import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Moves from '../components/moves';
import Layout from '../components/layout';
import { useTitle } from 'react-use';
import uniqid from 'uniqid';

import './style/detailStyles.less';

const PokemonDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [pokeMoves, setPokeMoves] = useState([]);
  const [pokeImg, setPokeImg] = useState(''); // for can not access in detail
  const [pokeName, setPokeName] = useState(''); // for title

  useTitle(pokeName.toUpperCase());

  const fetchPokeDetail = useCallback(async () => {
    const data = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).then((res) => res.data);

    setPokeMoves(data.moves);
    setDetail(data);
    setPokeImg(data.sprites.front_default);
    setPokeName(data.name);
  }, [id]);

  useEffect(() => {
    fetchPokeDetail();
  }, []);

  return (
    <Layout>
      <div className="detail-container">
        <div className="detail-poke">
          <div className="detail-img">
            <img src={pokeImg} alt={detail.name} />
          </div>
          <div className="detail-name">
            <div>
              <h1>{detail.name}</h1>
              <span className="weight-height">Weight:</span>
              <span> {detail.weight} gr</span>
              <br />
              <span className="weight-height">Height:</span>
              <span> {detail.height} cm</span>
            </div>
          </div>
        </div>
        <h1>MOVES</h1>
        <div className="moves-wrapper">
          {pokeMoves.map((move) => {
            return <Moves key={uniqid()} {...move} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
