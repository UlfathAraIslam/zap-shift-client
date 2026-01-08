import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const SendParcel = ({ user }) => {
  const serviceCenters = useLoaderData();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      parcelType: "document",
    },
  });

  /* ================= Regions ================= */
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) =>
    serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);

  /* ================= Cost Logic ================= */
  const calculateCost = (data) => {
    const isDocument = data.parcelType === "document";
    const sameDistrict = data.senderDistrict === data.receiverDistrict;
    const weight = Number(data.parcelWeight || 0);

    if (isDocument) return sameDistrict ? 60 : 80;

    if (weight <= 3) return sameDistrict ? 110 : 150;

    const extraWeight = weight - 3;
    return (sameDistrict ? 110 : 150) + extraWeight * 40;
  };

  /* ================= Submit ================= */
  const handleSendParcel = (data) => {
    const cost = calculateCost(data);

    Swal.fire({
      title: "Confirm Delivery Cost",
      text: `You will be charged ৳${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log({
          ...data,
          cost,
          creation_date: new Date().toISOString(),
        });

        Swal.fire("Success", "Parcel added successfully", "success");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-2">Send A Parcel</h2>
      <p className="text-gray-500 mb-8">
        Door to Door delivery requires pickup & delivery information
      </p>

      <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-10">

        {/* ================= Parcel Info ================= */}
        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType")}
                className="radio"
              />
              Document
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType")}
                className="radio"
              />
              Non-Document
            </label>

            <input
              type="number"
              {...register("parcelWeight")}
              placeholder="Weight (kg)"
              className="input input-bordered"
            />
          </div>

          <input
            type="text"
            {...register("parcelName", { required: true })}
            placeholder="Describe your parcel"
            className="input input-bordered w-full mt-4"
          />
        </div>

        {/* ================= Sender & Receiver ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* -------- Sender -------- */}
          <div className="card bg-base-100 shadow p-6 space-y-4">
            <h3 className="text-xl font-semibold">Sender Info</h3>

            <input
              {...register("senderName", { required: true })}
              defaultValue={user?.displayName}
              placeholder="Sender Name"
              className="input input-bordered w-full"
            />

            <input
              {...register("senderEmail")}
              defaultValue={user?.email}
              placeholder="Sender Email"
              className="input input-bordered w-full"
            />

            <select {...register("senderRegion")} className="select select-bordered">
              <option value="">Select Region</option>
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select {...register("senderDistrict")} className="select select-bordered">
              <option value="">Select District</option>
              {districtsByRegion(senderRegion).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <textarea
              {...register("senderAddress")}
              placeholder="Sender Address"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* -------- Receiver -------- */}
          <div className="card bg-base-100 shadow p-6 space-y-4">
            <h3 className="text-xl font-semibold">Receiver Info</h3>

            <input
              {...register("receiverName", { required: true })}
              placeholder="Receiver Name"
              className="input input-bordered w-full"
            />

            <input
              {...register("receiverEmail")}
              placeholder="Receiver Email"
              className="input input-bordered w-full"
            />

            <select {...register("receiverRegion")} className="select select-bordered">
              <option value="">Select Region</option>
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select {...register("receiverDistrict")} className="select select-bordered">
              <option value="">Select District</option>
              {districtsByRegion(receiverRegion).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <textarea
              {...register("receiverAddress")}
              placeholder="Receiver Address"
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        <button className="btn btn-primary w-full text-black">
          Send Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
