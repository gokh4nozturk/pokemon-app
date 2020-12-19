import React from 'react';

import './styles/moveStyles.less';

const Move = ({ accuracy, power, pp, type }) => {
  const myAccuracy = accuracy ? accuracy : 100;
  const myPower = power ? power : 100;
  const myPp = pp ? pp : 100;

  return (
    <div className="move-wrapper">
      <div>
        <span className="move-titles">Power: </span>
        <span className="move-titles-value"> {myPower}</span>
      </div>
      <div>
        <span className="move-titles">Acc: </span>
        <span className="move-titles-value"> {myAccuracy} %</span>
      </div>
      <div className="progress-bar">
        <div
          style={{
            width: `${myAccuracy}%`
          }}
        ></div>
      </div>
      <div>
        <span className="move-titles">PP: </span>
        <span className="move-titles-value"> {myPp}</span>
      </div>
      <div className="move-type-container">
        <span className="move-titles-value move-type">{type}</span>
      </div>
    </div>
  );
};
export default Move;
