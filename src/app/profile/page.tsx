// import { MouseEvent } from "react";

export default function UserProfile() {
  const jack: string = "jakie";

  function findjakc(e: React.MouseEvent) {
    e.preventDefault();
  }
  return (
    // console.log(window.location.search);
    <>
      <div>profile</div>
      <div>
        <button onClick={findjakc}></button>
      </div>
    </>
  );
}
