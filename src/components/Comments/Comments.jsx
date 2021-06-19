import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import "./style.css";
import { DataContext } from "../../context/database/DataContext";
import CommentsList from "./CommentsList";

const Comments = () => {
  const { comments, open, closeMenu } = useContext(DataContext);
  return (
    <>
      <Paper className={`comments ${open && "active"}`} elevation={3}>
        <CommentsList {...comments} />
        <CloseIcon onClick={() => closeMenu()} className='comments__close' />
      </Paper>
    </>
  );
};

export default Comments;
