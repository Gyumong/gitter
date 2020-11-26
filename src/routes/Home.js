import React, { useState, useEffect } from "react";
import { dbService } from "../fbserver";

function Home() {
  const [gweet, setGweet] = useState("");
  const [dbGweets, setdbGweets] = useState([]);

  const getGweets = async () => {
    const gweets = await dbService.collection("gweets").get();
    gweets.forEach((docs) => {
      const gweetObject = {
        ...docs.data(),
        id: docs.id,
      };
      setdbGweets((prev) => [gweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getGweets();
  }, []);

  const onChange = (e) => {
    setGweet(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("gweets").add({
      gweet,
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
            <h4>{gweet.gweet}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
