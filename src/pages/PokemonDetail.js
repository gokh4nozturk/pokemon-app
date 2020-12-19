import React, { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTitle } from 'react-use';
import Moves from '../components/moves';
import Layout from '../components/layout';

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
          <figure>
            <img src={pokeImg} alt={detail.name} />
          </figure>

          <div className="detail-name">
            <div>
              <h1>{detail.name}</h1>
              Weight:
              <span> {detail.weight} gr</span>
              <br />
              Height:
              <span> {detail.height} cm</span>
            </div>
          </div>
        </div>

        <h1>MOVES</h1>

        <div className="moves-wrapper">
          {pokeMoves.map((move, index) => {
            return <Moves key={index} {...move} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
