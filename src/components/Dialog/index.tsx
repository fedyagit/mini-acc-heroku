import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  text?: string;
  submitAction?: () => void;
  isEdit?: boolean;
  submitForm?: (cost: string, name: string) => void;
  isCategory?: boolean;
  submitFormType?: (type: string) => void;
}
const DialogComponent: FC<ModalProps> = ({
  isOpen,
  closeModal,
  text,
  submitAction,
  isEdit,
  submitForm,
  isCategory,
  submitFormType,
}) => {
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value);
  };
  const onChangeCost: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setCost(e.target.value);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className=" z-50 fixed inset-0 overflow-y-auto"
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
                className="text-lg text-center flex justify-center font-medium leading-6 text-gray-900"
              >
                {text}
              </Dialog.Title>
              {submitAction && !isEdit && !isCategory && !submitFormType && (
                <div className="flex justify-center content-center mt-4">
                  <button
                    type="button"
                    className="inline-flex  w-12 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={submitAction}
                  >
                    ??????
                  </button>
                  <button
                    type="button"
                    className="inline-flex ml-4 w-12 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    ????
                  </button>
                </div>
              )}
              {!submitAction && !isEdit && !isCategory && !submitFormType && (
                <div className="flex justify-center content-center mt-4">
                  <button
                    type="button"
                    className="inline-flex  w-12 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    O??
                  </button>
                </div>
              )}

              {isEdit && submitForm && (
                <div className="flex justify-center content-center mt-4">
                  <form className="bg-white rounded w-full  pt-6 pb-8 mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        ??????????
                      </label>
                      <input
                        value={name}
                        onChange={onChangeName}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-6 relative">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        ????????
                      </label>
                      <input
                        value={cost}
                        maxLength={5}
                        type="text"
                        pattern="[0-9]*"
                        onChange={onChangeCost}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <div className="h-6 w-6 text-black opacity-50 absolute right-4 top-9">
                        ??????
                      </div>
                    </div>
                    <div className="flex justify-center content-center">
                      {cost === "" || name === "" ? (
                        <div className="inline-flex cursor-default opacity-50 w-42 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                          ????????????
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex w-42 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => submitForm(name, cost)}
                        >
                          ????????????
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex ml-4 w-24 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        ??????????????
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {isCategory && submitFormType && (
                <div className="flex justify-center content-center mt-4">
                  <form className="bg-white rounded w-full  pt-6 pb-8 mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        ??????????
                      </label>
                      <input
                        value={name}
                        onChange={onChangeName}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="flex justify-center content-center">
                      {name === "" ? (
                        <div className="inline-flex cursor-default opacity-50 w-42 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                          ????????????
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex w-42 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => submitFormType(name)}
                        >
                          ????????????
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex ml-4 w-24 justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        ??????????????
                      </button>
                    </div>
                  </form>
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
