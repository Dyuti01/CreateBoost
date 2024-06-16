import Hero from "@/components/Hero";

export default function Home() {

  return (
    <>
            <div className="absolute inset-0 -z-10 h-full w-full dark:bg-slate-800 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    
      <Hero/>
    
      <div className="bg-blue-900 h-[2px] opacity-50"></div>

      <div className="mt-14 mb-20 px-10 text-black dark:text-white flex flex-col gap-3 items-center justify-center">
          <h2 className="text-3xl font-semibold">Get your fans</h2>
          <div className="flex flex-col lg:flex-row justify-between md:gap-48 gap-7">
            <div className="flex flex-col items-center justify-center">
              <img className="w-[500px] md:w-[200px]" src="https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718284742/man_ofezu5.gif" alt="" />
              <div className="flex flex-col justify-center items-center">
              <h3 className="text-xl md:text-md font-extrabold">Create more</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad reiciendis rem cum, tenetur aspernatur excepturi ea dolorum nesciunt alias.</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img className="w-[500px] lg:w-[120px] mb-3 mt-3" src="https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718284598/money_xnshbr.gif" alt="" />
              <div className="flex flex-col justify-center items-center mb-16">
              <h3 className="text-xl md:text-md font-extrabold">Fund yourself</h3>
                <p className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit illo maxime itaque inventore eveniet atque, a dignissimos nostrum expedita facilis adipisci iste. Quasi ipsa laudantium eos totam molestias, consequuntur deleniti!</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img className="w-[300px] lg:w-[100px]" src="https://res.cloudinary.com/dkfd0a8gd/image/upload/v1718284811/people_jfutph.gif" alt="" />
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl md:text-md font-extrabold">Get more fans</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad reiciendis rem cum, tenetur aspernatur excepturi ea dolorum nesciunt alias.</p>
              </div>
            </div>
          </div>


        </div>

      <div className="bg-blue-900 h-[3px] opacity-50"></div>

      <div className="mt-16 mb-28 px-10 text-black dark:text-white flex flex-col gap-7 items-center justify-center">
        <h1 className="text-2xl font-bold">Learn more about us</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <iframe className="dark:md:w-[450px] w-[350px]" width="450" height="255" src="https://www.youtube.com/embed/K9Lji9NWMF8?si=E5Y4XNT6M21lhTg8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe className="dark:md:w-[450px] w-[350px]" width="450" height="255" src="https://www.youtube.com/embed/dgDhpRxrBFY?si=3L8k6_f8qtj9P2Id" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

      </div>
    </>
  );
}
