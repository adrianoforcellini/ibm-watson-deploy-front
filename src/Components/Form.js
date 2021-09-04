import React, { useState , useEffect, useCallback} from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";

function Form() {
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const loadAll = useCallback(async () => {
    const getAll = await fetch('https://watson-back.herokuapp.com/comments')
    .then( r => r.json());
    const comments = getAll.map(item => item.comment)
    setId(getAll.length + 1);
    setTimeout(
      () => dispatch({ type: "sendComments", comments: comments }),
      3000
    );
  }, [dispatch])

  const handleChange = ({ target }) => {
    setComment(target.value);
  };

  const handleClik =  () => {
    if (comment) {
      setComment("");
      const commentId = id + "";
       axios.post("https://watson-back.herokuapp.com/comments", { commentId, comment });
       axios.post("https://watson-back.herokuapp.com/watson", { id, comment });
      loadAll();
    } else {
      alert("O comentário está vazio!");
    }
  };

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div className="form">
      <p>Comentário</p>
      <textarea
        className="comment-textarea"
        type="text"
        name="comment"
        value={comment}
        onChange={handleChange}
        maxLength="200"
      />
      <button className="button-form"  onClick={handleClik}>
        Cadastrar
      </button>
    </div>
  );
}

export default Form;
