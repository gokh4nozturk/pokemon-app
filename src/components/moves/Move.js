import React from 'react';

import './styles/moveStyles.less';

const Move = ({ accuracy, power, pp, type }) => {
  const myAccuracy = accuracy ? accuracy : 100;
  const myPower = power ? power : 100;
  const myPp = pp ? pp : 100;

  return (
    <div className="move-wrapper">
      <div>
        Power:
        <span> {myPower}</span>
      </div>
      <div>
        Acc:
        <span> {myAccuracy} %</span>
      </div>
      <div className="progress-bar">
        <div
          style={{
            width: `${myAccuracy}%`
          }}
        ></div>
      </div>
      <div>
        PP:
        <span> {myPp}</span>
      </div>
      <div className="move-type-container">
        <span>{type}</span>
      </div>
    </div>
  );
};
export default Move;
