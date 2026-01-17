import { useState } from "react";
import Swal from "sweetalert2";
import { FaUserSlash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    const { data: riders = [], isPending, refetch } = useQuery({
        queryKey: ["active-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        },
    });

    if (isPending) {
        return <p className="text-center">Loading...</p>;
    }

    const handleDeactivate = async (id) => {
        const confirm = await Swal.fire({
            title: "Deactivate Rider?",
            text: "This rider will no longer receive parcels.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, deactivate",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}`, {
                status: "inactive",
            });

            refetch();

            Swal.fire("Success", "Rider deactivated successfully", "success");
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            Swal.fire("Error", "Failed to deactivate rider", "error");
        }
    };

    const filteredRiders = riders.filter((rider) =>
        rider.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Active Riders</h2>

                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Bike Reg.</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRiders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6">
                                    No riders found
                                </td>
                            </tr>
                        ) : (
                            filteredRiders.map((rider) => (
                                <tr key={rider._id}>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.phone}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.district}</td>
                                    <td>{rider.bike_registration}</td>
                                    <td>
                                        <span className="badge badge-success">
                                            Active
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDeactivate(rider._id)
                                            }
                                            className="btn btn-sm btn-error"
                                            title="Deactivate Rider"
                                        >
                                            <FaUserSlash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveRiders;
