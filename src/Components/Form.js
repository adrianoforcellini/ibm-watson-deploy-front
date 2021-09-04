import React, { useState , useEffect, useCallback} from 'react';
import axios from 'axios';
//   // useEffect, useCallback } from "react";
// import connectBack from "../Utills/axiosconfig";
import { useDispatch } from "react-redux";

function Form() {
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");
//   const fs = async () => {
//     const data = await fetch('https://watson-back.herokuapp.com/comments')
//     .then(r => r.json());
//     console.log(data);
//     }
// fs();

  const dispatch = useDispatch();

  const loadAll = useCallback(async () => {
    const getAll = await fetch('https://watson-back.herokuapp.com/comments')
    .then( r => r.json());
    console.log(getAll)
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

  const handleClik = async () => {
    if (comment) {
      setComment("");
       axios.post("https://watson-back.herokuapp.com/comments", { comment });
       axios.post("https://watson-back.herokuapp.com/watson", { id, comment });
      // await loadAll();
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
