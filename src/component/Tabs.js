import React from 'react';
import { TABS } from '../constants';
import { Routes, Route, Link } from 'react-router-dom';
import App from '../App';

export default function Tabs(props) {
  const tabs = Object.values(TABS);
  // console.log(tabs);
  return (
    <div>
      {tabs.map((tab) => {
        return (
          <Link to={`/${tab}`}>
            <button
              key={tab}
              className={`tab ${props.activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                //onClick不要打错
                props.onTabClick(tab);
              }}
            >
              {tab}
            </button>
          </Link>
        );
      })}
      <Routes>
        {/* <Route path={TABS.HOME} element={<App />} /> */}
        {/* <Route path={TABS.FAVORITE} element={<FAVORITE />} />
        <Route path={TABS.RATED} element={<RATED />} /> */}
      </Routes>
    </div>
  );
}
/*
      <button className="tab">{TABS.HOME}</button>
      <button className="tab">{TABS.FAVORITE}</button>
      <button className="tab">{TABS.RATED}</button>
*/
