import React, { useState } from "react";
import "./style.css";
import moment from "moment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import parse from "html-react-parser";

const CommentsList = ({ user, comments, content, title, level, time }) => {
  let [opnBlock, setOpenBlock] = useState(false);
  let [openComments, setComments] = useState(false);
  
  const toggleAccord = (event) => {
    setComments(!openComments);
  };
  const openBlock = (event) => {
    setOpenBlock(!opnBlock);
  };
  return (
    <div className='comment__container'>
      {title && <div className='comment__title'>{title}</div>}
      <div className='comment__item'>
        {content && (
          <div className='comment__text'>
            <span className='comments__name'>
              {user}
              <span className='comments__time'>
                {moment.unix(time).format("MM/DD/YYYY  HH:mm")}
              </span>
            </span>
            <div
              className={`comments__description ${openComments && "active"}`}
            >
              {parse(`${content}`)}
              <ExpandMoreIcon
                onClick={(e) => toggleAccord(e)}
                className={`comments__more ${openComments && "active"}`}
              />
            </div>
          </div>
        )}
        <div className='comments__block'>
          <span
            onClick={(e) => {
              openBlock(e);
            }}
            className='close-block_btn'
          >
            {`${
              level >= 0 && comments.length != 0
                ? `${opnBlock == false ? " show " : " hide "}` +
                  comments.length +
                  " comments"
                : ""
            }`}
          </span>
          <div
            className={`comments__level ${opnBlock && "active"} ${
              level >= 0 ? "close__level" : ""
            }`}
          >
            {(comments ?? []).map((node, id) => (
              <CommentsList key={id} {...node} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
