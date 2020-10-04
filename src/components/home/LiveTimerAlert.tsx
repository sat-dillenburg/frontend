import React, { useEffect, useState } from 'react';

import moment from 'moment';
import 'moment/locale/de';

import { css } from 'linaria';

function LiveTimerAlert(): JSX.Element | null {
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState(' BALD LIVE!');

  useEffect(() => {
    moment.locale('de');

    const goingLive = moment('Sonntag 19:00:00', 'dddd hh:mm:ss');
    const showAlertStart = moment('Sonntag 18:00:00', 'dddd hh:mm:ss');
    const showAlertEnd = moment('Sonntag 21:00:00', 'dddd hh:mm:ss');

    const updateTime = () => {
      const showTimer = moment().isBefore(goingLive);
      const _showAlert = moment().isBetween(showAlertStart, showAlertEnd);

      setShowAlert(_showAlert);

      if (showTimer) {
        const _timer = goingLive.fromNow();
        setTimer(` ${_timer} LIVE!`);
      } else {
        setTimer(' JETZT LIVE!');
      }
    };

    const interval = setInterval(updateTime, 10 * 1000);
    updateTime();

    return () => clearInterval(interval);
  }, []);

  return showAlert ? (
    <div className={$style}>
      WIR SIND{timer} - <a href="http://satdillenburg.online.church/">JETZT ZUM STREAM</a>
    </div>
  ) : null;
}

const $style = css`
  font-family: 'Bebas Neue';
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.1em;
  text-align: center;

  background: red;
  color: #fff;

  z-index: 999;
  padding: 5px 15px;

  a {
    color: #fff;
  }
`;

export default LiveTimerAlert;
