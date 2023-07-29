import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  StarIcon,
  ListBulletIcon,
  HomeIcon,
  CreditCardIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { Link, useParams } from 'react-router-dom';
import Listing from './Listing';
import Profile from './Profile';
import Orders from './Orders';
import { useAuth } from '../components/Auth/AuthContext';
import DashboardHome from './DashboardHome';
import Reviews from './Reviews';
import Payments from './Payments';
import Community from './Community';
import Reports from './Reports';
import Users from './Users';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    current: 'dashboard',
  },
  {
    name: 'All Orders',
    href: '/orders',
    icon: CalendarDaysIcon,
    current: 'orders',
  },
  {
    name: 'All Listing',
    href: '/listing',
    icon: ListBulletIcon,
    current: 'listing',
  },
  {
    name: 'All Payments',
    href: '/payments',
    icon: CreditCardIcon,
    current: 'payments',
  },
  {
    name: 'All Reports',
    href: '/reports',
    icon: ClipboardDocumentCheckIcon,
    current: 'reports',
  },
  {
    name: 'All Reviews',
    href: '/reviews',
    icon: StarIcon,
    current: 'reviews',
  },
  {
    name: 'All Users',
    href: '/users',
    icon: UserGroupIcon,
    current: 'users',
  },
  {
    name: 'Account Setting',
    href: '/profile',
    icon: UserIcon,
    current: 'profile',
  },
  {
    name: 'Community',
    href: '/community',
    icon: ChatBubbleLeftRightIcon,
    current: 'community',
  },
];

const userNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'All Orders', href: '/orders' },
  { name: 'All Listing', href: '/listing' },
  { name: 'All Payments', href: '/payments' },
  { name: 'All Reports', href: '/reports' },
  { name: 'All Reviews', href: '/reviews' },
  { name: 'All Users', href: '/users' },
  { name: 'Account Setting', href: '/profile' },
  { name: 'Community', href: '/community' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dashboard = () => {
  const params = useParams();
  const { page } = params;
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50 lg:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900/80' />
          </Transition.Child>

          <div className='fixed inset-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                    <button
                      type='button'
                      className='-m-2.5 p-2.5'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XMarkIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Mobile Sidebar */}
                <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4'>
                  <Link
                    to='/dashboard'
                    className='flex h-16 shrink-0 items-center'
                  >
                    <img
                      className='h-8 w-auto'
                      src='https://i.ibb.co/YytpcVr/logo-image-removebg-preview.png'
                      alt='D-Book Shop'
                    />
                    <span className='ml-2 text-indigo-800 text-md sm:text-lg font-semibold'>
                      D-Book Shop Admin Panel
                    </span>
                  </Link>
                  <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                      <li>
                        <ul role='list' className='-mx-2 space-y-1'>
                          {navigation?.map((item) => (
                            <li key={item?.name}>
                              <Link
                                to={item?.href}
                                className={classNames(
                                  page === item?.current
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-50 hover:text-indigo-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    page === item?.current
                                      ? 'text-indigo-600'
                                      : 'text-gray-50 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden='true'
                                />
                                {item?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li className='mt-auto'>
                        <span
                          onClick={() => logout()}
                          className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-50 hover:bg-gray-50 hover:text-indigo-600'
                        >
                          <ArrowLeftOnRectangleIcon
                            className='h-6 w-6 shrink-0 text-gray-50 group-hover:text-indigo-600'
                            aria-hidden='true'
                          />
                          Log out
                        </span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-56 lg:flex-col '>
        <div className='flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-indigo-500 px-6 pb-4'>
          <Link to='/dashboard' className='flex h-20 shrink-0 items-center'>
            <img
              className='h-9 mt-2 w-auto'
              src='https://i.ibb.co/YytpcVr/logo-image-removebg-preview.png'
              alt='D-Book Shop'
            />
            <span className='ml-2 text-gray-50 text-md sm:text-lg font-semibold'>
              D-Book Shop Admin Panel
            </span>
          </Link>
          <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li>
                <ul role='list' className='-mx-2 space-y-2'>
                  {navigation?.map((item) => (
                    <li key={item?.name}>
                      <Link
                        to={item?.href}
                        className={classNames(
                          page === item?.current
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-50 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            page === item?.current
                              ? 'text-indigo-600'
                              : 'text-gray-50 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden='true'
                        />
                        {item?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className='mt-auto'>
                <span
                  onClick={() => logout()}
                  className='cursor-pointer group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-50 hover:bg-gray-50 hover:text-indigo-600'
                >
                  <ArrowLeftOnRectangleIcon
                    className='h-6 w-6 shrink-0 text-gray-50 group-hover:text-indigo-600'
                    aria-hidden='true'
                  />
                  Log out
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className='lg:pl-56'>
        <div className='sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8'>
          <div className='flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none'>
            <button
              type='button'
              className='-m-2.5 p-2.5 text-gray-50 lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>

            {/* Header */}
            <div
              className='h-6 w-px bg-gray-200 lg:hidden'
              aria-hidden='true'
            />

            <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
              <form className='relative flex flex-1' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  Search
                </label>
                <MagnifyingGlassIcon
                  className='pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-indigo-500'
                  aria-hidden='true'
                />
                <input
                  id='search-field'
                  className='block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-50 focus:ring-0 sm:text-sm'
                  placeholder='Search...'
                  type='search'
                  name='search'
                />
              </form>
              <div className='flex items-center gap-x-4 lg:gap-x-6'>
                <button
                  type='button'
                  className='-m-2.5 p-2.5 text-indigo-500 hover:text-indigo-600'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Separator */}
                <div
                  className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200'
                  aria-hidden='true'
                />

                {/* Profile dropdown */}
                <Menu as='div' className='relative'>
                  <Menu.Button className='-m-1.5 flex items-center p-1.5'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full bg-gray-50'
                      src={currentUser?.photoURL}
                      alt=''
                    />
                    <span className='hidden lg:flex lg:items-center'>
                      <span
                        className='ml-4 text-sm font-semibold leading-6 text-gray-900'
                        aria-hidden='true'
                      >
                        {currentUser?.displayName}
                      </span>
                      <ChevronDownIcon
                        className='ml-2 h-5 w-5 text-gray-50'
                        aria-hidden='true'
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2.5 w-38 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                      {userNavigation?.map((item) => (
                        <Menu.Item key={item?.name}>
                          {({ active }) => (
                            <Link
                              to={item?.href}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              {item?.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={() => logout()}
                            to='/'
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block text-sm px-3 py-1 text-gray-900'
                            )}
                          >
                            Logout
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        <main>
          <div className='mx-auto max-w-7xl '>
            {/* Page content */}
            {page === 'dashboard' && <DashboardHome />}
            {page === 'orders' && <Orders />}
            {page === 'listing' && <Listing />}
            {page === 'payments' && <Payments />}
            {page === 'reports' && <Reports />}
            {page === 'reviews' && <Reviews />}
            {page === 'users' && <Users />}
            {page === 'profile' && <Profile />}
            {page === 'community' && <Community />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;