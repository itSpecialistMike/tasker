import Link from 'next/link';

const ProfileButton = () => (
  <Link
    href="/profile"
    className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium"
  >
    :)
  </Link>
);

export default ProfileButton;
