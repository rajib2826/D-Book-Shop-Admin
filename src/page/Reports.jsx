import React, { useEffect, useState, useContext } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-hot-toast';
import { StoreContext } from '../components/Context/StoreContext';
import { TrashIcon } from '@heroicons/react/20/solid';

const Reports = () => {
  const { reportLoading, reports } = useContext(StoreContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async ({ listingId, reportId }) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await deleteDoc(doc(db, 'books', listingId));
      await deleteDoc(doc(db, 'report', reportId));
      toast.success('Book listing deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl pt-6 pb-16 px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              All Reports
            </h1>
            <p className='mt-2 text-sm text-gray-700'>
              All your reports are here. You can see the reports and take
              action.
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
                        Name
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Category
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                      >
                        Seller
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Phone
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Report At
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Reason
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
                    {reportLoading && (
                      <tr>
                        <td className='whitespace-nowrap py-4'>
                          <div className='flex items-center'>
                            <img
                              className='w-16 ml-8'
                              src='https://media.tenor.com/On7kvXhzml4AAAAj/reportLoading-gif.gif'
                              alt=''
                            />
                          </div>
                        </td>
                      </tr>
                    )}

                    {!reportLoading &&
                      reports?.length > 0 &&
                      reports?.map((item) => (
                        <tr key={item?.reportId}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                            <div className='flex items-center'>
                              <div className='h-10 w-10 flex-shrink-0'>
                                <img
                                  className='h-10 w-10 rounded-lg'
                                  src={item?.bookCover}
                                  alt=''
                                />
                              </div>
                              <div className='ml-4'>
                                <div className='font-medium text-gray-900'>
                                  {item?.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <div className='text-gray-900'>
                              {item?.sellerDepartment}
                            </div>
                          </td>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                            <div className='flex items-center'>
                              <div className='h-10 w-10 flex-shrink-0'>
                                <img
                                  className='h-10 w-10 rounded-lg'
                                  src={item?.sellerPhoto}
                                  alt=''
                                />
                              </div>
                              <div className='ml-4'>
                                <div className='font-medium text-gray-900'>
                                  {item?.sellerName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-600'>
                            {item?.sellerPhone}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-600'>
                            {new Date(
                              item?.timestamp?.seconds * 1000
                            )?.toLocaleDateString('en-GB')}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <div className='text-gray-900'>{item?.report}</div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-6 text-sm flex justify-start items-center'>
                            <button
                              onClick={() =>
                                handleDelete({
                                  listingId: item?.listingId,
                                  reportId: item?.reportId,
                                })
                              }
                              type='button'
                              className='ml-6 flex text-red-600 hover:text-red-700 font-semibold'
                            >
                              <TrashIcon className='h-5 w-5 mr-1' /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                    {!reportLoading && reports?.length === 0 && (
                      <tr>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3'>
                          <div className='flex items-center'>
                            <div className='font-medium text-md text-gray-900'>
                              No reports found
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {reportLoading && (
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

export default Reports;
