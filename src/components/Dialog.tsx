import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  text: string;
  submitAction?: () => void;
}
const DialogComponent: FC<ModalProps> = ({
  isOpen,
  closeModal,
  text,
  submitAction,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg flex justify-center font-medium leading-6 text-gray-900"
              >
                {text}
              </Dialog.Title>
              {submitAction ? (
                <div className="flex justify-center content-center mt-4">
                  <button
                    type="button"
                    className="inline-flex  w-12 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={submitAction}
                  >
                    Так
                  </button>
                  <button
                    type="button"
                    className="inline-flex ml-4 w-12 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Ні
                  </button>
                </div>
              ) : (
                <div className="flex justify-center content-center mt-4">
                  <button
                    type="button"
                    className="inline-flex  w-12 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Oк
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogComponent;
