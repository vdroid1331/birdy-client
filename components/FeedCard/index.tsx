import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

import { AiOutlineHeart } from "react-icons/ai";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-gray-600 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/65962958?v=4"
            alt="user-img"
            height={50}
            width={50}
          />
        </div>
        <div className="col-span-11">
          <h5>Vinayak Gupta</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            magni aperiam modi quasi necessitatibus, exercitationem delectus
            nisi sed aspernatur dolores unde non nobis rem distinctio soluta
            omnis possimus debitis fuga.
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
