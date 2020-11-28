import React, { useState } from "react";
import { dbService } from "../fbserver";

function Gweets({ GweetObj, isOwner }) {
  const [Toggle, setToggle] = useState(true);
  const [NewGweet, setNewGweet] = useState(GweetObj.text);
  const onDelete = async () => {
    const ok = window.confirm("정말 삭제 할건가요?");
    if (ok) {
      await dbService.doc(`gweets/${GweetObj.id}`).delete();
    }
  };

  const onToggle = () => {
    setToggle(!Toggle);
  };

  const onChange = (e) => {
    setNewGweet(e.target.value);
  };
  const onSubmit = async (e) => {
    await dbService.doc(`gweets/${GweetObj.id}`).update({
      text: NewGweet,
    });
    e.preventDefault();
    setToggle(!Toggle);
  };
  return (
    <>
      {Toggle ? (
        <div>
          <h4>{GweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>삭제</button>
              <button onClick={onToggle}>수정</button>
            </>
          )}
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} required />
            <input type="submit" value="수정" />
          </form>
          <button onClick={onToggle}>취소</button>
        </>
      )}
    </>
  );
}

export default Gweets;
