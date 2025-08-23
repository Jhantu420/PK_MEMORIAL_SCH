import React from "react";
import HomeCover from "./HomeCover";
import DirectorMsg from "./DirectorMsg";
import AssistPrincipalmsg from "./AssistPrincipalmsg";
import Offer from "./Offer";

function Home() {
  return (
    <>
      <div className="">
        <HomeCover />
        <DirectorMsg  />
        <AssistPrincipalmsg />
        {/* <Offer /> */}
      </div>
    </>
  );
}

export default Home;
