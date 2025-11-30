"use client";
import { Menu, Transition } from "@headlessui/react";
import { FaEllipsisH, FaTrash } from "react-icons/fa";
import { Fragment } from "react";

export const OptionsMenu = ({ post, session, onDelete }) => {
  // Only show the menu if the logged-in user is the author of the post
  if (!session?.user?.id || session.user.id !== post.author?._id) {
    return null; // Don't render anything if not the author
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <FaEllipsisH />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onDelete(post._id)}
                  className={`${
                    active ? "bg-red-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FaTrash className="mr-2 h-4 w-4 text-red-400 group-hover:text-white" />
                  Delete Post
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
