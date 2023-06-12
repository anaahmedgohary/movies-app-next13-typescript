// "use client"

export default async function page() {
  const baseUrl = process.env.BASE_URL;
  //   const theHi = await fetch(`${baseUrl}/apiroutes/sayhi`);
  //   const theHi = await fetch(`${baseUrl}/api/apiroutes/sayhi`);
  //   const theHi = await fetch(`/api/apiroutes/sayhi`);
  const theHi = await fetch(`http://localhost:8080/api/apiroutes/sayhi`);
  // http://localhost:8080
  const reso = await theHi.json();
  const result = reso?.hellos;
  //   const reso = await theHi.text();
  console.log(reso);
  const heelo = await fetch(`${baseUrl}/api`);
  const elos = heelo.text();
  return (
    <div className=" min-h-screen py-[100px]">
      <div className=" text-center">{result || "nola"}</div>
      <div>{elos}</div>
    </div>
  );
}
