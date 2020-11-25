import React, { useState } from "react";

function Home() {
  const [gweet, setGweet] = useState("");

  const onChange = (e) => {
    setGweet(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form>
        <input
          type="text"
          value={gweet}
          onChange={onChange}
          placeholder="지금 무슨 생각해?"
          maxLength={120}
        />
        <input type="submit" value="Gweet" onSubmit={onSubmit} />
      </form>
    </>
  );
}

export default Home;
