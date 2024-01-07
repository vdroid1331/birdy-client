import { useRouter } from "next/router";
import FeedCard from "@/components/FeedCard";
import BirdyLayout from "@/components/Layout/BirdyLayout";
import { Tweet, User } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";

import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  return (
    <div>
      <BirdyLayout>
        <div>
          <nav className="flex items-center gap-3 py-3 px-3">
            <BsArrowLeftShort className="text-4xl" />
            <div>
              <h1 className="text-2xl font-bold">Vinayak Gupta</h1>
              <h1 className="text-md font-bold text-slat-500">
                {props.userInfo?.tweets?.length} Chirps
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {props.userInfo?.profileImageURL && (
              <Image
                className="rounded-full"
                width={100}
                height={100}
                alt="user-image"
                src={props.userInfo?.profileImageURL}
              />
            )}
            <h1 className="text-2xl font-bold mt-5">Vinayak Gupta</h1>
          </div>
          <div>
            {props.userInfo?.tweets?.map((tweet) => (
              <FeedCard data={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </BirdyLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;

  if (!id) return { notFound: true, props: { userInfo: undefined } };

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo?.getUserById) return { notFound: true };

  return {
    props: {
      userInfo: userInfo?.getUserById as User,
    },
  };
};

export default UserProfilePage;
