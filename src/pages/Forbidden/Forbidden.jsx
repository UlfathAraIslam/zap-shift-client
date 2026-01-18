import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl max-w-lg w-full">
        <div className="card-body text-center space-y-4">
          
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
              <FaLock className="text-4xl text-error" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-error">403</h1>
          <h2 className="text-xl font-semibold">Access Forbidden</h2>

          {/* Message */}
          <p className="text-gray-500">
            Sorry, you don’t have permission to access this page.
            <br />
            If you believe this is a mistake, please contact support.
          </p>

          {/* Actions */}
          <div className="card-actions justify-center gap-3 mt-4">
            <Link to="/" className="btn btn-primary text-black">
              Go Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Forbidden;