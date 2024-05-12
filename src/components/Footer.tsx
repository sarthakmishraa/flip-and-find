import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <div className="mx-8 fixed bottom-0 h-[100px] font-semibold text-center py-[10px]">
            <p>Made with ❤️ by Sarthak Mishra</p>
            <div className="space-x-2">
                <Link
                    to="https://www.linkedin.com/in/sarthakmishraa/"
                    target="_blank"
                    className="text-sky-700 hover:text-sky-400 underline">
                        LinkedIn
                </Link>
                <Link
                    to="https://github.com/sarthakmishraa"
                    target="_blank"
                    className="text-sky-700 hover:text-sky-400 underline">
                        GitHub
                </Link>
                <Link
                    to="http://sarthakmishra.lovestoblog.com/?i=2"
                    target="_blank"
                    className="text-sky-700 hover:text-sky-400 underline">
                        Portfolio
                </Link>
            </div>
        </div>
    )
};