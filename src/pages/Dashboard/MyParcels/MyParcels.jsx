import React from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  /* ================= Fetch Parcels ================= */
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  /* ================= Utils ================= */
  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ================= View (ID based) ================= */
  const handleView = (id) => {
    const parcel = parcels.find((p) => p._id === id);
    if (!parcel) return;

    Swal.fire({
      title: "Parcel Details",
      html: `
        <p><b>Title:</b> ${parcel.title}</p>
        <p><b>Tracking ID:</b> ${parcel.tracking_id}</p>
        <p><b>Sender:</b> ${parcel.sender_name}</p>
        <p><b>Receiver:</b> ${parcel.receiver_name}</p>
        <p><b>Cost:</b> ৳${parcel.cost}</p>
        <p><b>Status:</b> ${parcel.delivery_status}</p>
      `,
      confirmButtonText: "Close",
    });
  };

  /* ================= Pay (ID based) ================= */
  const handlePay = (id) => {
    console.log("proceed to payment", id);
    navigate(`/dashboard/payment/${id}`);
  };

  /* ================= Delete (ID based) ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/parcels/${id}`);
      Swal.fire("Deleted!", "Parcel has been deleted.", "success");
      refetch();
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading parcels...</p>;
  }

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">My Parcels</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {parcels.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    No parcel found 🚚
                  </td>
                </tr>
              ) : (
                parcels.map((parcel, index) => (
                  <tr key={parcel._id}>
                    <td>{index + 1}</td>

                    <td className="font-medium">
                      {parcel.title || "—"}
                    </td>

                    <td className="capitalize">
                      {parcel.type === "document"
                        ? "Document"
                        : "Non-Document"}
                    </td>

                    <td>{formatDate(parcel.creation_date)}</td>

                    <td className="font-semibold">৳{parcel.cost}</td>

                    <td>
                      <span
                        className={`badge ${
                          parcel.payment_status === "paid"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {parcel.payment_status}
                      </span>
                    </td>

                    <td className="space-x-2">
                      <button
                        onClick={() => handleView(parcel._id)}
                        className="btn btn-xs btn-outline"
                      >
                        View
                      </button>

                      {parcel.payment_status === "unpaid" && (
                        <button
                          onClick={() => handlePay(parcel._id)}
                          className="btn btn-xs btn-primary text-black"
                        >
                          Pay
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
