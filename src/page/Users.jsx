import React, { useEffect, useContext } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-hot-toast';
import { StoreContext } from '../components/Context/StoreContext';
import { TrashIcon } from '@heroicons/react/20/solid';

const Users = () => {
  const { userLoading, user } = useContext(StoreContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async (email) => {
    if (!window.confirm('Are you sure you want to disable this user?')) return;

    try {
      await deleteDoc(doc(db, 'users', email));
      toast.success('User account disabled successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl pt-6 pb-16 px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-2xl font-semibold text-gray-900'>All Users</h1>
            <p className='mt-2 text-sm text-gray-700'>
              All your users are here. You can see the users information here.
            </p>
          </div>
        </div>
        {/* Content */}
        <div className='mt-8 flex flex-col'>
          <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                      >
                        User
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Department
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                      >
                        Phone
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Address
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Created At
                      </th>
                      <th
                        scope='col'
                        className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                      >
                        <span className='sr-only'>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {!userLoading &&
                      user?.length > 0 &&
                      user?.map((item) => (
                        <tr key={item?.uid}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                            <div className='flex items-center'>
                              <div className='h-10 w-10 flex-shrink-0'>
                                <img
                                  className='h-10 w-10 rounded-lg'
                                  src={item?.photoURL}
                                  alt=''
                                />
                              </div>
                              <div className='ml-4'>
                                <div className='font-medium text-gray-900'>
                                  {item?.displayName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-800'>
                            {item?.department}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-800'>
                            {item?.phone}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-800'>
                            {item?.email}
                          </td>
                          <td className='px-3 py-4 text-sm text-gray-800'>
                            {item?.address}
                          </td>
                          <td className='px-3 py-4 text-sm text-gray-800'>
                            {new Date(item?.accountCreated)?.toLocaleDateString(
                              'en-GB'
                            )}
                          </td>
                          <td className='whitespace-nowrap px-3 py-6 text-sm flex justify-start items-center'>
                            <button
                              onClick={() => handleDelete(item?.email)}
                              type='button'
                              className='ml-6 flex text-red-600 hover:text-red-700 font-semibold'
                            >
                              <TrashIcon className='h-5 w-5 mr-1' /> Disable
                            </button>
                          </td>
                        </tr>
                      ))}

                    {!userLoading && user?.length === 0 && (
                      <tr>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3'>
                          <div className='flex items-center'>
                            <div className='font-medium text-md text-gray-900'>
                              No user found
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {userLoading && (
                      <div className='mt-16 mb-12'>
                        <div className='flex items-center justify-center'>
                          <img
                            className='w-28'
                            src='https://media.tenor.com/On7kvXhzml4AAAAj/orderLoading-gif.gif'
                            alt=''
                          />
                        </div>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
