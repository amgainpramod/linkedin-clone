import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordItem from "@material-ui/icons/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordItem />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="widgets">
        <div className="widgets__top">
          <div className="widgets__header">
            <h2>LinkedIn News</h2>
            <InfoIcon />
          </div>
          {newsArticle(
            "Coronavirus: Official Updates",
            "Top news - 15,688 readers"
          )}
          {newsArticle(
            "Upskilling? Give Netflix the flick",
            "6d ago - 1,243 readers"
          )}
          {newsArticle(
            "A retailer collapses, another soars",
            "7h ago - 706 readers"
          )}
          {newsArticle(
            "Confident workers are still insecure",
            "13h ago - 8,635 readers"
          )}
          {newsArticle("It's Equal Pay Day", "2h ago")}
        </div>
        <div className="widgets__bottom">
          <div className="widgets__header">
            <h2>Today's top courses</h2>
            <InfoIcon />
          </div>
          {newsArticle("Statistics Foundations: The Basics", "Eddie Davila")}
          {newsArticle("Excel VLOOKUP and XLOOPUP for ...", "Jess Stratton")}
          {newsArticle("15 Secrets Successful People Know ...", "getAbstract")}
          {newsArticle(
            "Confident workers are still insecure",
            "13h ago - 8,635 readers"
          )}
        </div>
      </div>
    </>
  );
}

export default Widgets;
