import React from 'react';

const Post = () => {
    return (
        <div className="flex flex-col gap-5">
              <div className="bg-fourth py-3 rounded px-3 flex items-center gap-3 justify-between">
                <div className=" flex gap-2">
                  <img src="/womenPost.png" className="w-14" alt="" />
                  <div className="">
                    <h2 className=" text-lg font-medium">Amina 47</h2>
                    <p className=" text-xs">Algeria, Algiers</p>
                  </div>
                </div>
                <h3 className=" flex gap-2 justify-center items-center secondary-color">
                  <img src="/timer1.svg" alt="" />
                  Today 14:20
                </h3>
              </div>
              <p>
                I have struggled with anxiety for years, and it's been a
                constant battle for me. It started in my early twenties when I
                was dealing with a lot of stress at work, and I found myself
                worrying all the time, unable to relax or enjoy anything. It was
                especially hard because I felt like I couldn't talk to anyone
                about it. I thought people would judge me or think less of me if
                they knew I was strugglingina47 ....
              </p>
              <div className="bg-fourth py-3 rounded px-2 flex items-center gap-3">
                <div className=" flex justify-center items-center">
                  <img src="/directup.svg" alt="" />
                  23
                </div>
                <div className=" flex justify-center items-center">
                  <img src="/messagetext1.svg" alt="" />
                  12
                </div>
                <div className=" flex justify-center items-center">
                  <img src="/heart.svg" alt="" />
                  23
                </div>

                <div className=" flex gap-3">
                  <button className="bg-thrid px-4 text-white rounded-xl">
                    Trauma
                  </button>
                  <button className="bg-thrid px-4 text-white rounded-xl">
                    Trauma
                  </button>
                  <button className="bg-thrid px-4 text-white rounded-xl">
                    Trauma
                  </button>
                </div>
              </div>
            </div>
    );
}

export default Post;
