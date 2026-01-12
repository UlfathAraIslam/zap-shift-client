import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {isPending,data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })
     /* ================= Utils ================= */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
    if(isPending){
        return '...loading'
    }
    return (
         <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Payment History</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Parcel ID</th>
                <th>Amount</th>
                <th>Paid At</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-12 text-gray-500 italic"
                  >
                    No payment history found 💳
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr key={payment.transactionId}>
                    <td>{index + 1}</td>

                    <td className="font-mono text-xs">
                      {payment.transactionId}
                    </td>

                    <td className="text-sm">
                      {payment.parcelId}
                    </td>

                    <td className="font-semibold">
                      ৳{payment.amount}
                    </td>

                    <td>
                      {formatDate(payment.paid_at)}
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

export default PaymentHistory;