import React from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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

  /* ================= View ================= */
  const handleView = (parcel) => {
    Swal.fire({
      title: "Parcel Details",
      html: `
        <p><b>Tracking ID:</b> ${parcel.tracking_id}</p>
        <p><b>Sender:</b> ${parcel.sender_name}</p>
        <p><b>Receiver:</b> ${parcel.receiver_name}</p>
        <p><b>Cost:</b> ৳${parcel.cost}</p>
        <p><b>Status:</b> ${parcel.delivery_status}</p>
      `,
      confirmButtonText: "Close",
    });
  };

  /* ================= Pay ================= */
  const handlePay = async (parcel) => {
    const result = await Swal.fire({
      title: "Proceed to Payment?",
      text: `Pay ৳${parcel.cost}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    });

    if (result.isConfirmed) {
      // later integrate Stripe
      await axiosSecure.patch(`/parcels/pay/${parcel._id}`);
      Swal.fire("Success", "Payment completed", "success");
      refetch();
    }
  };

  /* ================= Delete ================= */
  const handleDelete = async (parcel) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/parcels/${parcel._id}`);
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
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    No parcel found 🚚
                  </td>
                </tr>
              ) : (
                parcels.map((parcel, index) => (
                  <tr key={parcel._id}>
                    <td>{index + 1}</td>

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
                        onClick={() => handleView(parcel)}
                        className="btn btn-xs btn-outline"
                      >
                        View
                      </button>

                      {parcel.payment_status === "unpaid" && (
                        <button
                          onClick={() => handlePay(parcel)}
                          className="btn btn-xs btn-primary text-black"
                        >
                          Pay
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(parcel)}
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
