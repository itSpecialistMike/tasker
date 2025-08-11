// tasker/src/components/Footer.tsx
// Этот файл содержит компонент Footer для приложения Tasker
export default function Footer() {
  return (
    <footer className="bg-white  border border-gray-200">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase text-white">
              Follow us
            </h2>
            <ul className="text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:underline">
                  Github
                </a>

              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase text-white">
              Legal
            </h2>
            <ul className="text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:underline">
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase text-white">
              Legal
            </h2>
            <ul className="text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center justify-center text-center">
        <span className="text-sm sm:text-center text-gray-400 mb-6">
          © 2027{" "}
          <a href="#" className="hover:underline">
            Егор, Мишаня и Сергега™
          </a>
          . All Rights Reserved.
        </span>
        </div>
      </div>
    </footer>
  );
}
