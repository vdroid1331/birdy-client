import React, { ReactNode, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import {
  BiHash,
  BiHomeCircle,
  BiImageAlt,
  BiMoney,
  BiUser,
} from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "../FeedCard";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface BirdyLayoutProps {
  children: ReactNode;
}

interface BirdySidebarButton {
  title: string;
  icon: ReactNode;
  link: string;
}

// const sidebarMenuItems: BirdySidebarButton[] = [
//   {
//     title: "Home",
//     icon: <BiHomeCircle />,
//   },
//   {
//     title: "Explore",
//     icon: <BiHash />,
//   },
//   {
//     title: "Notifications",
//     icon: <BsBell />,
//   },
//   {
//     title: "Messages",
//     icon: <BsEnvelope />,
//   },
//   {
//     title: "Bookmarks",
//     icon: <BsBookmark />,
//   },
//   {
//     title: "Birdy Blue",
//     icon: <BiMoney />,
//   },
//   {
//     title: "Profile",
//     icon: <BiUser />,
//   },
//   {
//     title: "More Options",
//     icon: <SlOptions />,
//   },
// ];

const BirdyLayout: React.FC<BirdyLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: BirdySidebarButton[] = useMemo(() => {
    return [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Birdy Blue",
        icon: <BiMoney />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/user/${user?.id}`,
      },
      {
        title: "More Options",
        icon: <SlOptions />,
        link: "/",
      },
    ];
  }, [user?.id]);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error(`Google Token not Found`);
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);
      if (verifyGoogleToken)
        window.localStorage.setItem("__birdy_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );
  // console.log(user?.recommendedUsers);
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-1 text-xl pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li
                    // className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                    key={item.title}
                  >
                    <Link
                      href={item.link}
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg rounded-full w-full px-4 py-2">
                  Chirp
                </button>
                <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg rounded-full w-full px-4 py-2">
                  <BsTwitter />
                </button>
              </div>
            </div>
          </div>

          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 p-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  alt="user-image"
                  height={50}
                  width={50}
                  src={user?.profileImageURL}
                />
              )}

              <div className="hidden sm:block">
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-y-scroll no-scrollbar border-gray-600">
          {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user ? (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Birdy?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          ) : (
            <div className="px-4 py-3 bg-slate-800 rounded-lg">
              <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
              {user?.recommendedUsers?.map((el) => (
                <div className="flex items-center gap-3 mt-2" key={el?.id}>
                  {el?.profileImageURL && (
                    <Image
                      src={el?.profileImageURL}
                      className="rounded-full"
                      alt="user-image"
                      width={60}
                      height={60}
                    />
                  )}
                  <div className="text-lg">
                    <div>
                      {el?.firstName} {el?.lastName}
                    </div>
                    <Link
                      href={`/user/${el?.id}`}
                      className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirdyLayout;
