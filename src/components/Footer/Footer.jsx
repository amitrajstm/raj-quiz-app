import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="w-full py-6 border-t text-center text-sm text-neutral-500 flex flex-col items-center gap-3 bg-neutral-50 ">
      <p>&copy; {new Date().getFullYear()} Raj Quiz. All rights reserved.</p>

      <div className="flex items-center justify-center gap-4">
        <a
          href="https://www.facebook.com/englishconversationinsitamarhi/"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="text-neutral-500 hover:text-blue-600 text-lg transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://x.com/Amit_Raj_Stm"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="text-neutral-500 hover:text-blue-500 text-lg transition"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/amitraj_stm"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-neutral-500 hover:text-pink-500 text-lg transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/amitkumarraj1"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-neutral-500 hover:text-blue-700 text-lg transition"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://github.com/amitrajstm"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-neutral-500 hover:text-black text-lg transition"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
