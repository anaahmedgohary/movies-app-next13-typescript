// "use client"

export default async function TestApi() {
  const baseUrl = process.env.BASE_URL;
  const theHi = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/api"
        : baseUrl
    }/apiroutes/sayhi`
  );
  // http://localhost:8080
  const reso = { hellos: "fine" } || (await theHi?.json());
  const result = reso?.hellos || "";
  //   const reso = await theHi.text();
  console.log(reso);
  const heelo = await fetch(`${baseUrl}`);
  const elos = heelo.text() || "";
  return (
    <div className=" min-h-screen py-[100px]">
      <div className=" text-center">{result || "nola"}</div>
      <div>{elos}</div>
    </div>
  );
}
