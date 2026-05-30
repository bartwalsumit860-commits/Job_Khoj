function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Job <span className="text-blue-600">Khoj</span></h2>
          <p className="text-sm text-gray-400 mt-2">
            Helping developers find their dream jobs.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.059-1.865-3.059-1.867 0-2.154 1.459-2.154 2.965v5.698h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.562 2.845-1.562 3.043 0 3.604 2.003 3.604 4.605v5.59z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.326v21.348c0 .732.593 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.324-.594 1.324-1.326v-21.349c0-.733-.594-1.326-1.324-1.326z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.387 7.865 10.91.575.106.785-.25.785-.556 0-.274-.01-1-.016-1.962-3.2.695-3.878-1.543-3.878-1.543-.523-1.328-1.278-1.682-1.278-1.682-1.045-.715.079-.7.079-.7 1.156.081 1.764 1.188 1.764 1.188 1.028 1.762 2.698 1.253 3.356.958.104-.744.402-1.253.731-1.541-2.554-.29-5.238-1.277-5.238-5.684 0-1.255.449-2.282 1.184-3.086-.119-.29-.513-1.46.112-3.045 0 0 .966-.309 3.166 1.179a10.96 10.96 0 012.883-.388c.978.004 1.963.132 2.883.388 2.2-1.488 3.164-1.179 3.164-1.179.627 1.585.233 2.755.114 3.045.737.804 1.183 1.831 1.183 3.086 0 4.418-2.688 5.39-5.252 5.675.413.356.781 1.058.781 2.133 0 1.541-.014 2.782-.014 3.16 0 .309.207.668.79.555C20.21 21.383 23.5 17.082 23.5 12 23.5 5.649 18.351.5 12 .5z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobKhoj. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
