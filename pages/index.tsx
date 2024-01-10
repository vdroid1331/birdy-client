import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import FeedCard from "@/components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import BirdyLayout from "@/components/Layout/BirdyLayout";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { GetServerSideProps } from "next";
import axios from "axios";
import toast from "react-hot-toast";

interface HomeProps {
  tweets?: Tweet[];
}

export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();

  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const { mutateAsync } = useCreateTweet();

  const handleInputChangeFile = useCallback(
    (input: HTMLInputElement) => {
      return async (event: Event) => {
        event.preventDefault();
        console.log(input.files);
        const file: File | null | undefined = input.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("chirpImage", file);
        try {
          toast.loading("Uploading file...", { id: "2" });
          const response = await axios.post(
            "http://localhost:8000/api/uploadFile",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("File uploaded successfully:", response.data.data.url);
          const image_url = response.data.data.url;
          setImageURL(image_url);
          console.log("Image URL is :", image_url);
          toast.success("File uploaded successfully", { id: "2" });
          console.log(imageURL);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
    },
    [imageURL]
  );

  const handleSelectImage = useCallback(() => {
    if (!user) return;
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);
    input.click();
  }, [handleInputChangeFile, user]);

  const handleCreateTweet = useCallback(async () => {
    await mutateAsync({
      content,
      imageURL,
    });
    setImageURL("");
    setContent("");
  }, [content, imageURL, mutateAsync]);

  return (
    <div>
      <BirdyLayout>
        <div>
          <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    alt="user-img"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-700 no-scrollbar"
                  rows={3}
                  placeholder="What's happening?"
                ></textarea>
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt="tweet-img"
                    width={300}
                    height={300}
                  />
                )}
                <div className="mt-2  flex justify-between items-center">
                  <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
                  >
                    Chirp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </BirdyLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets?.getAllTweets as Tweet[],
    },
  };
};
