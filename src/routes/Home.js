import React, { useState, useEffect } from "react";
import { dbService } from "../fbserver";

function Home({ userObj }) {
  const [gweet, setGweet] = useState("");
  const [dbGweets, setdbGweets] = useState([]);

  useEffect(() => {
    dbService.collection("gweets").onSnapshot((Snapshot) => {
      const gweetArray = Snapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setdbGweets(gweetArray);
    });
  }, []);

  const onChange = (e) => {
    setGweet(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("gweets").add({
      text: gweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setGweet("");
  };
  console.log(dbGweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={gweet}
          onChange={onChange}
          placeholder="지금 무슨 생각해?"
          maxLength={120}
        />
        <input type="submit" value="Gweet" />
      </form>
      <div>
        {dbGweets.map((gweet) => (
          <div key={gweet.id}>
            <h4>{gweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
